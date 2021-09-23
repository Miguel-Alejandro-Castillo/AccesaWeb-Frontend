import React from 'react';
import { getI18nText } from '../../../docs/i18n/i18n';
import $ from 'jquery';
import _ from 'lodash';

const propertySettingLocalStorage = 'input.name.hideImages';
const  valueDefaultSetting = 'true';

function Form({isHideImages, onChangeHideImages}) {
  return (
    <div>
      <div className='radio'>
        <label>
          <input type='radio' checked={isHideImages} onChange={() => onChangeHideImages(true)}/> <span>{getI18nText('show')}</span>
        </label>
      </div>
      <div className='radio'>
        <label>
          <input type='radio' checked={!isHideImages} onChange={() => onChangeHideImages(false)}/> <span>{getI18nText('hide')}</span>
        </label>
      </div>
    </div>
  );
}

Form.propTypes = {
  isHideImages: React.PropTypes.bool.isRequired,
  onChangeHideImages: React.PropTypes.func.isRequired
};


function isHideImages() {
  return localStorage.getItem(propertySettingLocalStorage) === 'false' ? false : true;
}

function setHideImages(value) {
  if (isHideImages() !== value) {
    localStorage.setItem(propertySettingLocalStorage, value);
    document.dispatchEvent(new Event('changeInput'));
  }
}

function showHideElement(el, valueSetting) {
  if (el[0].nodeName === 'IMG') {
    if (_.isEmpty(el.data('defaultDisplay')))
      el.data('defaultDisplay', el.css('display'));  //Guardar el Display por default
    if (_.isEmpty(el.data('defaultVisibility')))
      el.data('defaultVisibility', el.css('visibility'));  //Guardar el Visibility por default
    if (valueSetting === 'false')
      el.css({ 'display': 'none', 'visibility': 'hidden' });
    else
      el.css({ 'display': el.data('defaultDisplay'), 'visibility': el.data('defaultVisibility')});
  } else {
    if (_.isEmpty(el.data('defaultBackgroundImage')))
      el.data('defaultBackgroundImage', el.css('background-image'));
    if (valueSetting === 'false')
      el.css('background-image', 'none');
    else
      el.css('background-image', el.data('defaultBackgroundImage'));
  }
}

function action(valueSetting) {
  $('*').filter( function() {
    const el = $(this);
    return el[0].nodeName === 'IMG' || el.css('background-image');
  }).each(function() {
    const el = $(this);
    showHideElement(el, valueSetting);
  });
}

function ShowHideImageFunction() {
  return (
    <Form isHideImages={isHideImages()} onChangeHideImages={setHideImages}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-image',
  i18n: {
    en: {
      'name': 'Images',
      'description': 'Show/hide images'
    },
    es: {
      'name': 'Imagenes',
      'description': 'Mostrar/ocultar imagenes'
    }
  },
  contexts: [{ functionComponent: ShowHideImageFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  valueDefaultSetting: valueDefaultSetting,
  action: action
};