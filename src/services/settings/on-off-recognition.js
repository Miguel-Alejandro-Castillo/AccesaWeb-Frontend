import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
//import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.onRecognition';

function Form({isOnRecognition, onChangeOnRecognition}) {
  return (
    <div>
      <div className='radio'>
        <label>
          <input type='radio' checked={isOnRecognition} onChange={() => onChangeOnRecognition(true)}/> <span>{getI18nText('on')}</span>
        </label>
      </div>
      <div className='radio'>
        <label>
          <input type='radio' checked={!isOnRecognition} onChange={() => onChangeOnRecognition(false)}/> <span>{getI18nText('off')}</span>
        </label>
      </div>
    </div>
  );
}

Form.propTypes = {
  isOnRecognition: React.PropTypes.bool.isRequired,
  onChangeOnRecognition: React.PropTypes.func.isRequired
};


function isOnRecognition() {
  return localStorage.getItem(propertySettingLocalStorage) === 'false' ? false : true;
}

function setOnRecognition(value) {
  if (isOnRecognition() !== value) {
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

function OnOffRecognition() {
  return (
    <Form isOnRecognition={isOnRecognition()} onChangeOnRecognition={setOnRecognition}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-microphone',
  i18n: {
    en: {
      'name': 'Recognition',
      'description': 'On/off recognition.'
    },
    es: {
      'name': 'Reconocimiento de voz',
      'description': 'Encender/apagar el reconocimiento de voz'
    }
  },
  contexts: [{ functionComponent: OnOffRecognition }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  'action': action
};