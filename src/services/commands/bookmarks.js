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

function addBookmarks() {
  executeBackgroundAction({
    addBookmark: {
      title: document.title,
      url: document.URL
    }
  });
}

function bookmarks() {
  executeBackgroundAction({getBookmarks: true});
  return {
    context: 'bookmarks'
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

function removeBookmark(bookmarkId) {
  executeBackgroundAction({removeBookmark: bookmarkId });
}

function handleBookmarkAction(el) {
  const id = el.getAttribute('data-id');
  if (id) {
    removeBookmark(id);
    return {
      commandWasExecuted: true
    };
  }
  return openUrlOfElement(el);
}

function reviewCommand(state, command, background, allTheCommands) {
  const number = getNumber(allTheCommands);
  if (number) {
    const element = state.rootElement.querySelector(`[data-key="${number}"]`);
    if (element) {
      return handleBookmarkAction(element);
    }
  }
}

function setup(state) {
  return {
    expandedCommands: getNumbersUntil(200)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-bookmark',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.add-bookmark',
      group: 'i18n-group.add-bookmark',
      help: 'i18n-help.add-bookmark',
      action: addBookmarks
    }, {
      name: 'i18n-command.bookmarks',
      group: 'i18n-group.bookmarks',
      help: 'i18n-help.bookmarks',
      action: bookmarks
    }],
    i18n: {
      en: {
        'command.add-bookmark': 'add bookmark',
        'help.add-bookmark': 'Saves the current page as a bookmark',
        'group.add-bookmark': 'Bookmarks',
        'command.bookmarks': 'bookmarks',
        'group.bookmarks': 'Bookmarks',
        'help.bookmarks': 'Opens bookmark list'
      },
      es: {
        'command.add-bookmark': 'agregar a favoritos',
        'help.add-bookmark': 'Guarda el sitio actual en favoritos',
        'group.add-bookmark': 'Favoritos',
        'command.bookmarks': 'favoritos',
        'group.bookmarks': 'Favoritos',
        'help.bookmarks': 'Abre lista de favoritos'
      }
    }
  }, {
    context: 'bookmarks',
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
        'name': 'Bookmarks',
        'command.scroll-up': 'scroll up',
        'group.scroll-up': 'Scroll',
        'help.scroll-up': 'Performs a scroll up of the bookmark list',
        'command.scroll-down': 'scroll down',
        'help.scroll-down': 'Performs a scroll down of the bookmark list',
        'group.scroll-down': 'Scroll',
        'scroll-up': 'Scroll Up',
        'scroll-down': 'Scroll Down',
        'open': 'Open',
        'delete': 'Delete',
        'exit': 'Exit',
        'help.*': 'Execute an action'
      },
      es: {
        'name': 'Favoritos',
        'command.scroll-up': 'subir',
        'group.scroll-up': 'Desplazarse',
        'help.scroll-up': 'Desplazar la lista de favoritos hacia arriba',
        'command.scroll-down': 'bajar',
        'group.scroll-down': 'Desplazarse',
        'help.scroll-down': 'Desplazar la lista de favoritos hacia abajo',
        'scroll-up': 'Subir',
        'open': 'Abrir',
        'exit': 'Salir',
        'scroll-down': 'Bajar',
        'delete': 'Eliminar',
        'help.*': 'Ejecuta la acción'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Bookmarks',
      'description': 'Manage all about bookmarks'
    },
    es: {
      'name': 'Favoritos',
      'description': 'Administra todo acerca de los favoritos'
    }
  }
};
