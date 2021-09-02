import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
//import $ from 'jquery';
const options = [
  {
    label: getI18nText('unselected'),
    value: 'unselected'
  },
  {
    label: getI18nText('up'),
    value: 'up'
  },
  {
    label: getI18nText('down'),
    value: 'down'
  },
  {
    label: getI18nText('right'),
    value: 'right'
  },
  {
    label: getI18nText('left'),
    value: 'left'
  }
];
const propertySettingLocalStorage = 'input.name.menuOrientation';

function Form({ valueMenuOrientation, onChangeMenuOrientation }) {
  return (
    <div className='form-group'>
      <label id='select-orientation' >{getI18nText('select-a-orientation')}</label><br/>
      <div className='col-lg-2'>
        <select className="form-control {'_not-focuseable-element'}" id='select-orientation' value={valueMenuOrientation} onChange={e => onChangeMenuOrientation(e.target.value)}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

Form.propTypes = {
  onChangeMenuOrientation: React.PropTypes.func.isRequired,
  valueMenuOrientation: React.PropTypes.string.isRequired
};

function setMenuOrientation(value) {
  localStorage.setItem(propertySettingLocalStorage, value);
  document.dispatchEvent(new Event('changeInput'));
}

function valueMenuOrientation() {
  return localStorage.getItem(propertySettingLocalStorage) ? localStorage.getItem(propertySettingLocalStorage) : '';
}
function ChangeMenuOrientationFunction() {
  return (
    <Form valueMenuOrientation={valueMenuOrientation()} onChangeMenuOrientation={setMenuOrientation} />
  );
}

function action(valueSetting) {
  /*if (valueSetting === 'up') {
  } else {
    if (valueSetting === 'down') {

    } else {
      if (valueSetting === 'right') {

      } else {
        if (valueSetting === 'left')
          console.log('left');
      }
    }
  }*/
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-bars',
  i18n: {
    en: {
      'name': 'Change the menu orientation',
      'description': 'Change the location of the main menu of the pages visited.'
    },
    es: {
      'name': 'Cambiar la orientacion del menu',
      'description': 'Cambia la orientacion del menu en las paginas visitadas.'
    }
  },
  contexts: [{ functionComponent: ChangeMenuOrientationFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  'action': action
};