import _ from 'lodash';
import log from 'loglevel';
import { getAvailableLanguages } from '../appSettings';

const languages = getAvailableLanguages();

function validateText(text, i18n, contextName, moduleName) {
  const key = _.last(text.split('i18n-'));
  const place = contextName ? `in context ${contextName}` : `in module ${moduleName}`;
  if (!key) {
    log.warn('Need to translate ', `"${text}"`, place);
    return;
  }
  languages.forEach(lang => {
    const translation = i18n[lang] && i18n[lang][key];
    if (!translation) {
      log.error('Missing', lang, 'translation for', `"${text}"`, place);
    }
  });
}

function validateCommands(commands = [], i18n, context) {
  if (!i18n) {
    log.warn('Need to translate', commands, context);
    return;
  }
  commands.forEach(command =>
    _.values(_.pick(command, ['name', 'group', 'help']))
    .filter(value => _.isString(value) && value !== '*')
    .forEach(text => validateText(text, i18n, context)));
}

function validateContext(context) {
  validateCommands(context.commands, context.i18n, context.context);
  if (context.name) {
    validateText(context.name, context.i18n, context.context);
  }
}

export function validateModule(module) {
  validateText(module.name, module.i18n, null, module.name);
  validateText(module.description, module.i18n, null, module.name);
  module.contexts.forEach(context => validateContext(context));
}
