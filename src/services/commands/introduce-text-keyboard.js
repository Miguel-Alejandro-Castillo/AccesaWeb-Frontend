import $ from 'jquery';
import { exit, getText, updateText } from './introduce-text';
import { isMultiline } from '../element_selectors';
import { submit } from './introduce-text-free-speak';

function appendText(state, text) {
  const currentText = getText(state);
  const newText = `${currentText}${text}`;
  return updateText(state, newText);
}

function removeLetter(state) {
  const newText = getText(state).slice(0, -1);
  return updateText(state, newText);
}

function shift(state) {
  return {
    keyboard: state.keyboard === 'general' ? 'shift' : 'general'
  };
}

function enter(state) {
  if (isMultiline(state.selectedElement)) {
    return insertCharacter(state, '\n');
  }
  return submit(state);
}

const actionHandlers = {
  'space': state => insertCharacter(state, ' '),
  '↤ bksp': removeLetter,
  'tab ↦': state => insertCharacter(state, '  '),
  '↵ enter': enter,
  '⇧ shift': shift,
  'accept': exit
};

function insertCharacter(state, character) {
  return appendText(state, character);
}

function getActionHandler(action) {
  return actionHandlers[action] || insertCharacter;
}

function pressButton(element, state) {
  const action = $(element).data('action');
  const actionHandler = getActionHandler(action);
  return actionHandler(state, action);
}

export function pressKeyboardKey(state, number) {
  const element = state.rootElement.querySelector(`[data-key="${number}"]`);
  if (element) {
    const newState = pressButton(element, state) || {};
    return {
      ...newState,
      commandWasExecuted: true
    };
  }
}
