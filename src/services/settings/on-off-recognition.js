import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { getContinuousMode, setContinuousMode} from '../appSettings';
//import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.onRecognition';

function Form({isOnRecognition, onChangeOnRecognition, continuousMode, setContinuousMode}) {
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
      <p>{getI18nText('speech-recognizer-mode')}</p>
      <div className='x_panel speech-recognizer-options'>
        <p className='speech-recognizer-mode-description'>{getI18nText('speech-recognizer-mode-description')}</p>
        <div className='radio'>
          <label>
            <input type='radio' checked={continuousMode} onChange={() => setContinuousMode(true)}/> <span>{getI18nText('continuous-mode')}</span>
          </label>
          <p>{getI18nText('continuous-mode-description')}</p>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' checked={!continuousMode} onChange={() => setContinuousMode(false)}/> <span>{getI18nText('intermittent-mode')}</span>
          </label>
          <p>{getI18nText('intermittent-mode-description')}</p>
        </div>
      </div>
    </div>
  );
}

Form.propTypes = {
  isOnRecognition: React.PropTypes.bool.isRequired,
  onChangeOnRecognition: React.PropTypes.func.isRequired,
  setContinuousMode: React.PropTypes.func.isRequired,
  continuousMode: React.PropTypes.bool.isRequired
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
    <Form isOnRecognition={isOnRecognition()} onChangeOnRecognition={setOnRecognition} continuousMode={getContinuousMode()} setContinuousMode={setContinuousMode}/>
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