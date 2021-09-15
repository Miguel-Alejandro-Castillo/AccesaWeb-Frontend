import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
//import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.onAccesibility';
const valueDefaultSetting = 'true';

function Form({isOnAccesibility, onChangeOnAccesibility}) {
  return (
    <div>
      <div className='radio'>
        <label>
          <input type='radio' checked={isOnAccesibility} onChange={() => onChangeOnAccesibility(true)}/> <span>{getI18nText('on')}</span>
        </label>
      </div>
      <div className='radio'>
        <label>
          <input type='radio' checked={!isOnAccesibility} onChange={() => onChangeOnAccesibility(false)}/> <span>{getI18nText('off')}</span>
        </label>
      </div>
    </div>
  );
}

Form.propTypes = {
  isOnAccesibility: React.PropTypes.bool.isRequired,
  onChangeOnAccesibility: React.PropTypes.func.isRequired
};


function isOnAccesibility() {
  return localStorage.getItem(propertySettingLocalStorage) === 'false' ? false : true;
}

function setOnAccesibility(value) {
  if (isOnAccesibility() !== value) {
    localStorage.setItem(propertySettingLocalStorage, value);
    document.dispatchEvent(new Event('changeInput'));
  }
}

function action(valueSetting) {
  if (valueSetting === 'false') {
    //apagado
  } else {
    //encendido
  }
}

function OnOffAccesibility() {
  return (
    <Form isOnAccesibility={isOnAccesibility()} onChangeOnAccesibility={setOnAccesibility}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-universal-access',
  i18n: {
    en: {
      'name': 'HTML Accessibility',
      'description': 'Makes HMTL accessible to help the screen reader.'
    },
    es: {
      'name': 'Accesibilidad HTML',
      'description': 'Accesibiliza HTML para ayudar al lector de pantalla.'
    }
  },
  contexts: [{ functionComponent: OnOffAccesibility }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  valueDefaultSetting: valueDefaultSetting,
  'action': action
};