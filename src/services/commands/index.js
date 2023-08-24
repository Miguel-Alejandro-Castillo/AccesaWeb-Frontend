import _ from 'lodash';
import log from 'loglevel';

import bookmarks from './bookmarks';
import click from './click';
import colorOptions from './color-options';
import dateOptions from './date-options';
import datetimeOptions from './datetime-options';
import downloads from './downloads';
import _findText, { findTextInPage } from './find-text';
import _global from './global';
import help from './help';
import history from './history';
import imageOptions from './image-options';
import introduceText from './introduce-text';
import linkOptions from './link-options';
import mediaOptions from './media-options';
import monthOptions from './month-options';
import { onNativeCommandsChange, executeNativeCommand } from './native-commands';
import navigation from './navigation';
import pickLabel from './pick-label';
import open from './open';
import rangeOptions from './range-options';
import scroll from './scroll';
import search from './search';
import select from './select';
import selectOptions from './select-options';
import tabs from './tabs';
import textOptions from './text-options';
import timeOptions from './time-options';
import topSites from './top-sites';
import { validateModule } from './validate-i18n';
import weekOptions from './week-options';

let commands = {};
let contextNames = {};
let handlersOnSelectElement = {};
let setups = {};
let teardowns = {};
let i18n = {};

let nativeCommands = [];

function resetVariables() {
  commands = {};
  contextNames = {};
  handlersOnSelectElement = {};
  setups = {};
  teardowns = {};
  i18n = {};
}

const coreModules = [
  bookmarks,
  click,
  colorOptions,
  dateOptions,
  datetimeOptions,
  downloads,
  _findText,
  _global,
  help,
  history,
  imageOptions,
  introduceText,
  linkOptions,
  mediaOptions,
  monthOptions,
  navigation,
  open,
  pickLabel,
  rangeOptions,
  scroll,
  search,
  select,
  selectOptions,
  tabs,
  textOptions,
  timeOptions,
  topSites,
  weekOptions
];

function saveCommands(context, newCommands, excludeDefaultCommands) {
  commands[context] = (commands[context] || []).concat(newCommands);
}

function saveContextName(context, name) {
  if (name) {
    contextNames[context] = name;
  }
}

function saveContextI18n(context, contextI18n) {
  i18n[context] = _.merge({}, i18n[context] || {}, contextI18n || {});
}

function saveSwitchOnSelectElement(context, switchOnSelectElement) {
  handlersOnSelectElement[context] = switchOnSelectElement || (() => false);
}

function saveSetup(context, setup) {
  const defaultSetup = state => state;
  setups[context] = setup || defaultSetup;
}

function saveTeardown(context, teardown) {
  const defaultTeardown = () => ({});
  teardowns[context] = teardown || defaultTeardown;
}

function addGlobalCommandsToEachContext() {
  commands = _.reduce(commands, (newCommands, contextCommands, contextName) => {
    const globalCommands = _.filter(commands.global, defaultCommand => {
      return !_.find(contextCommands, {name: defaultCommand.name});
    });
    newCommands[contextName] = [...globalCommands, ...contextCommands];
    return newCommands;
  }, {});

  i18n = _.reduce(i18n, (newI18n, translations, contextName) => {
    newI18n[contextName] = _.merge({}, i18n.global, i18n[contextName]);
    return newI18n;
  }, {});
}

function loadModules(modules) {
  modules.forEach(module => {
    module.contexts.forEach(context => {
      saveContextI18n(context.context, context.i18n);
      saveCommands(context.context, context.commands, context.excludeDefaultCommands);
      saveContextName(context.context, context.name);
      saveSwitchOnSelectElement(context.context, context.switchOnSelectElement);
      saveSetup(context.context, context.setup);
      saveTeardown(context.context, context.teardown);
    });
  });
  teardowns.root = state => state;
}

function validateI18n(modules) {
  modules.forEach(validateModule);
}

function getCommand(command, context, lang) {
  const commands = getContextCommands(context, lang);
  command = command.toLowerCase();
  let selectedCommand = commands.find(contextCommand => contextCommand.name === command);
  if (!selectedCommand) {
    selectedCommand = commands.find(contextCommand => contextCommand.name === '*');
  }
  return selectedCommand;
}

function getContextCommands(context, lang) {
  return commands[context]
    .map(command => ({
      ...command,
      name: getI18nText(command.name, context, lang),
      help: getI18nText(command.help, context, lang),
      group: getI18nText(command.group, context, lang)
    }))
    .filter(command => !nativeCommands.find(nativeCommand => nativeCommand.name === command.name))
    .concat(nativeCommands);
}

function getContextName(context, lang) {
  return getI18nText(contextNames[context], context, lang);
}

function keepShowingHelp(commands, actionState) {
  if (commands.showHelp) {
    return false;
  } else if (!_.isUndefined(actionState.showHelp)) {
    return actionState.showHelp;
  }
}

function executeCommand(command, state, allTheCommands) {
  const commandsState = state.commands;
  const backgroundState = state.background;
  const selectedCommand = getCommand(command, commandsState.context, backgroundState.lang);
  if (selectedCommand) {
    let actionState = commandsState;
    if (selectedCommand.nativeCommand) {
      executeNativeCommand(selectedCommand);
    } else {
      actionState = selectedCommand.action(commandsState, command, backgroundState, allTheCommands) || {};
    }
    const showHelpBar = !_.isUndefined(actionState.showHelpBar) ? actionState.showHelpBar : commandsState.showHelpBar;
    const showHelp = keepShowingHelp(commandsState, actionState);
    const nextContext = actionState.context || selectedCommand.switchToContext || commandsState.context;
    const commandWasExecuted = selectedCommand.name !== '*' || !!actionState.commandWasExecuted;
    let newState = {
      ...commandsState
    };
    if (nextContext !== commandsState.context) {
      newState = {};
      actionState = teardowns[commandsState.context](actionState);
      actionState = setups[nextContext]({
        ...actionState,
        rootElement: commandsState.rootElement
      });
    }
    return {
      ...newState,
      ...actionState,
      showHelp,
      showHelpBar,
      contextName: getContextName(nextContext, backgroundState.lang),
      allowedCommands: getContextCommands(nextContext, backgroundState.lang),
      getI18nText,
      context: nextContext,
      commandExecution: {
        command: command,
        executed: commandWasExecuted
      },
      rootElement: commandsState.rootElement
    };
  }
  return {
    ...commandsState,
    commandExecution: {
      command: command,
      executed: false
    }
  };
}

function getStateForSelectedElement(state, el, lang) {
  const tmpState = {
    ...state,
    selectedElement: el
  };
  const newContext = _.findKey(handlersOnSelectElement, handler => handler(tmpState));
  if (newContext) {
    tmpState.context = newContext;
    return {
      ...teardowns[state.context](state),
      context: newContext,
      selectedElement: el,
      ...setups[newContext](tmpState),
      contextName: getContextName(newContext, lang),
      allowedCommands: getContextCommands(newContext, lang),
      getI18nText,
      rootElement: state.rootElement,
      commandExecution: state.commandExecution
    };
  }
}

function findText(state, text, lang) {
  const newState = findTextInPage(state, text);
  return {
    ...teardowns[state.context](state),
    ...newState,
    contextName: getContextName(newState.context, lang),
    allowedCommands: getContextCommands(newState.context, lang),
    getI18nText,
    rootElement: state.rootElement,
    commandExecution: state.commandExecution
  };
}

function getActiveModules() {
  return coreModules;
}

const i18nSeparator = 'i18n-';

function getI18nText(key = '', context, currentLanguage) {
  const keyToResolve = _.last(key.split(i18nSeparator));
  if (!keyToResolve) {
    return key;
  }
  currentLanguage = currentLanguage.split('-')[0];
  return i18n[context] && i18n[context][currentLanguage] && i18n[context][currentLanguage][keyToResolve] || key;
}

// need to improve the security of this function
// in order to execute `eval` in an empty closure inside the global scope
function getModuleFromSource(source) {
  let tmp;
  try {
    eval('tmp = ' + source); // eslint-disable-line no-eval
    return _.isFunction(tmp) ? tmp() : tmp;
  } catch (err) {
    log.error(err);
  }
}

function syncNativeCommands() {
  onNativeCommandsChange(commands => {
    nativeCommands = commands;
  });
}

function init(importedModules = []) {
  resetVariables();

  const activeImportedModules = importedModules
    .map(getModuleFromSource)
    .filter(module => _.isObject(module) && (_.isUndefined(module.isActive) || (module.isActive && module.isActive())));

  const modules = coreModules.concat(activeImportedModules);
  loadModules(modules);
  addGlobalCommandsToEachContext();
  validateI18n(modules);
  syncNativeCommands();
}

export default {
  init,
  getI18nText,
  getActiveModules,
  findText,
  getStateForSelectedElement,
  executeCommand,
  getContextName,
  getContextCommands
};
