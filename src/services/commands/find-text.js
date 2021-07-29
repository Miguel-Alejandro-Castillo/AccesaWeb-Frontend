import _ from 'lodash';

let foundOne = false;

function displayFindText() {
  return {
    displayTextFinder: true,
    findingText: false
  };
}

function find(text, previous) {
  const found = window.find(text, false, previous);
  if (found) {
    if (_.isElement(window.getSelection().anchorNode)) {
      find(text, previous);
    } else {
      foundOne = true;
    }
  } else if (foundOne) {
    window.getSelection().empty();
    find(text, previous);
  } else {
    window.getSelection().empty();
  }
}

function previous(state) {
  find(state.textToFind, true);
}

function next(state) {
  find(state.textToFind, false);
}

export function findTextInPage(state, text) {
  const newState = {
    context: 'findText',
    findingText: true,
    textToFind: text
  };
  return {
    ...newState,
    ...next(newState)
  };
}

function setup(state) {
  foundOne = false;
  return state;
}

function teardown({displayTextFinder, findingText}) {
  return {
    displayTextFinder,
    findingText
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-search',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.find-text',
      action: displayFindText,
      group: 'i18n-group.find-text',
      help: 'i18n-help.find-text',
      switchToContext: 'findText'
    }],
    i18n: {
      en: {
        'command.find-text': 'find text',
        'help.find-text': 'Displays text finder',
        'group.find-text': 'Search inside the page'
      },
      es: {
        'command.find-text': 'buscar texto',
        'help.find-text': 'Muestra un buscador',
        'group.find-text': 'Buscar dentro del sitio'
      }
    }
  }, {
    context: 'findText',
    name: 'i18n-name',
    setup: setup,
    teardown: teardown,
    commands: [{
      name: 'i18n-command.previous',
      action: previous,
      group: 'i18n-group.previous',
      help: 'i18n-help.previous'
    }, {
      name: 'i18n-command.next',
      action: next,
      group: 'i18n-group.next',
      help: 'i18n-help.next'
    }],
    i18n: {
      en: {
        'name': 'Text finder',
        'command.edit-text': 'edit text',
        'help.edit-text': 'Modifies text to find',
        'group.edit-text': 'Search inside the page',
        'command.previous': 'previous',
        'help.previous': 'Find previous',
        'group.previous': 'Search inside the page',
        'command.next': 'next',
        'help.next': 'Find next',
        'group.next': 'Search inside the page',
        'previous': 'Previous',
        'next': 'Next',
        'exit': 'Exit'
      },
      es: {
        'name': 'Buscador de texto',
        'command.edit-text': 'modificar texto',
        'help.edit-text': 'Modificar texto a buscar',
        'group.edit-text': 'Buscar dentro del sitio',
        'command.previous': 'anterior',
        'help.previous': 'Buscar anterior',
        'group.previous': 'Buscar dentro del sitio',
        'command.next': 'siguiente',
        'help.next': 'Buscar siguiente',
        'group.next': 'Buscar dentro del sitio',
        'previous': 'Anterior',
        'next': 'Siguiente',
        'exit': 'Salir'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Search text',
      'description': 'Search text in the current page'
    },
    es: {
      'name': 'Buscar texto',
      'description': 'Buscador de texto en la página actual'
    }
  }
};
