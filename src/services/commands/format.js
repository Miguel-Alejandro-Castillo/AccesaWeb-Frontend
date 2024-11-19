import { executeBackgroundAction } from './background';
import { getI18nText } from '../../docs/i18n/i18n';
import _ from 'lodash';

const textAlignOptions = ['none', 'left', 'justify', 'center', 'right'];

const fontOptions = ['none', 'arial', 'opendyslexic'];

const lineSpacingOptions = ['none', '1', '1.25', '1.5', '1.75', '2'];

const textAlignCommands = textAlignOptions.map(option => ({
  name: `i18n-command.change-align-${option}`,
  help: `i18n-help.change-align-${option}`,
  group: 'i18n-group.change-align',
  action: (state, command) => changeTextAlign(state, command, option)
}));

const fontCommands = fontOptions.map(option => ({
  name: `i18n-command.change-font-${option}`,
  help: `i18n-help.change-font-${option}`,
  group: 'i18n-group.change-font',
  action: (state, command) => changeFont(state, command, option)
}));

const lineSpacingCommands = lineSpacingOptions.map(option => ({
  name: `i18n-command.change-line-spacing-${option}`,
  help: `i18n-help.change-line-spacing-${option}`,
  group: 'i18n-group.change-line-spacing',
  action: (state, command, background, allTheCommands) => changeLineSpacing(state, command, option, allTheCommands)
}));

function i18nEnTextAlign() {
  return textAlignOptions.reduce((acc, option) => {
    acc[`command.change-align-${option}`] = option;
    acc[`help.change-align-${option}`] = getI18nText(option, {}, 'en');
    acc['group.change-align'] = 'Align';
    return acc;
  }, {});
}

function i18nEsTextAlign() {
  return textAlignOptions.reduce((acc, option) => {
    acc[`command.change-align-${option}`] = _.lowerCase(getI18nText(option, {}, 'es'));
    acc[`help.change-align-${option}`] = getI18nText(option, {}, 'es');
    acc['group.change-align'] = 'Alineación';
    return acc;
  }, {});
}

function i18nEnFont() {
  return fontOptions.reduce((acc, option) => {
    acc[`command.change-font-${option}`] = _.lowerCase(getI18nText(option, {}, 'en'));
    acc[`help.change-font-${option}`] = getI18nText(option, {}, 'en');
    acc['group.change-font'] = 'Font';
    return acc;
  }, {});
}

function i18nEsFont() {
  return fontOptions.reduce((acc, option) => {
    acc[`command.change-font-${option}`] = _.lowerCase(getI18nText(option, {}, 'es'));
    acc[`help.change-font-${option}`] = getI18nText(option, {}, 'es');
    acc['group.change-font'] = 'Fuente';
    return acc;
  }, {});
}

function i18nLineSpacing(language) {
  return lineSpacingOptions.reduce((acc, option) => {
    acc[`command.change-line-spacing-${option}`] = _.isFinite(parseFloat(option)) ? option : _.lowerCase(getI18nText(option, {}, language));
    acc[`help.change-line-spacing-${option}`] = _.isFinite(parseFloat(option)) ? option : getI18nText(option, {}, language);
    return acc;
  }, {});
}

function changeTextAlign(state, command, value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeTextAlign',
      param: value
    }
  });
}

function changeFont(state, command, value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeFont',
      param: value
    }
  });
}

function changeFontSize(state, command) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeFontSize',
      param: command
    }
  });
}

function changeLineSpacing(state, command, value, allTheCommands) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeLineSpacing',
      param: value
    }
  });
}

function changeParagraphSpacing(state, command) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeParagraphSpacing',
      param: command
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
          name: 'i18n-command.change-align',
          help: 'i18n-help.change-align',
          action: () => { },
          switchToContext: 'align',
          group: 'i18n-group.align'
        },
        {
          name: 'i18n-command.change-font',
          help: 'i18n-help.change-font',
          action: () => { },
          switchToContext: 'font',
          group: 'i18n-group.font'
        },
        {
          name: 'i18n-command.change-font-size',
          help: 'i18n-help.change-font-size',
          action: () => { },
          switchToContext: 'font-size',
          group: 'i18n-group.font-size'
        },
        {
          name: 'i18n-command.change-line-spacing',
          help: 'i18n-help.change-line-spacing',
          action: () => { },
          switchToContext: 'line-spacing',
          group: 'i18n-group.spacing'
        },
        {
          name: 'i18n-command.change-paragraph-spacing',
          help: 'i18n-help.change-paragraph-spacing',
          action: () => { },
          switchToContext: 'paragraph-spacing',
          group: 'i18n-group.paragraph-spacing'
        }
      ],
      i18n: {
        en: {
          'command.change-align': 'Change align',
          'help.change-align': 'Align the text of the visited pages',
          'group.align': 'Format',
          'command.change-font': 'change font',
          'help.change-font': 'Change font type.',
          'group.font': 'Format',
          'command.change-font-size': 'font size',
          'help.change-font-size': 'Change font size',
          'group.font-size': 'Format',
          'command.change-line-spacing': 'Line spacing',
          'help.change-line-spacing': 'Add line spacing',
          'group.spacing': 'Format',
          'command.change-paragraph-spacing': 'paragraph spacing',
          'help.change-paragraph-spacing': 'Add paragragraph spacing',
          'group.paragraph-spacing': 'Format'
        },
        es: {
          'command.change-align': 'cambiar alineación',
          'help.change-align': 'Alinear el texto de las paginas visitadas',
          'group.align': 'Formato',
          'command.change-font': 'cambiar fuente',
          'help.change-font': 'Cambia el tipo de letra.',
          'group.font': 'Formato',
          'command.change-font-size': 'cambiar tamaño de fuente',
          'help.change-font-size': 'Cambiar el tamaño de la fuente',
          'group.font-size': 'Formato',
          'command.change-line-spacing': 'cambiar espaciado',
          'help.change-line-spacing': 'Agregar espaciado entre renglones',
          'group.spacing': 'Formato',
          'command.change-paragraph-spacing': 'cambiar espaciado entre párrafos',
          'help.change-paragraph-spacing': 'Agregar espaciado entre parrafos',
          'group.paragraph-spacing': 'Formato'
        }
      }
    },
    {
      context: 'align',
      name: 'i18n-name',
      commands: [...textAlignCommands
        /*{
        name: '*',
        help: 'i18n-help.*',
        group: 'i18n-group',
        action: changeAlign,
        switchToContext: 'root'
      }*/],
      i18n: {
        en: {
          name: 'Align',
          'help.*': 'Indicate the alignment you want to set.',
          group: 'Align',
          'align-params': 'Please indicate the alignment you wish to configure: none, left, center, justify or right.',
          'exit': 'Exit',
          ...i18nEnTextAlign()
        },
        es: {
          name: 'Alineación',
          'help.*': 'Indique la alineación que desea configurar.',
          'group': 'Alineación',
          'align-params': 'Indique la alineación que desea configurar: ninguno, izquierda, centrado, justificado o derecha.',
          'exit': 'Salir',
          ...i18nEsTextAlign()
        }
      }
    },
    {
      context: 'font',
      name: 'i18n-name',
      commands: [
        ...fontCommands
        /*{
        name: '*',
        help: 'i18n-help.*',
        group: 'i18n-group',
        action: changeFont,
        switchToContext: 'root'
      }*/],
      i18n: {
        en: {
          'name': 'Font',
          'help.*': 'Please select the font you want to set.',
          'group': 'Font',
          'font-params': 'Please select the font you want to set: arial or dyslexic',
          'exit': 'Exit',
          ...i18nEnFont()
        },
        es: {
          'name': 'Fuente',
          'help.*': 'Indique la fuente que desea configurar.',
          'group': 'Fuente',
          'font-params': 'Indique la fuente que desea configurar: arial o dyslexic',
          'exit': 'Salir',
          ...i18nEsFont()
        }
      }
    },
    {
      context: 'font-size',
      name: 'i18n-name',
      commands: [{
        name: '*',
        help: 'i18n-help.*',
        group: 'i18n-group',
        action: changeFontSize,
        switchToContext: 'root'
      }],
      i18n: {
        en: {
          'name': 'Font size',
          'help.*': 'Please select a font size between 50 and 150',
          'group': 'Font',
          'font-size-params': 'Please select a font size between 50 and 150',
          'exit': 'Exit'
        },
        es: {
          'name': 'Tamaño de fuente',
          'help.*': 'Indique un tamaño de fuente entre 50 y 150',
          'group': 'Fuente',
          'font-size-params': 'Indique un tamaño de fuente entre 50 y 150',
          'exit': 'Salir'
        }
      }
    },
    {
      context: 'line-spacing',
      name: 'i18n-name',
      commands: [
        ...lineSpacingCommands
        /*{
          name: '*',
          help: 'i18n-help.*',
          group: 'i18n-group',
          action: changeLineSpacing,
          switchToContext: 'root'
        }*/
      ],
      i18n: {
        en: {
          'name': 'Line spacing',
          'help.*': 'Specify a spacing between the values ​​1.5 and 2',
          'group.change-line-spacing': 'Spacing',
          'spacing-params': 'Specify a spacing between the values ​​1.5 and 2',
          'exit': 'Exit',
          ...i18nLineSpacing('en')
        },
        es: {
          'name': 'Espaciado',
          'help.*': 'Indique un espaciado entre los valores 1,5 y 2',
          'group.change-line-spacing': 'Espaciado',
          'spacing-params': 'Indique un espaciado entre los valores 1,5 y 2',
          'exit': 'Salir',
          ...i18nLineSpacing('es')
        }
      }
    },
    {
      context: 'paragraph-spacing',
      name: 'i18n-name',
      commands: [{
        name: '*',
        help: 'i18n-help.*',
        group: 'i18n-group',
        action: changeParagraphSpacing,
        switchToContext: 'root'
      }],
      i18n: {
        en: {
          'name': 'Paragraph spacing',
          'help.*': 'Specify a spacing between the values ​2 and 2.5',
          'group': 'Spacing',
          'paragraph-spacing-params': 'Specify a spacing between the values ​​2 and 2.5',
          'exit': 'Exit'
        },
        es: {
          'name': 'Espaciado entre párrafos',
          'help.*': 'Indique un espaciado entre los valores 2 y 2,5',
          'group': 'Espaciado',
          'paragraph-spacing-params': 'Indique un espaciado entre los valores 2 y 2,5',
          'exit': 'Salir'
        }
      }
    }],
  i18n: {
    en: {
      'name': 'Format',
      'description': 'This module allows you to customize the text format'
    },
    es: {
      'name': 'Formato',
      'description': 'Este modulo permite personalizar el formato del texto'
    }
  }
};