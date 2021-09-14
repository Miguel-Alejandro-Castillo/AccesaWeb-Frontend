import React from 'react';
import { getI18nText } from '../../../docs/i18n/i18n';
//import $ from 'jquery';
const options = [
  {
    label: getI18nText('unselected'),
    value: 'sinSeleccionar'
  },
  {
    label: getI18nText('arial'),
    value: 'arial'
  },
  {//letra para los dislexicos hay que ver como se incorpora o como se usa
    label: getI18nText('dyslexic'),
    value: 'dislexyc'
  }
];
const propertySettingLocalStorage = 'input.name.font';

function Form({ valueFont, onChangeFont }) {
  return (
    <div className='form-group'>
      <div className='col-lg-3'>
        <label>{getI18nText('select-a-font')}</label><br/>
        <select id='font-type' className="form-control {'_not-focuseable-element'}" value={valueFont} onChange={e => onChangeFont(e.target.value)}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

Form.propTypes = {
  onChangeFont: React.PropTypes.func.isRequired,
  valueFont: React.PropTypes.string.isRequired
};

function setFont(value) {
  localStorage.setItem(propertySettingLocalStorage, value);
  document.dispatchEvent(new Event('changeInput'));
}

function valueFont() {
  return localStorage.getItem(propertySettingLocalStorage) ? localStorage.getItem(propertySettingLocalStorage) : '';
}
function FontFunction() {
  return (
    <Form valueFont={valueFont()} onChangeFont={setFont} />
  );
}

function action(valueSetting) {
  if (valueSetting === 'arial') {
    //setea la letra
  } else {
  }
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-font',
  i18n: {
    en: {
      'name': 'Font',
      'description': 'Change font type.'
    },
    es: {
      'name': 'Fuente',
      'description': 'Cambia el tipo de letra.'
    }
  },
  contexts: [{ functionComponent: FontFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  'action': action
};