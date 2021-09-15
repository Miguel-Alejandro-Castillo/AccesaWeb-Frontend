import React from 'react';
import { getI18nText } from '../../../docs/i18n/i18n';
import $ from 'jquery';
import _ from 'lodash';

const propertySettingLocalStorage = 'input.name.hideSocialNetworks';
const valueDefaultSetting = 'true';

//Quitar logos de redes sociales segun Transita Web
//$redes_sociales = array( "FACEBOOK", "TWITTER", "WHATSAPP", "YOUTUBE", "INSTAGRAM", "LINKEDIN","QZONE", "GOOGLE", "PINTEREST", "BADOO","PIN IT", "GOOGLE PLUS", "PLUS");
const  socialNetworks = [ 'facebook', 'twitter', 'whatsapp', 'youtube', 'instagram', 'telegram', 'linkedin', 'qzone', 'pinterest', 'badoo' ];

function Form({isHideSocialNetworks, onChangeHideSocialNetworks}) {
  return (
    <div>
      <div className='radio'>
        <label>
          <input type='radio' checked={isHideSocialNetworks} onChange={() => onChangeHideSocialNetworks(true)}/> <span>{getI18nText('show')}</span>
        </label>
      </div>
      <div className='radio'>
        <label>
          <input type='radio' checked={!isHideSocialNetworks} onChange={() => onChangeHideSocialNetworks(false)}/> <span>{getI18nText('hide')}</span>
        </label>
      </div>
    </div>
  );
}

Form.propTypes = {
  isHideSocialNetworks: React.PropTypes.bool.isRequired,
  onChangeHideSocialNetworks: React.PropTypes.func.isRequired
};


function isHideSocialNetworks() {
  return localStorage.getItem(propertySettingLocalStorage) === 'false' ? false : true;
}

function setHideSocialNetworks(value) {
  if (isHideSocialNetworks() !== value) {
    localStorage.setItem(propertySettingLocalStorage, value);
    document.dispatchEvent(new Event('changeInput'));
  }
}

function action(valueSetting) {
  $("a[href!='']").filter(function() {
    let hrefValue = $(this).attr('href');
    if (hrefValue) {
      hrefValue = hrefValue.toLowerCase();
      return socialNetworks.some(function(socialNetwork) {
        return hrefValue.includes(socialNetwork);
      });
    } else {
      return false;
    }
  }).each(function() {
    const a = $(this);
    if (_.isEmpty(a.data('defaultDisplay')))
      a.data('defaultDisplay', a.css('display'));  //Guardar el Display por default
    if (_.isEmpty(a.data('defaultVisibility')))
      a.data('defaultVisibility', a.css('visibility'));  //Guardar el Visibility por default

    if (valueSetting === 'false')
      a.css({ 'display': 'none', 'visibility': 'hidden' });
    else
      a.css({ 'display': a.data('defaultDisplay'), 'visibility': a.data('defaultVisibility')});
  });
}

function ShowHideSocialNetworksFunction() {
  return (
    <Form isHideSocialNetworks={isHideSocialNetworks()} onChangeHideSocialNetworks={setHideSocialNetworks}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-users',
  i18n: {
    en: {
      'name': 'Social Networks',
      'description': 'Show/hide social networks'
    },
    es: {
      'name': 'Redes Sociales',
      'description': 'Mostrar/ocultar redes sociales'
    }
  },
  contexts: [{ functionComponent: ShowHideSocialNetworksFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  valueDefaultSetting: valueDefaultSetting,
  action: action
};