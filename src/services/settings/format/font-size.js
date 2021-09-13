import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

const propertySettingLocalStorage = 'input.name.resizeText';

function Form({valueResizeText, onChangeResizeText}) {
  return (
    <p className='box'>
      <input type='range' width='50' min='0.5' max='1.5' step='0.1' className='_not-focuseable-element' value={valueResizeText} onChange={e => onChangeResizeText(e.target.value)}/>
      {(parseFloat(valueResizeText) * 100) + '%'}
    </p>
  );
}


Form.propTypes = {
  onChangeResizeText: React.PropTypes.func.isRequired,
  valueResizeText: React.PropTypes.string.isRequired
};

function setResizeText(value) {
  localStorage.setItem(propertySettingLocalStorage, value);
  document.dispatchEvent(new Event('changeInput'));
}

function valueResizeText() {
  return localStorage.getItem(propertySettingLocalStorage) ? localStorage.getItem(propertySettingLocalStorage) : '1.0';
}

function ResizeTextFunction() {
  return (
    <Form valueResizeText={valueResizeText()} onChangeResizeText={setResizeText} />
  );
}

//Habria que hacerlo mas performante
function action(valueSetting) {
  $('*').each(function() {
    const element = $(this);
    const fontSizePx = element.css('font-size');
    if (_.isEmpty(element.data('defaultFontSize')))
      element.data('defaultFontSize', fontSizePx);// Guardar el font size por default
    if (!_.isEmpty(fontSizePx) && !_.isEmpty(valueSetting)) {
      const fontSize = parseFloat(element.data('defaultFontSize')) * parseFloat(valueSetting);
      element.css('font-size', fontSize + 'px');
    }
  });
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-font',
  i18n: {
    en: {
      'name': 'Font size',
      'description': 'Change font size'
    },
    es: {
      'name': 'Tamaño de fuente',
      'description': 'Cambia el tamaño de fuente'
    }
  },
  contexts: [{ functionComponent: ResizeTextFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  action: action
};