import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';


function Form({isAddImages, onChangeAddImages}) {
  return (
    <div>
      <div className='radio'>
        <label>
          <input type='radio' checked={isAddImages} onChange={() => onChangeAddImages(true)}/> <span>{getI18nText('continuous-mode')}</span>
        </label>
      </div>
      <div className='radio'>
        <label>
          <input type='radio' checked={!isAddImages} onChange={() => onChangeAddImages(false)}/> <span>{getI18nText('intermittent-mode')}</span>
        </label>
      </div>
    </div>
  );
}

Form.propTypes = {
  isAddImages: React.PropTypes.bool.isRequired,
  onChangeAddImages: React.PropTypes.func.isRequired
};


function isAddImages() {
  return localStorage['input.name.addImages'] === 'false' ? false : true;
}

function setAddImages(value) {
  if (isAddImages() !== value) {
    localStorage.setItem('input.name.addImages', value);
    document.dispatchEvent(new Event('changeInput'));
  }
}

function RenderFunction() {
  return (
    <Form isAddImages={isAddImages()} onChangeAddImages={setAddImages}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-mouse-pointer',
  i18n: {
    en: {
      'name': 'Add/Remove Images',
      'description': 'Add or remove images'
    },
    es: {
      'name': 'Agregar/Quitar imagenes',
      'description': 'Agregar o quitar imagenes'
    }
  },
  contexts: [],
  renderFunctionComponent: RenderFunction
};