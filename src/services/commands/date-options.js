import _ from 'lodash';
import { getNumber, getNumbersUntil } from './introduce-number.js';
import { isDate } from '../element_selectors';
import moment from 'moment';
import {
  optionsMap,
  setDay,
  setMonth,
  setYear,
  validateMonth,
  validateDay,
  validateYear
} from './datetime-options';

const reviewCommandActions = {
  month: {
    condition: validateMonth,
    action: _.wrap(setMonth, setDate)
  },
  day: {
    condition: validateDay,
    action: _.wrap(setDay, setDate)
  },
  year: {
    condition: validateYear,
    action: _.wrap(setYear, setDate)
  }
};

const options = _.keys(reviewCommandActions);

function setDate(setTime, state, number) {
  const newDate = setTime(state, number);
  state.selectedElement.value = newDate.format('YYYY-MM-DD');
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
  return isDate(state.selectedElement);
}

function getSelectedDate(state) {
  if (state.selectedElement.value) {
    return moment(state.selectedElement.value).toDate();
  }
  return new Date();
}

function setup(state) {
  const date = getSelectedDate(state);
  state.selectedElement.setAttribute('value', moment(date).format('YYYY-MM-DD'));
  return {
    options: options,
    selectedDate: date,
    selectedOption: 'month',
    expandedCommands: getNumbersUntil(31)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-calendar',
  contexts: [{
    context: 'dateOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup: setup,
    htmlExample: 'i18n-html-example',
    commands: [
      ...optionsMap(options),
      {
        name: '*',
        help: 'i18n-help',
        action: reviewCommand
      }
    ],
    i18n: {
      en: {
        'name': 'Date Picker',
        'help': 'Say the number of the selected label',
        'command.month': 'month',
        'command.day': 'day',
        'command.year': 'year',
        'help.month': 'Switches to month picker',
        'help.day': 'Switches to day picker',
        'help.year': 'Switches to year picker',
        'group.month': 'Switch tab',
        'group.day': 'Switch tab',
        'group.year': 'Switch tab',
        'html-example': 'Use the command "click" o "click date" over the following date input then you will be able to pick a date<br/><input type="date" />',
        'day': 'day',
        'month': 'month',
        'year': 'year',
        'say-year-number': 'Say the year number',
        'locale': 'en',
        'format': 'dddd, MMMM Do YYYY'
      },
      es: {
        'name': 'Seleccionar Fecha',
        'help': 'Indica el número de la opción deseada',
        'command.month': 'mes',
        'command.day': 'día',
        'command.year': 'año',
        'help.month': 'Seleccionar mes',
        'help.day': 'Seleccionar día',
        'help.year': 'Seleccionar año',
        'group.month': 'Cambiar pestaña',
        'group.day': 'Cambiar pestaña',
        'group.year': 'Cambiar pestaña',
        'html-example': 'Usa el comando "click" o "click fecha" sobre el siguiente campo para luego poder seleccionar la fecha deseada<br/><input type="date" />',
        'day': 'día',
        'month': 'mes',
        'year': 'año',
        'say-year-number': 'Indica el número de año',
        'locale': 'es',
        'format': 'dddd D [de] MMMM [del] YYYY'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Pick a date',
      'description': 'After click over date input it allows you select a date'
    },
    es: {
      'name': 'Seleccionar Fecha',
      'description': 'Al hacer click sobre un campo de fecha permite seleccionar una fecha específica'
    }
  }
};
