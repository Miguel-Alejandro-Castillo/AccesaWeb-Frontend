import React from 'react';
import FormChangeLineSpacing from '../../../components/forms/form-change-line-spacing';

function changeLineSpacingFunction() {
  return (
    <FormChangeLineSpacing/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-text-height',
  i18n: {
    en: {
      'name': 'Line spacing',
      'description': 'Add line spacing'
    },
    es: {
      'name': 'Espaciado',
      'description': 'Agregar espaciado entre renglones'
    }
  },
  contexts: [{ functionComponent: changeLineSpacingFunction}]
};