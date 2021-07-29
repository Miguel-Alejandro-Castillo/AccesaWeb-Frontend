import _ from 'lodash';
import $ from 'jquery';
import { exit } from './global';
import { getNumber, getNumbersUntil } from './introduce-number.js';
import { isSelect } from '../element_selectors';
import scroll from '../scroll.js';

const enHtmlExample = `
  Use the command "click" or "click select" over the following select
  <p style="margin-top: 1em; margin-bottom: 0.2em;">
    <select>
      <option value="1">Value A</option>
      <option value="2" selected="selected">Value B</option>
      <option value="3">Value C</option>
      <option value="4">Value D</option>
      <option value="5">Value E</option>
      <option value="6">Value F</option>
    </select>
  </p>`;

const esHtmlExample = `
  Utilizar el comando "click" o "click opciones" sobre el siguiente selector
  <p style="margin-top: 1em; margin-bottom: 0.2em;">
    <select>
      <option value="1">Valor A</option>
      <option value="2" selected="selected">Valor B</option>
      <option value="3">Valor C</option>
      <option value="4">Valor D</option>
      <option value="5">Valor E</option>
      <option value="6">Valor F</option>
    </select>
  </p>'`;

function getScrollContainer(state) {
  return $(state.rootElement.querySelector('.options-selector ul'));
}

function down(state) {
  scroll.down(getScrollContainer(state));
}

function up(state) {
  scroll.up(getScrollContainer(state));
}

function setOption(state, element) {
  const $el = $(state.selectedElement);
  const value = $(element).data('value');
  $el.find(`option[value='${value}']`).prop('selected', true);
  return exit(state);
}

function reviewCommand(state, command, background, allTheCommands) {
  const number = getNumber(allTheCommands);
  if (_.isInteger(number)) {
    const element = state.rootElement.querySelector(`[data-key="${number}"]`);
    if (element) {
      return setOption(state, element);
    }
  }
}

function getValues(el) {
  return _.map(el.querySelectorAll('option'), option => ({
    label: option.innerText,
    selected: option.selected,
    value: option.value
  }));
}

function handleSwitchOnSelectElement(state) {
  return isSelect(state.selectedElement);
}

function setup(state) {
  const values = getValues(state.selectedElement);
  return {
    selectedElementValues: values,
    expandedCommands: getNumbersUntil(values.length)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-list',
  contexts: [{
    context: 'selectOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup: setup,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: 'i18n-command.scroll-up',
      help: 'i18n-help.scroll-up',
      action: up
    }, {
      name: 'i18n-command.scroll-down',
      help: 'i18n-help.scroll-down',
      action: down
    }, {
      name: '*',
      help: 'i18n-help.*',
      action: reviewCommand
    }],
    i18n: {
      en: {
        'name': 'Select Value',
        'command.scroll-up': 'scroll up',
        'command.scroll-down': 'scroll down',
        'help.scroll-up': 'Scroll up the option list',
        'help.scroll-down': 'Scroll down the option list',
        'help.*': 'Say the number of the selected label',
        'select-an-option': 'Select an option',
        'scroll-up': 'Scroll Up',
        'scroll-down': 'Scroll Down',
        'html-example': enHtmlExample
      },
      es: {
        'name': 'Seleccionar Valor',
        'command.scroll-up': 'subir',
        'command.scroll-down': 'bajar',
        'help.scroll-up': 'Visualiza opciones de más arriba',
        'help.scroll-down': 'Visualiza las opciones de más abajo',
        'help.*': 'Selecciona el valor indicado',
        'select-an-option': 'Seleccionar una opción',
        'scroll-up': 'Subir',
        'scroll-down': 'Bajar',
        'html-example': esHtmlExample
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Pick an option',
      'description': 'After click over a select input it allows you to select a value.'
    },
    es: {
      'name': 'Elegir una opción',
      'description': 'Al hacer click sobre un campo de selección permite indicar el valor deseado.'
    }
  }
};
