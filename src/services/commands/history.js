import $ from 'jquery';
import { executeBackgroundAction } from './background';
import { getNumber, getNumbersUntil } from './introduce-number.js';
import openUrl from '../open-url';
import scroll from '../scroll.js';

function getScrollContainer(state) {
  return $(state.rootElement.querySelector('.dialog .body'));
}

function down(state) {
  scroll.down(getScrollContainer(state));
}

function up(state) {
  scroll.up(getScrollContainer(state));
}

function history() {
  executeBackgroundAction({getHistory: true});
  return {
    context: 'history'
  };
}

function openUrlOfElement(element) {
  const url = element.getAttribute('data-url');
  if (url) {
    openUrl(url);
    return {
      commandWasExecuted: true
    };
  }
}

function reviewCommand(state, command, background, allTheCommands) {
  const number = getNumber(allTheCommands);
  if (number) {
    const element = state.rootElement.querySelector(`[data-key="${number}"]`);
    if (element) {
      return openUrlOfElement(element);
    }
  }
}

function setup() {
  return {
    expandedCommands: getNumbersUntil(200)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-history',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.history',
      group: 'i18n-group.history',
      help: 'i18n-help.history',
      action: history
    }],
    i18n: {
      en: {
        'command.history': 'history',
        'group.history': 'History',
        'help.history': 'Opens the accessed website list'
      },
      es: {
        'command.history': 'historial',
        'group.history': 'Historial',
        'help.history': 'Abre lista de sitios webs accedidos'
      }
    }
  }, {
    context: 'history',
    name: 'i18n-name',
    setup: setup,
    commands: [{
      name: 'i18n-command.scroll-up',
      action: up,
      group: 'i18n-group.scroll-up',
      help: 'i18n-help.scroll-up'
    }, {
      name: 'i18n-command.scroll-down',
      action: down,
      group: 'i18n-group.scroll-down',
      help: 'i18n-help.scroll-down'
    }, {
      name: '*',
      help: 'i18n-help.*',
      action: reviewCommand
    }],
    i18n: {
      en: {
        'name': 'History',
        'command.scroll-up': 'scroll up',
        'group.scroll-up': 'Scroll',
        'help.scroll-up': 'Performs a scroll up of the list',
        'command.scroll-down': 'scroll down',
        'help.scroll-down': 'Performs a scroll down of the list',
        'group.scroll-down': 'Scroll',
        'scroll-up': 'Scroll Up',
        'scroll-down': 'Scroll Down',
        'open': 'Open',
        'exit': 'Exit',
        'help.*': 'Execute an action',
        'date-format': 'MM/DD/YYYY',
        'no-title-provided': 'No title provided'
      },
      es: {
        'name': 'Historial',
        'command.scroll-up': 'subir',
        'group.scroll-up': 'Desplazarse',
        'help.scroll-up': 'Desplazar la lista hacia arriba',
        'command.scroll-down': 'bajar',
        'group.scroll-down': 'Desplazarse',
        'help.scroll-down': 'Desplazar la lista hacia abajo',
        'scroll-up': 'Subir',
        'open': 'Abrir',
        'exit': 'Salir',
        'scroll-down': 'Bajar',
        'help.*': 'Ejecuta la acción',
        'date-format': 'DD/MM/YYYY',
        'no-title-provided': 'Sin título'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'History',
      'description': 'Manage all about accessed websites'
    },
    es: {
      'name': 'Historial',
      'description': 'Administra todo acerca de los sitios web visitados'
    }
  }
};
