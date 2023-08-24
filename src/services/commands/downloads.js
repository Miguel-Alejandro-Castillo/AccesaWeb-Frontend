import $ from 'jquery';
import { executeBackgroundAction } from './background';
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

function downloads() {
  executeBackgroundAction({getDownloads: true});
  return {
    context: 'downloads'
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-download',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.downloads',
      group: 'i18n-group.downloads',
      help: 'i18n-help.downloads',
      action: downloads
    }],
    i18n: {
      en: {
        'command.downloads': 'downloads',
        'group.downloads': 'Downloads',
        'help.downloads': 'Opens the downloaded file list'
      },
      es: {
        'command.downloads': 'descargas',
        'group.downloads': 'Descargas',
        'help.downloads': 'Abre lista de descargas realizadas'
      }
    }
  }, {
    context: 'downloads',
    name: 'i18n-name',
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
    }],
    i18n: {
      en: {
        'name': 'Downloads',
        'command.scroll-up': 'scroll up',
        'group.scroll-up': 'Scroll',
        'help.scroll-up': 'Performs a scroll up of the list',
        'command.scroll-down': 'scroll down',
        'help.scroll-down': 'Performs a scroll down of the list',
        'group.scroll-down': 'Scroll',
        'scroll-up': 'Scroll Up',
        'scroll-down': 'Scroll Down',
        'exit': 'Exit',
        'date-format': 'MM/DD/YYYY'
      },
      es: {
        'name': 'Descargas',
        'command.scroll-up': 'subir',
        'group.scroll-up': 'Desplazarse',
        'help.scroll-up': 'Desplazar la lista hacia arriba',
        'command.scroll-down': 'bajar',
        'group.scroll-down': 'Desplazarse',
        'help.scroll-down': 'Desplazar la lista hacia abajo',
        'scroll-up': 'Subir',
        'exit': 'Salir',
        'date-format': 'DD/MM/YYYY'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Downloads',
      'description': 'See the downloaded files'
    },
    es: {
      'name': 'Descargas',
      'description': 'Abre la lista de archivos descargados'
    }
  }
};
