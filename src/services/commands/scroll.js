import $ from 'jquery';
import scroll from '../scroll.js';

function getScrollContainer() {
  return $('body');
}

function getDistance() {
  return (window.innerHeight || document.documentElement.clientHeight) * 0.8;
}

function down() {
  scroll.down(getScrollContainer(), getDistance());
}

function up() {
  scroll.up(getScrollContainer(), getDistance());
}

function bottom() {
  scroll.bottom(getScrollContainer(), $(document).height());
}

function top() {
  scroll.top(getScrollContainer());
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-arrows',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.scroll-down',
      help: 'i18n-help.scroll-down',
      action: down,
      group: 'i18n-group.scroll'
    }, {
      name: 'i18n-command.scroll-up',
      help: 'i18n-help.scroll-up',
      action: up,
      group: 'i18n-group.scroll'
    }, {
      name: 'i18n-command.scroll-to-the-top',
      help: 'i18n-help.scroll-to-the-top',
      action: top,
      group: 'i18n-group.scroll'
    }, {
      name: 'i18n-command.scroll-to-the-bottom',
      help: 'i18n-help.scroll-to-the-bottom',
      action: bottom,
      group: 'i18n-group.scroll'
    }],
    i18n: {
      en: {
        'group.scroll': 'Scroll',
        'command.scroll-up': 'scroll up',
        'help.scroll-up': 'Performs a scroll up of the document',
        'command.scroll-down': 'scroll down',
        'help.scroll-down': 'Performs a scroll down of the document',
        'command.scroll-to-the-top': 'scroll to the top',
        'help.scroll-to-the-top': 'Performs a scroll up of the document until the beginning of it',
        'command.scroll-to-the-bottom': 'scroll to the bottom',
        'help.scroll-to-the-bottom': 'Performs a scroll down of the document until the end of it'
      },
      es: {
        'group.scroll': 'Desplazarse',
        'command.scroll-up': 'subir',
        'help.scroll-up': 'Desplazar el contenido hacia arriba',
        'command.scroll-down': 'bajar',
        'help.scroll-down': 'Desplazar el contenido hacia abajo',
        'command.scroll-to-the-top': 'arriba',
        'help.scroll-to-the-top': 'Desplazar el contenido hasta el inicio',
        'command.scroll-to-the-bottom': 'abajo',
        'help.scroll-to-the-bottom': 'Desplazar el contenido hasta el final'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Scroll the Page',
      'description': 'Commands useful to scroll up and down the website.'
    },
    es: {
      'name': 'Desplazarse en la Página',
      'description': 'Comandos útiles para desplazarse hacia arriba y abajo dentro del sitio web.'
    }
  }
};
