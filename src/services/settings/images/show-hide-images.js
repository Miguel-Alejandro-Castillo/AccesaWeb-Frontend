import React from 'react';
import { getI18nText } from '../../../docs/i18n/i18n';
import $ from 'jquery';

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

function action(valueSetting) {
  var imgs = $('img');
  var elems = $('*').filter(function() {
    var el = $(this);
    return el.css('background-image');
  });
  var imgsIframe = $('iframe').contents().find('img');
  var elemsIframe = $('iframe').contents().find('*');
  if (valueSetting === 'false') {
    imgs.addClass('hide-element-aw');
    elems.addClass('remove-background-image-aw');
    imgsIframe.addClass('hide-element-aw');
    elemsIframe.addClass('remove-background-image-aw');
  } else {
    imgs.removeClass('hide-element-aw');
    elems.removeClass('remove-background-image-aw');
    imgsIframe.removeClass('hide-element-aw');
    elemsIframe.removeClass('remove-background-image-aw');
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
  valueDefaultSetting: valueDefaultSetting,
  action: action
};