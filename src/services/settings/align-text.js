import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
//import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.alignText';

function Form({onClickAlignText}) {
  return (
  <div className='btn-group' role='group' aria-label='opciones de alineado'>
    <button className='btn btn-default' onClick={() => onClickAlignText('left')}><i className='fa fa-align-left'></i> {getI18nText('left')}</button>
    <button className='btn btn-default' onClick={() => onClickAlignText('center')}><i className='fa fa-align-center'></i> {getI18nText('center')}</button>
    <button className='btn btn-default' onClick={() => onClickAlignText('justify')}><i className='fa fa-align-justify'></i> {getI18nText('justify')}</button>
    <button className='btn btn-default' onClick={() => onClickAlignText('right')}><i className='fa fa-align-right'></i> {getI18nText('right')}</button>
  </div>
  );
}

Form.propTypes = {
  onClickAlignText: React.PropTypes.func.isRequired
};


function setAlignText(value) {
  localStorage.setItem(propertySettingLocalStorage, value);
  document.dispatchEvent(new Event('changeInput'));
}

function action(valueSetting) {
  if (valueSetting === 'left') {
   //alineado a la izquierda
  } else {
    //if para alinedos: centrado, derecha y justificado.
  }
}

function ChangeAlignFunction() {
  return (
    <Form onClickAlignText={setAlignText}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-bars',
  i18n: {
    en: {
      'name': 'Align text',
      'description': 'Align text'
    },
    es: {
      'name': 'Alineacion',
      'description': 'Alinear el texto de las paginas visitadas'
    }
  },
  contexts: [{ functionComponent: ChangeAlignFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  action: action
};