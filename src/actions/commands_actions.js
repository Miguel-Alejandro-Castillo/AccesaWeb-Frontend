import { createAction } from 'redux-actions';
import _ from 'lodash';
import metaphone from 'metaphone';
import stringSimilarity from 'string-similarity';
import wordsToNumbers from 'words-to-numbers';
import {
  init as initCommands,
  executeCommand,
  findText,
  getI18nText,
  getContextCommands,
  getContextName,
  getStateForSelectedElement
} from '../services/commands';
import log from 'loglevel';

const updateCommandState = createAction('UPDATE_COMMAND_STATE');

const similarity = {
  'en-US': 0.5,
  'es-AR': 0.7
};

function getCommands(allowedCommands = [], expandedCommands = []) {
  return allowedCommands
    .map(command => command.name)
    .concat(expandedCommands);
}

function getPhonetic(text) {
  const phonema = metaphone(text);
  if (!phonema || phonema === '0') {
    return text;
  }
  return phonema;
}

function normalizeCommand(commands, state, lang) {
  if (state.allowedCommands.length === 0) {
    return commands[0].text;
  }

  const isEnglish = lang.includes('en');
  const allowedCommands = getCommands(state.allowedCommands, state.expandedCommands)
    .map(command => ({
      command,
      phonetic: getPhonetic(command)
    }));

  const allowedCommandsPhonetic = allowedCommands.map(command => command.phonetic);

  const spokenCommands = commands.map(command => {
    const textCommand = isEnglish && _.isFinite(wordsToNumbers(command)) ? `${wordsToNumbers(command)}` : command.text;
    return {
      command: textCommand,
      phonetic: getPhonetic(textCommand)
    };
  });

  const similarCommandPhonetics = spokenCommands.map(aCommand => {
    if (allowedCommandsPhonetic.includes(aCommand.phonetic)) {
      return {
        rating: 1,
        target: aCommand.phonetic
      };
    }
    const result = stringSimilarity.findBestMatch(aCommand.phonetic, allowedCommandsPhonetic);
    return result.bestMatch;
  });
  const bestSimilarCommandPhonetic = _.last(_.sortBy(similarCommandPhonetics, 'rating', phonetic => phonetic.target.length));

  const bestCommand = _.find(allowedCommands, {phonetic: bestSimilarCommandPhonetic.target});

  log.info(bestSimilarCommandPhonetic.rating, bestCommand.command);
  return bestSimilarCommandPhonetic.rating >= similarity[lang] ? bestCommand.command : commands[0].text;
}

function fireCommand(commands) {
  return (dispatch, getState) => {
    const state = getState();
    const command = normalizeCommand(commands, state.commands, state.background.lang);
    const newState = executeCommand(command, state, commands);
    dispatch(updateCommandState(newState));
  };
}

function updateSelectedElement(el) {
  return (dispatch, getState) => {
    _.defer(() => {
      el = el || document.activeElement;
      /*
      Emii con este fix se resuelve el hecho de cliquear sobre el select de contraste,
      No se mostrara el odioso cartel del microfono
      Nota: para otro elemeento agregar class _not-focuseable-element para que funcione
      */
      if (el.getAttribute('id') === 'browser-voice-control' || el.classList.contains('_not-focuseable-element')) {
        return;
      }
      const state = getState().commands;
      const newState = getStateForSelectedElement(state, el, getState().background.lang);
      if (newState) {
        dispatch(updateCommandState(newState));
      }
    });
  };
}

function submitTextToFind(text) {
  return (dispatch, getState) => {
    const state = getState().commands;
    const background = getState().background;
    const newState = findText(state, text, background.lang);
    dispatch(updateCommandState(newState));
  };
}

function reloadCommandTranslations() {
  return (dispatch, getState) => {
    const state = getState().commands;
    const background = getState().background;
    const newState = {
      ...state,
      allowedCommands: getContextCommands(state.context, background.lang),
      contextName: getContextName(state.context, background.lang)
    };
    dispatch(updateCommandState(newState));
  };
}

function init(initialData) {
  return (dispatch, getState) => {
    initCommands(initialData.importedModules);
    const newState = {
      context: initialData.context,
      allowedCommands: getContextCommands(initialData.context, initialData.lang),
      contextName: getContextName(initialData.context, initialData.lang),
      getI18nText,
      rootElement: initialData.rootElement
    };
    dispatch(updateCommandState(newState));
  };
}

export default {
  init,
  reloadCommandTranslations,
  fireCommand,
  submitTextToFind,
  updateSelectedElement
};
