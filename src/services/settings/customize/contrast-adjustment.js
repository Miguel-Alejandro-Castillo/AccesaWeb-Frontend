import React from 'react';
import { getI18nText } from '../../../docs/i18n/i18n';
import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.contrast';
const valueDefaultSetting = 'sinContraste';
const options = [
  {
    label: getI18nText('unselected'),
    value: valueDefaultSetting
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

function Form({ valueContrast, onChangeContrast }) {
  return (
    <div className='form-group'>
      <div className='col-lg-3'>
        <label>{getI18nText('select-a-contrast')}</label><br/>
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
  return localStorage.getItem(propertySettingLocalStorage) ? localStorage.getItem(propertySettingLocalStorage) : valueDefaultSetting;
}
function ContrastFunction() {
  return (
    <Form valueContrast={valueContrast()} onChangeContrast={setContrast} />
  );
}

function action(valueSetting) {
  const id = 'link-contrast-accesa';
  const documentElementStyle = document.documentElement.style;

  let url = window.chrome.extension.getURL('contrast.css');
  if (valueSetting === 'blackWhite') {
    documentElementStyle.setProperty('--color', 'black');
    documentElementStyle.setProperty('--background', 'white');

  } else if (valueSetting === 'blackYellow') {
    documentElementStyle.setProperty('--color', 'black');
    documentElementStyle.setProperty('--background', 'yellow');

  } else if (valueSetting === 'yellowBlack') {
    documentElementStyle.setProperty('--color', 'yellow');
    documentElementStyle.setProperty('--background', 'black');

  } else if (valueSetting === 'whiteBlack') {
    documentElementStyle.setProperty('--color', 'white');
    documentElementStyle.setProperty('--background', 'black');

  } else {
    documentElementStyle.removeProperty('--color');
    documentElementStyle.removeProperty('--background');
    url = '';
  }

  if (url) {
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement('link');
      style.rel = 'stylesheet';
      style.id = id;
      style.type = 'text/css';
      (document.head || document.documentElement).appendChild(style);
    }
    style.href = url;
  } else {
    $('#' + id).prop('disabled', true);
    $('#' + id).remove();
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
  valueDefaultSetting: valueDefaultSetting,
  action: action
};