import { executeBackgroundAction } from './background';

function changeAlign(state, command) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeTextAlign',
      param: command
    }
  });
}

function changeFont(state, command) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeFont',
      param: command
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

function changeLineSpacing(state, command) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'changeLineSpacing',
      param: command
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
          help: 'i18n-help.font',
          action: () => { },
          switchToContext: 'font',
          group: 'i18n-group.font'
        },
        {
          name: 'i18n-command.change-font-size',
          help: 'i18n-help.change-font-size',
          action: () => { },
          switchToContext: 'font-size',
          group: 'i18n-group.font'
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
          group: 'i18n-group.spacing'
        }
      ],
      i18n: {
        en: {
          'command.change-align': 'Change align',
          'help.change-align': 'Align the text of the visited pages',
          'group.align': 'Change align',
          'command.change-font': 'Change font',
          'help.change-font': 'Change font type.',
          'group.font': 'Change font',
          'command.change-font-size': 'Font size',
          'help.change-font-size': 'Change font size',
          'group.font': 'Font size',
          'command.change-line-spacing': 'Line spacing',
          'help.change-line-spacing': 'Add line spacing',
          'group.spacing': 'Line spacing',
          'command.change-paragraph-spacing': 'Paragraph spacing',
          'help.change-paragraph-spacing': 'Add paragragraph spacing',
          'group.spacing': 'Paragraph spacing'
        },
        es: {
          'command.change-align': 'cambiar alineación',
          'help.change-align': 'Alinear el texto de las paginas visitadas',
          'group.align': 'Cambiar alineación',
          'command.change-font': 'cambiar fuente',
          'help.change-font': 'Cambia el tipo de letra.',
          'group.font': 'Cambiar fuente',
          'command.change-font-size': 'cambiar tamaño del texto',
          'help.change-font-size': 'Cambiar el tamaño del texto',
          'group.font': 'Tamaño de fuente',
          'command.change-line-spacing': 'cambiar espaciado',
          'help.change-line-spacing': 'Agregar espaciado entre renglones',
          'group.spacing': 'Espaciado',
          'command.change-paragraph-spacing': 'cambiar espaciado entre párrafos',
          'help.change-paragraph-spacing': 'Agregar espaciado entre parrafos',
          'group.spacing': 'Espaciado entre parrafos'
        }
      }
    },
    {
      context: 'align',
      name: 'i18n-name',
      commands: [{
        name: '*',
        help: 'i18n-help.*',
        group: 'i18n-group',
        action: changeAlign,
        switchToContext: 'root'
      }],
      i18n: {
        en: {
          'name': 'Align',
          'help.*': 'Indicate the alignment you want to set: left, centered, justified or right',
          'group': 'Align',
          'align-params': 'Please indicate the alignment you wish to configure',
          'exit': 'Exit'
        },
        es: {
          'name': 'Alineación',
          'help.*': 'Indique la alineación que desea configurar: izquierda, centrado, justificado o derecha',
          'group': 'Alineación',
          'align-params': 'Indique la alineación que desea configurar',
          'exit': 'Salir'
        }
      }
    },
    {
      context: 'font',
      name: 'i18n-name',
      commands: [{
        name: '*',
        help: 'i18n-help.*',
        group: 'i18n-group',
        action: changeFont,
        switchToContext: 'root'
      }],
      i18n: {
        en: {
          'name': 'Font',
          'help.*': 'Please select the font you want to set: arial or dyslexic',
          'group': 'Font',
          'align-params': 'Please select the font you want to set',
          'exit': 'Exit'
        },
        es: {
          'name': 'Fuente',
          'help.*': 'Indique la fuente que desea configurar: arial o dyslexic',
          'group': 'Fuente',
          'open-params': 'Indique la fuente que desea configurar.',
          'exit': 'Salir'
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
          'align-params': 'Please select a font size between 50 and 150',
          'exit': 'Exit'
        },
        es: {
          'name': 'Tamaño de fuente',
          'help.*': 'Indique un tamaño de fuente entre 50 y 150',
          'group': 'Fuente',
          'open-params': 'Indique un tamaño de fuente entre 50 y 150',
          'exit': 'Salir'
        }
      }
    },
    {
      context: 'line-spacing',
      name: 'i18n-name',
      commands: [{
        name: '*',
        help: 'i18n-help.*',
        group: 'i18n-group',
        action: changeLineSpacing,
        switchToContext: 'root'
      }],
      i18n: {
        en: {
          'name': 'Line spacing',
          'help.*': 'Specify a spacing between the values ​​1.5 and 2',
          'group': 'Spacing',
          'align-params': 'Specify a spacing between the values ​​1.5 and 2',
          'exit': 'Exit'
        },
        es: {
          'name': 'Espaciado',
          'help.*': 'Indique un espaciado entre los valores 1,5 y 2',
          'group': 'Espaciado',
          'open-params': 'Indique un espaciado entre los valores 1,5 y 2',
          'exit': 'Salir'
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
          'align-params': 'Specify a spacing between the values ​​2 and 2.5',
          'exit': 'Exit'
        },
        es: {
          'name': 'Espaciado entre párrafos',
          'help.*': 'Indique un espaciado entre los valores 2 y 2,5',
          'group': 'Espaciado',
          'open-params': 'Indique un espaciado entre los valores 2 y 2,5',
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