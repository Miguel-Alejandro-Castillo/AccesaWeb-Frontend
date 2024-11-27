import React from 'react';
import FormChangeFontSize from '../../../components/forms/form-change-font-size';

function changeFontSizeFunction() {
  return (
    <FormChangeFontSize />
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-text-width',
  i18n: {
    en: {
      'name': 'Font size',
      'description': 'Change font size'
    },
    es: {
      'name': 'Tamaño de fuente',
      'description': 'Cambia el tamaño de fuente'
    }
  },
  contexts: [{ functionComponent: changeFontSizeFunction }]
};