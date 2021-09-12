import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import $ from 'jquery';
const options = [
  {
    label: getI18nText('unselected'),
    value: 'sinContraste'
  },
  {
    label: getI18nText('whiteBlack'),
    value: 'whiteBlack'
  },
  {
    label: getI18nText('blackWhite'),
    value: 'blackWhite'
  },
  {
    label: getI18nText('yellowBlack'),
    value: 'yellowBlack'
  },
  {
    label: getI18nText('blackYellow'),
    value: 'blackYellow'
  }
];
const propertySettingLocalStorage = 'input.name.contrast';

function Form({ valueContrast, onChangeContrast }) {
  return (
    <div className='form-group'>
      <label>{getI18nText('select-a-contrast')}</label><br/>
      <div className='col-lg-3'>
        <select id='contrast' className="form-control {'_not-focuseable-element'}" value={valueContrast} onChange={e => onChangeContrast(e.target.value)}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

Form.propTypes = {
  onChangeContrast: React.PropTypes.func.isRequired,
  valueContrast: React.PropTypes.string.isRequired
};

function setContrast(value) {
  localStorage.setItem(propertySettingLocalStorage, value);
  document.dispatchEvent(new Event('changeInput'));
}

function valueContrast() {
  return localStorage.getItem(propertySettingLocalStorage) ? localStorage.getItem(propertySettingLocalStorage) : '';
}
function ContrastFunction() {
  return (
    <Form valueContrast={valueContrast()} onChangeContrast={setContrast} />
  );
}

function action(valueSetting) {
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.id = 'contrast-accesa';
  style.type = 'text/css';
  if (valueSetting === 'blackWhite') {
    style.href = window.chrome.extension.getURL('contrast-black-white.css');
  } else if (valueSetting === 'blackYellow') {
    style.href = window.chrome.extension.getURL('contrast-black-yellow.css');
  } else if (valueSetting === 'yellowBlack') {
    style.href = window.chrome.extension.getURL('contrast-yellow-black.css');
  } else if (valueSetting === 'whiteBlack') {
    style.href = window.chrome.extension.getURL('contrast-white-black.css');
  } else {
    $('#contrast-accesa').prop('disabled', true);
    $('#contrast-accesa').remove();
  }
  if (valueSetting !== 'unselected') {
    (document.head || document.documentElement).appendChild(style);
  }
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-adjust',
  i18n: {
    en: {
      'name': 'Contrast',
      'description': 'Change contrast'
    },
    es: {
      'name': 'Contraste',
      'description': 'Cambia el contraste'
    }
  },
  contexts: [{ functionComponent: ContrastFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  'action': action
};