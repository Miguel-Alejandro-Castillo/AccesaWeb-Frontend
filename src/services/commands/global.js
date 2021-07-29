export function exit(state) {
  return {
    commandWasExecuted: true
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-globe',
  contexts: [{
    context: 'global',
    commands: [{
      name: 'i18n-command.exit',
      help: 'i18n-help.exit',
      group: 'i18n-group.exit',
      action: exit,
      switchToContext: 'root'
    }],
    i18n: {
      en: {
        'command-not-available': 'is a command not available',
        'command-not-available-help': 'Say "Help" to see all the commands',
        'command.exit': 'exit',
        'help.exit': 'Leaves the command session',
        'group.exit': 'Leave the current operation',
        'allowed-commands': 'Allowed Commands'
      },
      es: {
        'command-not-available': 'es un comando no disponible',
        'command-not-available-help': 'Menciona "Ayuda" para ver todos los comandos',
        'command.exit': 'salir',
        'help.exit': 'Salir de la sesión actual',
        'group.exit': 'Salir',
        'allowed-commands': 'Comandos Habilitados'
      }
    }
  }, {
    context: 'root',
    name: 'i18n-name',
    commands: [],
    i18n: {
      en: {
        'name': 'root'
      },
      es: {
        'name': 'principal'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Global Context',
      'description': 'This especial module provides only global commands and translations'
    },
    es: {
      'name': 'Contexto General',
      'description': 'Este módulo especial provee exclusivamente traducciones y comandos generales para todos los contextos'
    }
  }
};
