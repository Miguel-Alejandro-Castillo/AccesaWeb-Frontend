import React from 'react';
import FormChangeContrast from '../../../components/forms/form-change-contrast';

function ContrastFunction() {
  return (
    <FormChangeContrast/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-adjust',
  i18n: {
    en: {
      'name': 'Contrast',
      'description': 'Change contrast'
    },
    es: {
      'name': 'Contraste',
      'description': 'Cambia el contraste'
    }
  },
  contexts: [{ functionComponent: ContrastFunction }]
};