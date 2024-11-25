import { executeBackgroundAction } from './background';
import { getI18nText } from '../../docs/i18n/i18n';
import _ from 'lodash';

const contrastOptions = ['none', 'whiteBlack', 'blackWhite', 'yellowBlack', 'blackYellow'];

const contrastCommands = contrastOptions.map(option => ({
  name: `i18n-command.change-contrast-${option}`,
  help: `i18n-help.change-contrast-${option}`,
  group: 'i18n-group',
  action: () => changeContrast(option)
}));

function i18nContrast(language) {
  return contrastOptions.reduce((acc, option) => {
    acc[`command.change-contrast-${option}`] = _.lowerCase(getI18nText(option, {}, language));
    acc[`help.change-contrast-${option}`] = getI18nText(option, {}, language);
    return acc;
  }, {});
}

export function changeContrast(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeContrast',
      param: value
    }
  });
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-image',
  contexts: [
    {
      context: 'root',
      commands: [
        {
          name: 'i18n-command.change-contrast',
          help: 'i18n-help.change-contrast',
          action: () => { },
          switchToContext: 'change-contrast',
          group: 'i18n-group.customize'
        }
      ],
      i18n: {
        en: {
          'command.change-contrast': 'change contrast',
          'help.change-contrast': 'Change contrast',
          'group.customize': 'Customize'
        },
        es: {
          'command.change-contrast': 'cambiar contraste',
          'help.change-contrast': 'Cambia el contraste',
          'group.customize': 'Personalizar'

        }
      }
    },
    {
      context: 'change-contrast',
      name: 'i18n-name',
      commands: [
        ...contrastCommands
      ],
      i18n: {
        en: {
          'name': 'change contrast',
          'help.*': 'Select the type of contrast you want to set.',
          'group': 'Customize',
          'change-contrast-params': 'Please indicate the type of contrast you want to set from the opcion: black on white, white on black, black on yellow, or yellow on black.',
          'exit': 'Exit',
          ...i18nContrast('en')
        },
        es: {
          'name': 'cambiar contraste',
          'help.*': 'Indique el tipo de contraste que desea configurar.',
          'group': 'Personalizar',
          'change-contrast-params': 'Indique el tipo de contraste que desea configurar entre las opciones: negro sobre blanco, blanco sobre negro, negro sobre amarillo o amarillo sobre negro',
          'exit': 'Salir',
          ...i18nContrast('es')
        }
      }
    }
  ],
  i18n: {
    en: {
      'name': 'Customize',
      'description': 'This template allows you to customize the view of the pages visited'
    },
    es: {
      'name': 'Personalizar',
      'description': 'Este modulo permite personalizar la vista de las paginas visitadas'
    }
  }
};