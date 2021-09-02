import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import $ from 'jquery';
import _ from 'lodash';

const propertySettingLocalStorage = 'input.name.lineSpacing';
const options = [
  {
    label: 'Ninguno',
    value: ''
  },
  {
    label: '1,5',
    value: '1.5em'
  },
  {
    label: '1,75',
    value: '1.75em'
  },
  {
    label: '2,0',
    value: '2em'
  }
];

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
  $('body,p,span,div,main,article,section,header,footer,aside,nav,h1,h2,h3,h4,h5,h6').each(function() {
    const element = $(this);
    if ( _.isEmpty(element.data('defaultLineHeight')) )
      element.data('defaultLineHeight', element.css('line-height'));
    element.css('line-height', _.isEmpty(valueSetting) ? element.data('defaultLineHeight') : valueSetting);
  });
}
function valueSpacing() {
  return !_.isEmpty(localStorage.getItem(propertySettingLocalStorage)) ? localStorage.getItem(propertySettingLocalStorage) : '';
}

function ChangeLineSpacingFunction() {
  return (
    <Form valueSpacing={valueSpacing()} onChangeLineSpacing={setLineSpacing}/>
  );
}

const lineSpacingSetting = {
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
  action: action
};
export default lineSpacingSetting;