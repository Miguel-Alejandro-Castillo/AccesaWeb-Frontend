import React from 'react';
import FormShowHideImages from '../../../components/forms/form-show-hide-images';

/*
function action(valueSetting) {
  var imgs = $('img');
  var elems = $('*').filter(function() {
    var el = $(this);
    return el.css('background-image');
  });
  var imgsIframe = $('iframe').contents().find('img');
  var elemsIframe = $('iframe').contents().find('*');
  if (valueSetting === 'false') {
    imgs.addClass('hide-element-aw');
    elems.addClass('remove-background-image-aw');
    imgsIframe.addClass('hide-element-aw');
    elemsIframe.addClass('remove-background-image-aw');
  } else {
    imgs.removeClass('hide-element-aw');
    elems.removeClass('remove-background-image-aw');
    imgsIframe.removeClass('hide-element-aw');
    elemsIframe.removeClass('remove-background-image-aw');
  }
}
*/

function ShowHideImagesFunction() {
  return (
    <FormShowHideImages/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-image',
  i18n: {
    en: {
      'name': 'Images',
      'description': 'Show/hide images'
    },
    es: {
      'name': 'Imagenes',
      'description': 'Mostrar/ocultar imagenes'
    }
  },
  contexts: [{ functionComponent: ShowHideImagesFunction }]
};