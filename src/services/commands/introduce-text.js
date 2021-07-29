import _ from 'lodash';
import { exit as defaultExit } from './global';
import { getNumber, getNumbersUntil } from './introduce-number';
import introduceTextFreeSpeak, { introduceText } from './introduce-text-free-speak';
import { isTextInput} from '../element_selectors';
import { pressKeyboardKey } from './introduce-text-keyboard';

const enHtmlExample = `
  <p>
    Use the command "click" or "click text" over one of the following field texts then you will be able to introduce some text
  </p>
  <h4>Single Line Text</h4>
  <p class="box">
    <input type="text" />
  </p>
  <h4>Multiline Text</h4>
  <p class="box">
    <textarea></textarea>
  </p>`;

const esHtmlExample = `
  <p>
    Usar el comando "click" o "click texto" sobre uno de los siguientes campos de texto, luego podrás escribir en el
  </p>
  <h4>Campo de Texto</h4>
  <p class="box">
    <input type="text" />
  </p>
  <h4>Campo de Texto Multilinea</h4>
  <p class="box">
    <textarea></textarea>
  </p>`;

export function getText(state) {
  return state.selectedElement.value || '';
}

function showCursorAtEnd(el) {
  const valueLength = el.value.length;
  if (el.setSelectionRange) {
    el.focus();
    el.setSelectionRange(valueLength, valueLength);
  } else if (el.createTextRange) {
    const range = el.createTextRange();
    range.collapse(true);
    range.moveEnd('character', valueLength);
    range.moveStart('character', valueLength);
    range.select();
  }
}

export function setText(state, text) {
  state.selectedElement.value = text;
  showCursorAtEnd(state.selectedElement);
  state.selectedElement.dispatchEvent(new Event('input'));
}

export function updateText(state, text) {
  if (state.textHistoryPointer < state.textHistory.length - 1) {
    state.textHistory = state.textHistory.slice(0, state.textHistoryPointer + 1);
  }
  return {
    ...setText(state, text),
    textHistory: [...state.textHistory, text],
    textHistoryPointer: state.textHistory.length
  };
}

function reviewCommand(state, command, background, allTheCommands) {
  const number = getNumber(allTheCommands);
  if (number && state.displayKeyboard) {
    return pressKeyboardKey(state, number);
  }
  return {
    ...introduceText(state, command),
    commandWasExecuted: true
  };
}

export function exit(state) {
  _.defer(() => state.selectedElement.blur());
  return {
    ...defaultExit(state),
    displayTextFinder: state.displayTextFinder,
    findingText: state.findingText
  };
}

function displayKeyboard(state) {
  return {
    displayKeyboard: true
  };
}

function hideKeyboard(state) {
  return {
    displayKeyboard: false
  };
}

function handleSwitchOnSelectElement(state) {
  return isTextInput(state.selectedElement);
}

function setup(state) {
  return {
    keyboard: 'general',
    displayKeyboard: false,
    textHistory: [],
    textHistoryPointer: -1,
    expandedCommands: getNumbersUntil(200)
  };
}

function teardown(state) {
  return _.pick(state, 'displayTextFinder', 'findingText');
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-keyboard-o',
  contexts: [{
    context: 'introduceText',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup: setup,
    teardown: teardown,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      action: reviewCommand
    }, {
      name: 'i18n-command.exit',
      help: 'i18n-help.exit',
      action: exit,
      group: 'i18n-group.exit',
      switchToContext: 'root'
    }, {
      name: 'i18n-command.display-keyboard',
      help: 'i18n-help.display-keyboard',
      action: displayKeyboard,
      group: 'i18n-group.display-keyboard'
    }, {
      name: 'i18n-command.hide-keyboard',
      help: 'i18n-help.hide-keyboard',
      action: hideKeyboard,
      group: 'i18n-group.hide-keyboard'
    },
      ...introduceTextFreeSpeak.commands
    ],
    i18n: {
      en: {
        'name': 'Introduce Text',
        'help.*': 'Introduces text into the selected text element',
        'command.exit': 'exit',
        'help.exit': 'Leaves the introduce text session',
        'group.exit': 'Leave session',
        'command.display-keyboard': 'keyboard',
        'help.display-keyboard': 'Shows a virtual keyboard',
        'group.display-keyboard': 'Keyboard',
        'command.hide-keyboard': 'hide keyboard',
        'help.hide-keyboard': 'Close the virtual keyboard',
        'group.hide-keyboard': 'Keyboard',
        'dictate-text': 'Dictate free text',
        'submit': 'Submit',
        'exit': 'Exit',
        'html-example': enHtmlExample,
        '↤ bksp': '↤ bksp',
        'tab ↦': 'tab ↦',
        '↵ enter': '↵ enter',
        '⇧ shift': '⇧ shift',
        'accept': 'accept',
        'space': 'space',
        'locale': 'en',
        'keyboard': 'Keyboard',
        'hide-keyboard': 'Hide keyboard',
        'remove': 'Remove',
        'remove-line': 'Remove line',
        'clean-up': 'Clean up',
        'paste': 'Paste',
        'redo': 'Redo',
        'undo': 'Undo',
        ...introduceTextFreeSpeak.i18n.en
      },
      es: {
        'name': 'Ingresar texto',
        'help.*': 'Ingresar texto en el campo de texto seleccionado',
        'command.exit': 'salir',
        'help.exit': 'Salir de la sesión de introducción de texto',
        'group.exit': 'Salir de la sesión',
        'command.display-keyboard': 'teclado',
        'help.display-keyboard': 'Muestra un teclado virtual',
        'group.display-keyboard': 'Teclado',
        'command.hide-keyboard': 'ocultar teclado',
        'help.hide-keyboard': 'Cierra el teclado virtual',
        'group.hide-keyboard': 'Teclado',
        'dictate-text': 'Dictar texto libre',
        'submit': 'Enviar',
        'exit': 'Salir',
        'html-example': esHtmlExample,
        '↤ bksp': '↤ bksp',
        'tab ↦': 'tab ↦',
        '↵ enter': '↵ enter',
        '⇧ shift': '⇧ shift',
        'accept': 'aceptar',
        'space': 'spacio',
        'locale': 'es',
        'keyboard': 'Teclado',
        'hide-keyboard': 'Ocultar teclado',
        'remove': 'Borrar',
        'remove-line': 'Borrar linea',
        'clean-up': 'Borrar todo',
        'paste': 'Pegar',
        'redo': 'Deshacer',
        'undo': 'Rehacer',
        ...introduceTextFreeSpeak.i18n.es
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Introduce Text',
      'description': 'After click over a text field it allows you to introduce text'
    },
    es: {
      'name': 'Introducir Texto',
      'description': 'Luego de hacer click sobre un campo de texto te permite escribir en el'
    }
  }
};
