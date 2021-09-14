import React from 'react';
//import { getI18nText } from '../../docs/i18n/i18n';

function Form() {
  return (
    <div>
      ashksh
    </div>
  );
}

Form.propTypes = {
};

function OnOffAccesibility() {
  return (
    <Form/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-info',
  i18n: {
    en: {
      'name': 'AccesaWeb',
      'description': 'Help tool for people with disabilities.'
    },
    es: {
      'name': 'AccesaWeb',
      'description': 'Herramienta de ayuda para las personas con discapacidad.'
    }
  },
  contexts: [{ functionComponent: OnOffAccesibility }]
};