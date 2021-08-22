import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import $ from 'jquery';
const options = [
  {
    label: getI18nText('unselected'),
    value: 'sinContraste'
  },
  {
    label: getI18nText('blackWhite'),
    value: 'blackWhite'
  },
  {
    label: getI18nText('blackYellow'),
    value: 'blackYellow'
  }
];
const propertySettingLocalStorage = 'input.name.contrast';

function Form({ valueContrast, onChangeContrast }) {
  return (
    <div>
      <label>{getI18nText('select-a-contrast')}</label><br/>
      <select className={'_not-focuseable-element'} value={valueContrast} onChange={e => onChangeContrast(e.target.value)}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
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
  if (valueSetting === 'blackWhite') {
    //escala de grises
    //$('head').append("<link id='contrast-accesa' rel='stylesheet' href='contrast-black-white.css' type='text/css'>");
  } else if (valueSetting === 'blackYellow') {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.id = 'contrast-accesa';
    style.type = 'text/css';
    style.href = window.chrome.extension.getURL('contrast-black-white.css');
    (document.head || document.documentElement).appendChild(style);
  } else {
    $('#contrast-accesa').prop('disabled', true);
    $('#contrast-accesa').remove();
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