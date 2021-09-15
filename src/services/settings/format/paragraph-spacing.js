import React from 'react';
import { getI18nText } from '../../../docs/i18n/i18n';
import $ from 'jquery';
import _ from 'lodash';

const propertySettingLocalStorage = 'input.name.paragraphSpacing';
const  valueDefaultSetting = '';
const options = [
  {
    label: 'Ninguno',
    value: ''
  },
  {
    label: '2.0',
    value: '2em'
  },
  {
    label: '2.25',
    value: '2.25em'
  },
  {
    label: '2.5',
    value: '2.50em'
  }
];

function Form({valueSpacing, onChangeParagraphSpacing}) {
  return (
    <div className='form-group'>
      <div className='col-lg-3'>
        <label>{getI18nText('select-a-spacing')}</label><br/>
        <select className="form-control {'_not-focuseable-element'}" value={valueSpacing} onChange={e => onChangeParagraphSpacing(e.target.value)}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
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
  $('p').each(function() {
    const element = $(this);
    if ( _.isEmpty(element.data('defaultMarginBottom')) )
      element.data('defaultMarginBottom', element.css('margin-bottom'));
    element.css('margin-bottom', _.isEmpty(valueSetting) ? element.data('defaultMarginBottom') : valueSetting);
  });
}

function valueSpacing() {
  return _.isEmpty(localStorage.getItem(propertySettingLocalStorage)) ? valueDefaultSetting : localStorage.getItem(propertySettingLocalStorage);
}

function ChangeParagraphSpacingFunction() {
  return (
    <Form valueSpacing={valueSpacing()} onChangeParagraphSpacing={setParagraphSpacing}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-paragraph',
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
  valueDefaultSetting: valueDefaultSetting,
  action: action
};