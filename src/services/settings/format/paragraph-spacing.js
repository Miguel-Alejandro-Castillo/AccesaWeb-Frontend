import React from 'react';
import FormChangeParagraphSpacing from '../../../components/forms/form-change-paragraph-spacing';

function ChangeParagraphSpacingFunction() {
  return (
    <FormChangeParagraphSpacing/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-paragraph',
  i18n: {
    en: {
      'name': 'Paragraph spacing',
      'description': 'Add paragragraph spacing'
    },
    es: {
      'name': 'Espaciado entre parrafos',
      'description': 'Agregar espaciado entre parrafos'
    }
  },
  contexts: [{ functionComponent: ChangeParagraphSpacingFunction }]
};