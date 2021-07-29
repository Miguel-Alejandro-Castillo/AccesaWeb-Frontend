import _ from 'lodash';
import { getNumber, getNumbersUntil } from './introduce-number.js';
import { isRange } from '../element_selectors';

function reviewCommand(state, command, background, allTheCommands) {
  const number = getNumber(allTheCommands);
  const el = state.selectedElement;
  if (_.isInteger(number) && number >= state.min && number <= state.max) {
    el.value = number;
    return {
      commandWasExecuted: true,
      selectedNumber: number
    };
  }
}

function handleSwitchOnSelectElement(state) {
  return isRange(state.selectedElement);
}

function setup(state) {
  const max = +state.selectedElement.getAttribute('max') || 100;
  return {
    max,
    min: +state.selectedElement.getAttribute('min') || 0,
    selectedNumber: +state.selectedElement.value || 0,
    expandedCommands: getNumbersUntil(max)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-sliders',
  contexts: [{
    context: 'rangeOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup: setup,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      action: reviewCommand
    }],
    i18n: {
      en: {
        'name': 'Range Selection',
        'help.*': 'Say the number of the selected value',
        'say-a-number-between': 'Say a number between ',
        'and': 'and',
        'selected-value': 'Selected value',
        'html-example': 'Use the command "click" or "click range" over the following range input <p style="margin-top: 1em; margin-bottom: 0.2em;"><input type="range"/></p>'
      },
      es: {
        'name': 'Seleccionar Rango',
        'help.*': 'Indicar el valor deseado dentro del rango',
        'say-a-number-between': 'Menciona un número entre',
        'and': 'y',
        'selected-value': 'Valor seleccionado',
        'html-example': 'Usa el comando "click" o "click rango" sobre el siguiente campo de rango <p style="margin-top: 1em; margin-bottom: 0.2em;"><input type="range"/></p>'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Range Options',
      'description': 'After select a link it allows you to set a value between the specified minimum and maximum.'
    },
    es: {
      'name': 'Opciones de Rango',
      'description': 'Luego de seleccionar un rango habilita a seleccionar un valor entre el mínimo y el máximo especificado.'
    }
  }
};
