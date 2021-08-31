import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
//import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.paragraphSpacing';
const options = [
  {
    label: getI18nText('unselected'),
    value: 'sinSeleccionar'
  },
  {
    label: getI18nText(''),
    value: ''
  }
];
function Form({valueSpacing, onChangeParagraphSpacing}) {
  return (
    <div>
      <label>{getI18nText('select-a-spacing')}</label><br/>
      <select className={'_not-focuseable-element'} value={valueSpacing} onChange={e => onChangeParagraphSpacing(e.target.value)}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

Form.propTypes = {
  onChangeParagraphSpacing: React.PropTypes.func.isRequired,
  valueSpacing: React.PropTypes.string.isRequired
};


function setParagraphSpacing(value) {
  localStorage.setItem(propertySettingLocalStorage, value);
  document.dispatchEvent(new Event('changeInput'));
}

function action(valueSetting) {
  //agrega y setea el tamaño del espaciado
  console.log(valueSetting);
}

function valueSpacing() {
  return localStorage.getItem(propertySettingLocalStorage) ? localStorage.getItem(propertySettingLocalStorage) : '';
}

function ChangeParagraphSpacingFunction() {
  return (
    <Form valueSpacing={valueSpacing()} onChangeParagraphSpacing={setParagraphSpacing}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-line-height',
  i18n: {
    en: {
      'name': 'Paragraph spacing',
      'description': 'Add paragragraph spacing'
    },
    es: {
      'name': 'Espaciado entre parrafos',
      'description': 'Agregar espaciado entre parrafos'
    }
  },
  contexts: [{ functionComponent: ChangeParagraphSpacingFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  'action': action
};