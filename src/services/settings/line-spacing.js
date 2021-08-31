import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
//import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.lineSpacing';
const options = [
  {
    label: getI18nText('unselected'),
    value: 'sinSeleccionar'
  },
  {
    label: getI18nText(''),
    value: ''
  }];

function Form({valueSpacing, onChangeLineSpacing}) {
  return (
    <div>
      <label>{getI18nText('select-a-spacing')}</label><br/>
      <select className={'_not-focuseable-element'} value={valueSpacing} onChange={e => onChangeLineSpacing(e.target.value)}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

Form.propTypes = {
  onChangeLineSpacing: React.PropTypes.func.isRequired,
  valueSpacing: React.PropTypes.string.isRequired
};


function setLineSpacing(value) {
  localStorage.setItem(propertySettingLocalStorage, value);
  document.dispatchEvent(new Event('changeInput'));
}

function action(valueSetting) {
  //agrega y setea el tamaño de las lineas
  console.log(valueSetting);
}
function valueSpacing() {
  return localStorage.getItem(propertySettingLocalStorage) ? localStorage.getItem(propertySettingLocalStorage) : '';
}

function ChangeLineSpacingFunction() {
  return (
    <Form valueSpacing={valueSpacing()} onChangeLineSpacing={setLineSpacing}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-line-height',
  i18n: {
    en: {
      'name': 'Line spacing',
      'description': 'Add line spacing'
    },
    es: {
      'name': 'Espaciado',
      'description': 'Agregar espaciado entre renglones'
    }
  },
  contexts: [{ functionComponent: ChangeLineSpacingFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  'action': action
};