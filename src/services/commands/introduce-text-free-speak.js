import $ from 'jquery';
import { getText, setText, updateText, exit } from './introduce-text';
import { paste as pasteFromClipboard} from '../clipboard';

function appendText(state, text) {
  const currentText = getText(state);
  const newText = `${currentText} ${text}`;
  return updateText(state, newText.trim());
}

function removeWord(state) {
  const newText = getText(state).split(' ').slice(0, -1).join(' ');
  return updateText(state, newText);
}

function removeLine(state) {
  const lineBreakIndex = getText(state).lastIndexOf('\n');
  if (lineBreakIndex > 0) {
    const newText = getText(state).substring(0, lineBreakIndex);
    return updateText(state, newText);
  }
  return cleanUp(state);
}

function cleanUp(state) {
  return updateText(state, '');
}

function undo(state) {
  const newNextHistoryPointer = state.textHistoryPointer - 1;
  if (newNextHistoryPointer >= -1) {
    const newText = newNextHistoryPointer === -1 ? '' : state.textHistory[newNextHistoryPointer];
    state.textHistoryPointer = newNextHistoryPointer;
    return setText(state, newText);
  }
}

function redo(state) {
  const newNextHistoryPointer = state.textHistoryPointer + 1;
  if (newNextHistoryPointer < state.textHistory.length) {
    state.textHistoryPointer = newNextHistoryPointer;
    const newText = state.textHistory[state.textHistoryPointer];
    return setText(state, newText);
  }
}

export function submit(state) {
  const $el = $(state.selectedElement);
  const submit = $el.data('submit');
  if (submit === 'ready-event') {
    $el[0].dispatchEvent(new Event('ready'));
  } else {
    const $form = $el.closest('form');
    if ($form[0]) {
      $form[0].submit();
    }
    return  {
      context: 'root',
      ...exit(state)
    };
  }
}

function paste() {
  pasteFromClipboard();
}

export function introduceText(state, text) {
  return appendText(state, text);
}

export default {
  commands: [{
    name: 'i18n-command.remove',
    help: 'i18n-help.remove',
    action: removeWord,
    group: 'i18n-group.remove'
  }, {
    name: 'i18n-command.remove-line',
    help: 'i18n-help.remove-line',
    action: removeLine,
    group: 'i18n-group.remove-line'
  }, {
    name: 'i18n-command.clean-up',
    help: 'i18n-help.clean-up',
    action: cleanUp,
    group: 'i18n-group.clean-up'
  }, {
    name: 'i18n-command.paste',
    help: 'i18n-help.paste',
    action: paste,
    group: 'i18n-group.paste'
  }, {
    name: 'i18n-command.undo',
    help: 'i18n-help.undo',
    action: undo,
    group: 'i18n-group.undo'
  }, {
    name: 'i18n-command.redo',
    help: 'i18n-help.redo',
    action: redo,
    group: 'i18n-group.redo'
  }, {
    name: 'i18n-command.submit',
    help: 'i18n-help.submit',
    action: submit,
    group: 'i18n-group.submit'
  }],
  i18n: {
    en: {
      'command.remove': 'remove',
      'help.remove': 'Removes the last word',
      'group.remove': 'Remove some text',
      'command.remove-line': 'remove line',
      'help.remove-line': 'Removes the last line',
      'group.remove-line': 'Remove some text',
      'command.clean-up': 'clean up',
      'help.clean-up': 'Removes the entire text',
      'group.clean-up': 'Remove some text',
      'command.paste': 'paste',
      'help.paste': 'Pastes copied text',
      'group.paste': 'Paste some text',
      'command.undo': 'undo',
      'help.undo': 'Undoes the last action',
      'group.undo': 'Revert a change',
      'command.redo': 'redo',
      'help.redo': 'Does the reverted action',
      'group.redo': 'Revert a change',
      'command.submit': 'submit',
      'help.submit': 'Submits the current form',
      'group.submit': 'Send the value'
    },
    es: {
      'command.remove': 'borrar',
      'help.remove': 'Borrar la última palabra',
      'group.remove': 'Borrar texto',
      'command.remove-line': 'borrar linea',
      'help.remove-line': 'Borrar la última linea de texto',
      'group.remove-line': 'Borrar texto',
      'command.clean-up': 'borrar todo',
      'help.clean-up': 'Borra todo el texto',
      'group.clean-up': 'Borrar texto',
      'command.paste': 'pegar',
      'help.paste': 'Pegar texto previamente copiado',
      'group.paste': 'Pegar texto',
      'command.undo': 'deshacer',
      'help.undo': 'Deshacer la última acción',
      'group.undo': 'Revertir un cambio',
      'command.redo': 'rehacer',
      'help.redo': 'Restaurar la acción revertida',
      'group.redo': 'Revertir un cambio',
      'command.submit': 'enviar',
      'help.submit': 'Enviar el formulario actual',
      'group.submit': 'Enviar el texto'
    }
  }
};
