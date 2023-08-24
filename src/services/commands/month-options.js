import _ from 'lodash';
import { getNumber, getNumbersUntil } from './introduce-number.js';
import { isMonth } from '../element_selectors';
import {
  optionsMap,
  setMonth,
  setYear,
  validateMonth,
  validateYear
} from './datetime-options';
import moment from 'moment';

const reviewCommandActions = {
  month: {
    condition: validateMonth,
    action: _.wrap(setMonth, setDate)
  },
  year: {
    condition: validateYear,
    action: _.wrap(setYear, setDate)
  }
};

const options = _.keys(reviewCommandActions);

function setDate(setTime, state, number) {
  const newDate = setTime(state, number);
  state.selectedElement.value = newDate.format('YYYY-MM');
  const date = newDate.toDate();
  return {
    selectedDate: date
  };
}

function reviewCommand(state, command, background, allTheCommands) {
  const number = getNumber(allTheCommands);
  const optionHandler = reviewCommandActions[state.selectedOption];
  if (_.isInteger(number) && optionHandler.condition(state, number)) {
    return {
      ...reviewCommandActions[state.selectedOption].action(state, number),
      commandWasExecuted: true
    };
  }
}

function handleSwitchOnSelectElement(state) {
  return isMonth(state.selectedElement);
}

function getSelectedDate(state) {
  if (state.selectedElement.value) {
    return moment(state.selectedElement.value).toDate();
  }
  return new Date();
}

function setup(state) {
  const date = getSelectedDate(state);
  state.selectedElement.setAttribute('value', moment(date).format('YYYY-MM'));
  return {
    options: options,
    selectedDate: date,
    selectedOption: 'month',
    expandedCommands: getNumbersUntil(12)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-calendar',
  contexts: [{
    context: 'monthOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup: setup,
    htmlExample: 'i18n-html-example',
    commands: [
      ...optionsMap(options),
      {
        name: '*',
        help: 'i18n-help.*',
        action: reviewCommand
      }
    ],
    i18n: {
      en: {
        name: 'Month Picker',
        'help.*': 'Say the number of the selected label',
        'command.month': 'month',
        'command.year': 'year',
        'help.month': 'Switches to month picker',
        'help.year': 'Switches to year picker',
        'group.month': 'Switch tab',
        'group.year': 'Switch tab',
        'html-example': 'Use the command "click" o "click date" over the following date input then you will be able to pick a month of a given year<br/><input type="month" />',
        'month': 'month',
        'year': 'year',
        'say-year-number': 'Say the year number',
        'locale': 'en',
        'format': 'MMMM YYYY'
      },
      es: {
        name: 'Seleccionar mes',
        'help.*': 'Seleccionar número de la opción seleccionada',
        'command.month': 'mes',
        'command.year': 'año',
        'help.month': 'Seleccionar mes',
        'help.year': 'Seleccionar año',
        'group.month': 'Cambiar pestaña',
        'group.year': 'Cambiar pestaña',
        'html-example': 'Usa el comando "click" o "click fecha" sobre el siguiente campo para luego poder seleccionar un mes de un determinado año<br/><input type="month" />',
        'month': 'mes',
        'year': 'año',
        'say-year-number': 'Indica el número de año',
        'locale': 'es',
        'format': 'MMMM [del] YYYY'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Pick a month',
      'description': 'After click over a date input it allows you to select a month of an year'
    },
    es: {
      'name': 'Seleccionar Mes',
      'description': 'Al hacer click sobre un campo de fecha permite seleccionar un mes de un determinado año'
    }
  }
};
