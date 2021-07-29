function help(state, command, background) {
  return {
    showHelp: !state.showHelp
  };
}

function helpBar(state) {
  return {
    showHelpBar: !state.showHelpBar
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-globe',
  contexts: [{
    context: 'global',
    name: 'i18n-name',
    commands: [{
      name: 'i18n-command.help',
      help: 'i18n-help.help',
      group: 'i18n-group.help',
      action: help
    }, {
      name: 'i18n-command.help-bar',
      help: 'i18n-help.help-bar',
      group: 'i18n-group.help-bar',
      action: helpBar
    }],
    i18n: {
      en: {
        'name': 'Global',
        'command.help': 'help',
        'help.help': 'Displays this help dialog',
        'group.help': 'Get more help',
        'command.help-bar': 'help bar',
        'help.help-bar': 'Displays a list of allowed commands',
        'group.help-bar': 'Get more help',
        'help': 'Help',
        'allowed-commands-in-this-context': 'Allowed commands in this context',
        'exit': 'Exit',
        'scroll-up': 'Scroll Up',
        'scroll-down': 'Scroll Down',
        'help-bar': 'Help Bar'
      },
      es: {
        'name': 'General',
        'command.help': 'ayuda',
        'help.help': 'Muestra la lista de comandos de voz disponibles para ser ejecutados',
        'group.help': 'Obtener ayuda',
        'command.help-bar': 'barra de ayuda',
        'help.help-bar': 'Muestra la lista de comandos habilitados en una barra lateral',
        'group.help-bar': 'Obtener ayuda',
        'help': 'Ayuda',
        'allowed-commands-in-this-context': 'Comandos habilitados en este contexto',
        'exit': 'Salir',
        'scroll-up': 'Subir',
        'scroll-down': 'Bajar',
        'help-bar': 'Barra de Ayuda'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Help',
      'description': 'Bring information about allowed commands'
    },
    es: {
      'name': 'Ayuda',
      'description': 'Brinda información acerca de comandos habilitados'
    }
  }
};
