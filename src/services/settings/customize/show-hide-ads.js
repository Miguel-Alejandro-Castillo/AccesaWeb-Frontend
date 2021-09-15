import React from 'react';
import { getI18nText } from '../../../docs/i18n/i18n';
import $ from 'jquery';
import _ from 'lodash';

const propertySettingLocalStorage = 'input.name.hideAds';
const valueDefaultSetting = 'true';

function Form({isHideAds, onChangeHideAds}) {
  return (
    <div>
      <div className='radio'>
        <label>
          <input type='radio' checked={isHideAds} onChange={() => onChangeHideAds(true)}/> <span>{getI18nText('show')}</span>
        </label>
      </div>
      <div className='radio'>
        <label>
          <input type='radio' checked={!isHideAds} onChange={() => onChangeHideAds(false)}/> <span>{getI18nText('hide')}</span>
        </label>
      </div>
    </div>
  );
}

Form.propTypes = {
  isHideAds: React.PropTypes.bool.isRequired,
  onChangeHideAds: React.PropTypes.func.isRequired
};


function isHideAds() {
  return localStorage.getItem(propertySettingLocalStorage) === 'false' ? false : true;
}

function setHideAds(value) {
  if (isHideAds() !== value) {
    localStorage.setItem(propertySettingLocalStorage, value);
    document.dispatchEvent(new Event('changeInput'));
  }
}

function action(valueSetting) {
  /* solo oculta publicidades de google */
  $("ins[class='adsbygoogle']").each(function() {
    const elem = $(this);
    if (_.isEmpty(elem.data('defaultDisplay')))
      elem.data('defaultDisplay', elem.css('display'));  //Guardar el Display por default
    if (_.isEmpty(elem.data('defaultVisibility')))
      elem.data('defaultVisibility', elem.css('visibility'));  //Guardar el Visibility por default

    if (valueSetting === 'false')
      elem.css({ 'display': 'none', 'visibility': 'hidden' });
    else
      elem.css({ 'display': elem.data('defaultDisplay'), 'visibility': elem.data('defaultVisibility')});
  });
}

function ShowHideAdsFunction() {
  return (
    <Form isHideAds={isHideAds()} onChangeHideAds={setHideAds}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-users', /* cambiar el icono */
  i18n: {
    en: {
      'name': 'Ads',
      'description': 'Show/hide ads'
    },
    es: {
      'name': 'Publicidades',
      'description': 'Mostrar/ocultar publicidades'
    }
  },
  contexts: [{ functionComponent: ShowHideAdsFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  valueDefaultSetting: valueDefaultSetting,
  action: action
};