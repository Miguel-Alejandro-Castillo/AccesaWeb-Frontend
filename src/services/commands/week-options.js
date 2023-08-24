import _ from 'lodash';
import { getNumber, getNumbersUntil } from './introduce-number.js';
import { isWeek } from '../element_selectors';
import moment from 'moment';
import {
  optionsMap,
  setMonth,
  setYear,
  validateMonth,
  validateYear
} from './datetime-options';

const reviewCommandActions = {
  month: {
    condition: validateMonth,
    action: _.wrap(setMonth, setDate)
  },
  year: {
    condition: validateYear,
    action: _.wrap(setYear, setDate)
  },
  week: {
    condition: validateWeek,
    action: _.wrap(setWeek, setDate)
  }
};

const options = _.keys(reviewCommandActions);

function setDate(setTime, state, number) {
  const newDate = setTime(state, number);
  state.selectedElement.setAttribute('value', newDate.format('YYYY-[W]ww'));
  const date = newDate.toDate();
  return {
    selectedDate: date
  };
}

function validateWeek(state, number) {
  const firstDateInMonth = moment(state.selectedDate).date(1);
  const lastDateInMonth = moment(state.selectedDate).add('months', 1).date(0);
  return number >= firstDateInMonth.week() && number <= lastDateInMonth.week();
}

function setWeek(state, number) {
  return moment(state.selectedDate).week(number);
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
  return isWeek(state.selectedElement);
}

function getSelectedDate(state) {
  if (state.selectedElement.value) {
    return moment(state.selectedElement.value).toDate();
  }
  return new Date();
}

function setup(state) {
  const date = getSelectedDate(state);
  state.selectedElement.setAttribute('value', moment(date).format('YYYY-[W]ww'));
  return {
    options: options,
    selectedDate: date,
    selectedOption: 'month',
    expandedCommands: getNumbersUntil(60)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-calendar',
  contexts: [{
    context: 'weekOptions',
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
        'name': 'Week Picker',
        'help': 'Say the number of the selected label',
        'command.month': 'month',
        'command.week': 'week',
        'command.year': 'year',
        'help.month': 'Switches to month picker',
        'help.week': 'Switches to week picker',
        'help.year': 'Switches to year picker',
        'group.month': 'Switch tab',
        'group.week': 'Switch tab',
        'group.year': 'Switch tab',
        'html-example': 'Use the command "click" o "click date" over the following date input then you will be able to pick a week<br/><input type="week" />',
        'month': 'month',
        'week': 'week',
        'year': 'year',
        'say-year-number': 'Say the year number',
        'locale': 'en',
        'format': 'MMMM YYYY, [week] w'
      },
      es: {
        'name': 'Seleccionar Semana',
        'help': 'Indica el número de la opción deseada',
        'command.month': 'mes',
        'command.week': 'semana',
        'command.year': 'año',
        'help.month': 'Seleccionar mes',
        'help.week': 'Seleccionar semana',
        'help.year': 'Seleccionar año',
        'group.month': 'Cambiar pestaña',
        'group.week': 'Cambiar pestaña',
        'group.year': 'Cambiar pestaña',
        'html-example': 'Usa el comando "click" o "click fecha" sobre el siguiente campo para luego poder seleccionar la semana deseada<br/><input type="week" />',
        'month': 'mes',
        'week': 'semana',
        'year': 'año',
        'say-year-number': 'Indica el número de año',
        'locale': 'es',
        'format': 'MMMM YYYY, [semana] w'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Pick a week',
      'description': 'After click over date input it allows you select a week'
    },
    es: {
      'name': 'Seleccionar Semana',
      'description': 'Al hacer click sobre un campo de fecha permite seleccionar una semana específica'
    }
  }
};
