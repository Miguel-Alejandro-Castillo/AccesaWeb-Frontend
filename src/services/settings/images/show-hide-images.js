import React from 'react';
import FormShowHideImages from '../../../components/forms/form-show-hide-images';

function ShowHideImagesFunction() {
  return (
    <FormShowHideImages/>
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
  contexts: [{ functionComponent: ShowHideImagesFunction }]
};