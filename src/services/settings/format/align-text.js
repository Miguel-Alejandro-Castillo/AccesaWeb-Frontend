import React from 'react';
import FormChangeTextAlign from '../../../components/forms/form-change-align';

function changeTextAlignFunction() {
  return (
    <FormChangeTextAlign/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-align-left',
  i18n: {
    en: {
      'name': 'Align text',
      'description': 'Align the text of the visited pages'
    },
    es: {
      'name': 'Alineacion',
      'description': 'Alinear el texto de las paginas visitadas'
    }
  },
  contexts: [{ functionComponent: changeTextAlignFunction }]
};