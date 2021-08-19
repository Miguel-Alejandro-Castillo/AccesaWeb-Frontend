import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.hideImages';

function Form({isHideImages, onChangeHideImages}) {
  return (
    <div>
      <div className='radio'>
        <label>
          <input type='radio' checked={isHideImages} onChange={() => onChangeHideImages(true)}/> <span>{getI18nText('show-image')}</span>
        </label>
      </div>
      <div className='radio'>
        <label>
          <input type='radio' checked={!isHideImages} onChange={() => onChangeHideImages(false)}/> <span>{getI18nText('hide-image')}</span>
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

function action(valueSetting) {
  if (valueSetting === 'false') {
    $('img').css({ 'display': 'none', 'visibility': 'hidden' });
  } else {
    $('img').css({ 'display': 'block', 'visibility': 'visible' });
  }
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
  'action': action
};