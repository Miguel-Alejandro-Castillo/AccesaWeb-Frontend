import openUrl from '../open-url';
import { search } from './search';

function reviewCommand(state, command) {
  if (command.includes('.')) {
    openUrl(`http://${command.replace(/ /g, '')}`);
    return {
      commandWasExecuted: true
    };
  }
  return search(state, command);
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-external-link',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.open',
      help: 'i18n-help.open',
      action: () => {},
      switchToContext: 'open',
      group: 'i18n-group.open'
    }],
    i18n: {
      en: {
        'command.open': 'open',
        'help.open': 'Open a website',
        'group.open': 'Open'
      },
      es: {
        'command.open': 'abrir',
        'help.open': 'Abrir un sitio web',
        'group.open': 'Abrir'
      }
    }
  }, {
    context: 'open',
    name: 'i18n-name',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      group: 'i18n-group',
      action: reviewCommand,
      switchToContext: 'root'
    }],
    i18n: {
      en: {
        'name': 'Open',
        'help.*': 'Say the name of site you want to open',
        'group': 'Open',
        'open-params': 'Say the name of site you want to open',
        'exit': 'Exit'
      },
      es: {
        'name': 'Abrir',
        'help.*': 'Solicita la dirección a cargar',
        'group': 'Abrir',
        'open-params': 'Indica el nombre del sitio que quieres abrir',
        'exit': 'Salir'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Open a website',
      'description': 'This module allows you to open websites.'
    },
    es: {
      'name': 'Abrir un sitio web',
      'description': 'Este módulo permite acceder a un sitio web.'
    }
  }
};
