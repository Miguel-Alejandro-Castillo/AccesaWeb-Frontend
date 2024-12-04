import { executeBackgroundAction } from './background';
import { getI18nText } from '../../docs/i18n/i18n';
import _ from 'lodash';

const textAlignOptions = ['none', 'left', 'justify', 'center', 'right'];

const fontOptions = ['none', 'arial', 'opendyslexic'];

const lineSpacingOptions = ['none', '1.5', '1.75', '2'];

const paragraphSpacingOptions = ['none', '2', '2.25', '2.5'];

const fontSizeOptions = ['50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200'];

const textAlignCommands = textAlignOptions.map(option => ({
  name: `i18n-command.change-align-${option}`,
  help: `i18n-help.change-align-${option}`,
  group: 'i18n-group.change-align',
  action: () => changeTextAlign(option)
}));

const fontCommands = fontOptions.map(option => ({
  name: `i18n-command.change-font-${option}`,
  help: `i18n-help.change-font-${option}`,
  group: 'i18n-group.change-font',
  action: () => changeFont(option)
}));

const fontSizeCommands = fontSizeOptions.map(option => ({
  name: `i18n-command.change-font-size-${option}`,
  help: `i18n-help.change-font-size-${option}`,
  group: 'i18n-group.change-font-size',
  action: () => changeFontSize(option)
}));

const lineSpacingCommands = lineSpacingOptions.map(option => ({
  name: `i18n-command.change-line-spacing-${option}`,
  help: `i18n-help.change-line-spacing-${option}`,
  group: 'i18n-group.change-line-spacing',
  action: () => changeLineSpacing(option)
}));

const paragraphSpacingCommands = paragraphSpacingOptions.map(option => ({
  name: `i18n-command.change-paragraph-spacing-${option}`,
  help: `i18n-help.change-paragraph-spacing-${option}`,
  group: 'i18n-group.change-paragraph-spacing',
  action: () => changeParagraphSpacing(option)
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

function i18nFontSize(language) {
  return fontSizeOptions.reduce((acc, option) => {
    acc[`command.change-font-size-${option}`] = _.isFinite(parseFloat(option)) ? option + '%' : _.lowerCase(getI18nText(option, {}, language));
    acc[`help.change-font-size-${option}`] = _.isFinite(parseFloat(option)) ? option + '%' : getI18nText(option, {}, language);
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

function i18nParagraphSpacing(language) {
  return paragraphSpacingOptions.reduce((acc, option) => {
    acc[`command.change-paragraph-spacing-${option}`] = _.isFinite(parseFloat(option)) ? option : _.lowerCase(getI18nText(option, {}, language));
    acc[`help.change-paragraph-spacing-${option}`] = _.isFinite(parseFloat(option)) ? option : getI18nText(option, {}, language);
    return acc;
  }, {});
}

export function changeTextAlign(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeTextAlign',
      param: value
    }
  });
}

export function changeFont(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeFont',
      param: value
    }
  });
}

export function changeFontSize(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeFontSize',
      param: value
    }
  });
}

export function changeLineSpacing(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeLineSpacing',
      param: value
    }
  });
}

export function changeParagraphSpacing(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeParagraphSpacing',
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
          group: 'i18n-group.change-paragraph-spacing'
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
          'group.change-paragraph-spacing': 'Format'
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
          'group.change-paragraph-spacing': 'Formato'
        }
      }
    },
    {
      context: 'align',
      name: 'i18n-name',
      commands: [...textAlignCommands
      ],
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
      ],
      i18n: {
        en: {
          'name': 'Font',
          'help.*': 'Please select the font you want to set.',
          'group': 'Font',
          'font-params': 'Please select the font you want to set: none, arial or dyslexic',
          'exit': 'Exit',
          ...i18nEnFont()
        },
        es: {
          'name': 'Fuente',
          'help.*': 'Indique la fuente que desea configurar.',
          'group': 'Fuente',
          'font-params': 'Indique la fuente que desea configurar: ninguino, arial o dyslexic',
          'exit': 'Salir',
          ...i18nEsFont()
        }
      }
    },
    {
      context: 'font-size',
      name: 'i18n-name',
      commands: [
        ...fontSizeCommands],
      i18n: {
        en: {
          'name': 'Font size',
          'help.*': 'Please select a font size between 50% and 200%',
          'group': 'Font',
          'font-size-params': 'Please select a font size between 50% and 200%',
          'exit': 'Exit',
          'group.change-font-size': 'Font',
          ...i18nFontSize('en')
        },
        es: {
          'name': 'Tamaño de fuente',
          'help.*': 'Indique un tamaño de fuente entre 50% y 200%',
          'group': 'Fuente',
          'font-size-params': 'Indique un tamaño de fuente entre 50% y 200%',
          'exit': 'Salir',
          'group.change-font-size': 'Fuente',
          ...i18nFontSize('es')
        }
      }
    },
    {
      context: 'line-spacing',
      name: 'i18n-name',
      commands: [
        ...lineSpacingCommands
      ],
      i18n: {
        en: {
          'name': 'Line spacing',
          'help.*': 'Specify a spacing',
          'group.change-line-spacing': 'Spacing',
          'line-spacing-params': 'Specify a spacing between the values ​​1 and 2',
          'exit': 'Exit',
          ...i18nLineSpacing('en')
        },
        es: {
          'name': 'Espaciado',
          'help.*': 'Indique un espaciado',
          'group.change-line-spacing': 'Espaciado',
          'spacing-params': 'Indique un espaciado entre los valores 1 y 2',
          'exit': 'Salir',
          ...i18nLineSpacing('es')
        }
      }
    },
    {
      context: 'paragraph-spacing',
      name: 'i18n-name',
      commands: [
        ...paragraphSpacingCommands
      ],
      i18n: {
        en: {
          'name': 'Paragraph spacing',
          'help.*': 'Specify a spacing',
          'group': 'Spacing',
          'paragraph-spacing-params': 'Specify a spacing between the values ​1.5 and 2.5',
          'exit': 'Exit',
          'group.change-paragraph-spacing': 'Format',
          ...i18nParagraphSpacing('en')
        },
        es: {
          'name': 'Espaciado entre párrafos',
          'help.*': 'Indique un espaciado ',
          'group': 'Espaciado',
          'paragraph-spacing-params': 'Indique un espaciado entre los valores 1.5 y 2.5',
          'exit': 'Salir',
          'group.change-paragraph-spacing': 'Formato',
          ...i18nParagraphSpacing('es')
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