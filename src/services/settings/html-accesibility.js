import React from 'react';
import FormEnableDisableAccesibility from '../../components/forms/form-enable-disable-accesibility';

function EnableDisableAccessibilityHTMLFunction() {
  return (
    <FormEnableDisableAccesibility/>
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
  contexts: [{ functionComponent: EnableDisableAccessibilityHTMLFunction }]
};