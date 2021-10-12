import React from 'react';
import { getI18nText } from '../../../docs/i18n/i18n';
import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.font';
const valueDefaultSetting = '*';

const options = [
  {
    label: getI18nText('unselected'),
    value: valueDefaultSetting
  },
  {
    label: getI18nText('arial'),
    value: 'Arial'
  },
  {//letra para los dislexicos hay que ver como se incorpora o como se usa
    label: getI18nText('dyslexic'),
    value: 'opendyslexic'
  }
];

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
  return localStorage.getItem(propertySettingLocalStorage) ? localStorage.getItem(propertySettingLocalStorage) : valueDefaultSetting;
}
function FontFunction() {
  return (
    <Form valueFont={valueFont()} onChangeFont={setFont} />
  );
}

function action(valueSetting) {
  const elements = $('*').not('[class*="fa fa-"]');
  elements.removeClass('font-aw');
  if ( valueSetting !== '*' ) {
    document.documentElement.style.setProperty('--fontType', valueSetting);
    elements.addClass('font-aw');
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
  valueDefaultSetting: valueDefaultSetting,
  action: action
};