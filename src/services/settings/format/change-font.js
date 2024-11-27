import React from 'react';
import FormChangeFont from '../../../components/forms/form-change-font';
function FontFunction() {
  return (
    <FormChangeFont />
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-font',
  i18n: {
    en: {
      'name': 'Font',
      'description': 'Change font type.'
    },
    es: {
      'name': 'Fuente',
      'description': 'Cambia el tipo de letra.'
    }
  },
  contexts: [{ functionComponent: FontFunction }]
};