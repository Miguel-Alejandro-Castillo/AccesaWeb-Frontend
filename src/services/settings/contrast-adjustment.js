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
      <label>{getI18nText('select-a-contrast')}</label><br />
      <select value={valueContrast} onChange={e => onChangeContrast(e.target.value)}>
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
  localStorage.setItem('input.name.contrast', value);
  document.dispatchEvent(new Event('changeInput'));
}

function valueContrast() {
  return localStorage.getItem('input.name.contrast') ? localStorage.getItem('input.name.contrast') : '';
}
function ContrastFunction() {
  return (
    <Form valueContrast={valueContrast()} onChangeContrast={setContrast} />
  );
}

function action(valueSetting) {
  if (valueSetting === 'blackWhite') {
    //escala de grises
    $('#div').each(function (){
      $(this).css('background-color', 'white');
      $(this).css('color', 'black');
    });
  } else{
    if (valueSetting === 'blackYellow'){
      $('#div').each(function (){
        $(this).css('background-color', 'white');
        $(this).css('color', 'black');
      });
    }
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