import React from 'react';
import FormShowHideSocialNetworks from '../../../components/forms/form-show-hide-social-networks';

function ShowHideSocialNetworksFunction() {
  return (
    <FormShowHideSocialNetworks/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-users',
  i18n: {
    en: {
      'name': 'Social Networks',
      'description': 'Show/hide social networks'
    },
    es: {
      'name': 'Redes Sociales',
      'description': 'Mostrar/ocultar redes sociales'
    }
  },
  contexts: [{ functionComponent: ShowHideSocialNetworksFunction }]
};