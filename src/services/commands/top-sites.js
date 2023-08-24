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

function topSites() {
  executeBackgroundAction({getTopSites: true});
  return {
    context: 'top-sites'
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
    expandedCommands: getNumbersUntil(20)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-line-chart',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.top-sites',
      group: 'i18n-group.top-sites',
      help: 'i18n-help.top-sites',
      action: topSites
    }],
    i18n: {
      en: {
        'command.top-sites': 'top sites',
        'group.top-sites': 'Top sites',
        'help.top-sites': 'Opens the most frequented site list'
      },
      es: {
        'command.top-sites': 'sitios más visitados',
        'group.top-sites': 'Sitios más visitados',
        'help.top-sites': 'Abre lista de sitios más visitados'
      }
    }
  }, {
    context: 'top-sites',
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
        'name': 'Top Sites',
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
        'help.*': 'Execute an action'
      },
      es: {
        'name': 'Sitios más visitados',
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
        'help.*': 'Ejecuta la acción'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Top Sites',
      'description': 'Manage all about most frequented websites'
    },
    es: {
      'name': 'Sitios más visitados',
      'description': 'Administra todo acerca de los sitios más visitados'
    }
  }
};
