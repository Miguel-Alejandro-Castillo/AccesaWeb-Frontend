import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
//import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.alignText';

function Form({onClickAlignText}) {
  return (
    <div>
      <button onClick={onClickAlignText()}><i className='fa fa-align-left'>{getI18nText('left')}</i></button>
      <button onClick={onClickAlignText()}><i className='fa fa-align-center'>{getI18nText('center')}</i></button>
      <button onClick={onClickAlignText()}><i className='fa fa-align-justify'>{getI18nText('justify')}</i></button>
      <button onClick={onClickAlignText()}><i className='fa fa-align-right'>{getI18nText('right')}</i></button>
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
  'action': action
};