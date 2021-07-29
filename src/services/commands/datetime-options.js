import _ from 'lodash';
import { getNumber, getNumbersUntil } from './introduce-number.js';
import { isDatetime } from '../element_selectors';
import moment from 'moment';

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
  },
  hour: {
    condition: validateHour,
    action: _.wrap(setHour, setDate)
  },
  minutes: {
    condition: validateMinutes,
    action: _.wrap(setMinutes, setDate)
  }
};

const options = _.keys(reviewCommandActions);

export function optionsMap(options) {
  return options.map(option => ({
    help: `i18n-help.${option}`,
    group: `i18n-group.${option}`,
    name: `i18n-command.${option}`,
    action: () => ({
      selectedOption: option
    })
  }));
}

export function validateMonth(state, number) {
  return number > 0 && number <= 12;
}

export function validateDay(state, number) {
  const daysInMonth = moment(state.selectedDate).daysInMonth();
  return number >= 1 && number <= daysInMonth;
}

export function validateHour(state, number) {
  return number >= 1 && number <= 60;
}

export function validateMinutes(state, number) {
  return number >= 1 && number <= 60;
}

export function validateYear() {
  return true;
}

function setDate(setTime, state, number) {
  const newDate = setTime(state, number);
  state.selectedElement.value = newDate.format('YYYY-MM-DD[T]HH:mm');
  const date = newDate.toDate();
  return {
    selectedDate: date
  };
}

export function setMonth(state, number) {
  return moment(state.selectedDate).month(number - 1);
}

export function setDay(state, number) {
  return moment(state.selectedDate).date(number);
}

export function setYear(state, number) {
  return moment(state.selectedDate).year(number);
}

export function setHour(state, number) {
  return moment(state.selectedDate).hour(number);
}

export function setMinutes(state, number) {
  return moment(state.selectedDate).minutes(number);
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
  return isDatetime(state.selectedElement);
}

function getSelectedDate(state) {
  if (state.selectedElement.value) {
    return moment(state.selectedElement.value).toDate();
  }
  return new Date();
}

function setup(state) {
  const date = getSelectedDate(state);
  state.selectedElement.setAttribute('value', moment(date).format('YYYY-MM-DD[T]HH:mm'));
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
    context: 'datetimeOptions',
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
        'name': 'Datetime Picker',
        'help': 'Say the number of the selected label',
        'command.month': 'month',
        'command.day': 'day',
        'command.year': 'year',
        'command.hour': 'hour',
        'command.minutes': 'minutes',
        'help.month': 'Switches to month picker',
        'help.day': 'Switches to day picker',
        'help.year': 'Switches to year picker',
        'help.hour': 'Switches to hour picker',
        'help.minutes': 'Switches to minutes picker',
        'group.month': 'Switch tab',
        'group.day': 'Switch tab',
        'group.year': 'Switch tab',
        'group.hour': 'Switch tab',
        'group.minutes': 'Switch tab',
        'html-example': 'Use the command "click" o "click date" over the following datetime input then you will be able to pick a date and a time<br/><input type="datetime-local" />',
        'day': 'day',
        'month': 'month',
        'year': 'year',
        'hour': 'hour',
        'minutes': 'minutes',
        'say-year-number': 'Say the year number',
        'say-second-number': 'Say the second number. (0 to 59)',
        'say-minute-number': 'Say the minute number. (0 to 59)',
        'say-hour-number': 'Say the hour number. (0 to 23)',
        'locale': 'en',
        'format': 'dddd, MMMM Do YYYY, h:mm:ss a'
      },
      es: {
        'name': 'Seleccionar Fecha',
        'help': 'Indica el número de la opción deseada',
        'command.month': 'mes',
        'command.day': 'día',
        'command.year': 'año',
        'command.hour': 'hora',
        'command.minutes': 'minutos',
        'help.month': 'Seleccionar mes',
        'help.day': 'Seleccionar día',
        'help.year': 'Seleccionar año',
        'help.hour': 'Seleccionar hora',
        'help.minutes': 'Seleccionar minutos',
        'group.month': 'Cambiar pestaña',
        'group.day': 'Cambiar pestaña',
        'group.year': 'Cambiar pestaña',
        'group.hour': 'Cambiar pestaña',
        'group.minutes': 'Cambiar pestaña',
        'html-example': 'Usar el comando "click" o "click fecha" sobre el siguiente campo de fecha luego podrás seleccionar una fecha y un horario<br/><input type="datetime-local" />',
        'day': 'día',
        'month': 'mes',
        'year': 'año',
        'hour': 'hora',
        'minutes': 'minutos',
        'say-year-number': 'Indica el número de año',
        'say-second-number': 'Indica el número de segundo. (0 a 59)',
        'say-minute-number': 'Indica el número de minuto. (0 a 59)',
        'say-hour-number': 'Indica el número de hora. (0 a 23)',
        'locale': 'es',
        'format': 'dddd D [de] MMMM [del] YYYY [a las] h:mm:ss a'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Pick a date and a time',
      'description': 'After click over date input its allow you select a date and a time'
    },
    es: {
      'name': 'Seleccionar Fecha y Hora',
      'description': 'Al hacer click sobre un campo de fecha permite seleccionar una fecha y un horario'
    }
  }
};
