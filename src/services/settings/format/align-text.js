import React from 'react';
import { getI18nText } from '../../../docs/i18n/i18n';
import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.alignText';
const valueDefaultSetting = 'left';

function Form({onClickAlignText}) {
  return (
  <div className='btn-group' role='group' aria-label='opciones de alineado'>
    <button className='btn btn-default' onClick={() => onClickAlignText('none')}>{getI18nText('none')}</button>
    <button className='btn btn-default' onClick={() => onClickAlignText('left')}><i className='fa fa-align-left'/>{getI18nText('left')}</button>
    <button className='btn btn-default' onClick={() => onClickAlignText('center')}><i className='fa fa-align-center'/>{getI18nText('center')}</button>
    <button className='btn btn-default' onClick={() => onClickAlignText('justify')}><i className='fa fa-align-justify'/>{getI18nText('justify')}</button>
    <button className='btn btn-default' onClick={() => onClickAlignText('right')}><i className='fa fa-align-right'/>{getI18nText('right')}</button>
  </div>
  );
}

Form.propTypes = {
  onClickAlignText: React.PropTypes.func.isRequired
};

function setAlignText(value) {
  if ( localStorage.getItem(propertySettingLocalStorage) !== value ) {
    localStorage.setItem(propertySettingLocalStorage, value);
    document.dispatchEvent(new Event('changeInput'));
  }
}

function action(valueSetting) {
  const elements = $('*');
  elements.removeClass('text-align-aw');
  if ( valueSetting !== 'none' ) {
    document.documentElement.style.setProperty('--textAlign', valueSetting);
    elements.addClass('text-align-aw');
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
  icon: 'fa fa-align-left',
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
  valueDefaultSetting: valueDefaultSetting,
  action: action
};