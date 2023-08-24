import _ from 'lodash';
import { getNumber, getNumbersUntil } from './introduce-number';
import { getVisibleElements } from '../element_selectors';

function pickPointedElement(number, state, background) {
  const element = getVisibleElements(state.labels)[number - 1];
  if (element) {
    return {
      ...state.selectedElementHandler(element.el, state, background.lang),
      commandWasExecuted: true
    };
  }
}

function reviewCommand(state, command, background, allTheCommands) {
  const number = getNumber(allTheCommands);
  if (_.isInteger(number)) {
    return pickPointedElement(number, state, background);
  }
}

function teardown(state) {
  return state;
}

function setup(state) {
  return {
    ...state,
    expandedCommands: getNumbersUntil(getVisibleElements(state.labels).length)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-tag',
  contexts: [{
    context: 'pickLabel',
    name: 'i18n-name',
    setup: setup,
    teardown: teardown,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      group: 'i18n-group',
      action: reviewCommand
    }],
    i18n: {
      en: {
        'name': 'Element Picker',
        'help.*': 'Say the number of the selected label',
        'group': 'Pick a number',
        'html-example': 'Use the command "click" over the following two buttons <p style="margin-top: 1em; margin-bottom: 0.2em;"><button>Button A</button> <button>Button B</button></p>',
        'label-options': 'Say the number of the selected label',
        'exit': 'Exit'
      },
      es: {
        'name': 'Seleccionar',
        'help.*': 'Indicar el nombre de la etiqueta seleccionada',
        'group': 'Seleccionar un número',
        'html-example': 'Usa el comando "click" sobre los siguientes botones <p style="margin-top: 1em; margin-bottom: 0.2em;"><button>Botón A</button> <button>Botón B</button></p>',
        'label-options': 'Indicar el nombre de la etiqueta seleccionada',
        'exit': 'Salir'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Pick Label',
      'description': 'This module is useful to pick the label of some element after use the commands "click" or "select" and there is more than one option to choose.'
    },
    es: {
      'name': 'Seleccionar Etiqueta',
      'description': 'Este módulo es útil para elegir un elemento luego de ejecutar los comandos "click" o "seleccionar" y existe más de un objeto para elegir.'
    }
  }
};
