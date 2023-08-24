import openUrl from '../open-url';

export function search(state, command) {
  openUrl(`https://www.google.com/search?q=${command}`);
  return {
    commandWasExecuted: true
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-search',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.search',
      help: 'i18n-help.search',
      action: () => {},
      switchToContext: 'search',
      group: 'i18n-group.search'
    }],
    i18n: {
      en: {
        'command.search': 'search',
        'help.search': 'Search something in Google',
        'group.search': 'Search'
      },
      es: {
        'command.search': 'buscar',
        'help.search': 'Busca algo en Google',
        'group.search': 'Buscar'
      }
    }
  }, {
    context: 'search',
    name: 'i18n-name',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      group: 'i18n-group',
      action: search,
      switchToContext: 'root'
    }],
    i18n: {
      en: {
        'name': 'Search',
        'help.*': 'Say the name of what you want to search',
        'group': 'Search',
        'search-params': 'Say the name of what you want to search',
        'exit': 'Exit'
      },
      es: {
        'name': 'Buscar',
        'help.*': 'Indica el nombre de lo que desees buscar',
        'group': 'Buscar',
        'search-params': 'Indica el nombre de lo que desees buscar',
        'exit': 'Salir'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Search',
      'description': 'This module allows you to easily search for something.'
    },
    es: {
      'name': 'Buscar',
      'description': 'Este módulo permite buscar algo fácilmente.'
    }
  }
};
