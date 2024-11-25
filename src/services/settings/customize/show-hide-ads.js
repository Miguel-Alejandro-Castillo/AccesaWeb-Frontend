import React from 'react';
import FormShowHideAds from '../../../components/forms/form-show-hide-ads';

function ShowHideAdsFunction() {
  return (
    <FormShowHideAds/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-users', /* cambiar el icono */
  i18n: {
    en: {
      'name': 'Ads',
      'description': 'Show/hide ads'
    },
    es: {
      'name': 'Publicidades',
      'description': 'Mostrar/ocultar publicidades'
    }
  },
  contexts: [{ functionComponent: ShowHideAdsFunction }]
};