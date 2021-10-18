import React from 'react';
//import { getI18nText } from '../../docs/i18n/i18n';

function Form() {
  return (
    <div>
      <h3>Desarrolladores: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Coordinadora:</h3>
      <p> &nbsp; Castillo Miguel MG. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Harari Ivana</p>
      <p> &nbsp; Martinez M. Emilia</p>
      <p>UNLP Facultad de Informatica.</p>
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
      'description': ' AccesaWeb intenta ser una herramienta que considera, asiste e incluye a la persona usuaria en su contexto de discapacidad aceptando sus distintas formas de interacción y navegación.  Constituye un aporte al cumplimiento de la ley de accesibilidad garantizando los derechos de acceso a la información y contenido de las páginas web. '
    }
  },
  contexts: [{ functionComponent: OnOffAccesibility }]
};