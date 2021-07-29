import _ from 'lodash';
import { getNumber, getNumbersUntil } from './introduce-number';
import { isTime } from '../element_selectors';
import {
  optionsMap,
  setHour,
  setMinutes,
  validateHour,
  validateMinutes
} from './datetime-options';

import moment from 'moment';

const reviewCommandActions = {
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

function setDate(setTime, state, number) {
  const newDate = setTime(state, number);
  state.selectedElement.value = newDate.format('HH:mm');
  const date = newDate.toDate();
  return {
    formatedDate: getFormatedDate(date),
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
  return isTime(state.selectedElement);
}

function getSelectedDate(state) {
  const currentDate = moment().format('YYYY-MM-DD');
  const currentValue = state.selectedElement.value;
  return moment(`${currentDate} ${currentValue}`).toDate();
}

function getFormatedDate(date) {
  return moment(date).format('h:mm a');
}

function setup(state) {
  const date = getSelectedDate(state);
  state.selectedElement.setAttribute('value', moment(date).format('HH:mm'));
  return {
    options: options,
    selectedDate: date,
    selectedOption: 'hour',
    expandedCommands: getNumbersUntil(60)
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-clock-o',
  contexts: [{
    context: 'timeOptions',
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
        'name': 'Time Picker',
        'help': 'Say the number of the selected label',
        'command.hour': 'hour',
        'command.minutes': 'minutes',
        'help.hour': 'Switches to hour picker',
        'help.minutes': 'Switches to minutes picker',
        'group.hour': 'Switch tab',
        'group.minutes': 'Switch tab',
        'html-example': 'Use the command "click" o "click date" over the following time input then you will be able to pick a time<br/><input type="time" />',
        'hour': 'hour',
        'minutes': 'minutes',
        'say-minute-number': 'Say the minute number. (0 to 59)',
        'say-hour-number': 'Say the hour number. (0 to 23)',
        'locale': 'en',
        'format': 'h:mm a'
      },
      es: {
        'name': 'Seleccionar Tiempo',
        'help': 'Indica el número de la opción deseada',
        'command.hour': 'hora',
        'command.minutes': 'minutos',
        'help.hour': 'Seleccionar hora',
        'help.minutes': 'Seleccionar minutos',
        'group.hour': 'Cambiar pestaña',
        'group.minutes': 'Cambiar pestaña',
        'html-example': 'Usar el comando "click" o "click fecha" sobre el siguiente campo de fecha luego podrás seleccionar un horario<br/><input type="time" />',
        'hour': 'hora',
        'minutes': 'minutos',
        'say-minute-number': 'Indica el número de minuto. (0 a 59)',
        'say-hour-number': 'Indica el número de hora. (0 a 23)',
        'locale': 'es',
        'format': 'h:mm a'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Pick a time',
      'description': 'After click over date input its allow you to select a time'
    },
    es: {
      'name': 'Seleccionar un Horario',
      'description': 'Al hacer click sobre un campo de fecha permite seleccionar un horario'
    }
  }
};
