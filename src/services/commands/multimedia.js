import $ from 'jquery';

function showImages() {
  $('img').show();
  $('[style*="url("]').filter(function() {
    var style = $(this).attr('style');
    return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
  }).show();
  $('svg').show();
  $('canvas').show();
  $('iframe').each(function() {
    var iframe = $(this);
    var iframeContent = iframe.contents();
    iframeContent.find('img').show();
    iframeContent.find('[style*="url("]').filter(function() {
      var style = $(this).attr('style');
      return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
    }).show();
    iframeContent.find('svg').show();
    iframeContent.find('canvas').show();
  });
}

function hideImages() {
  $('img').hide();
  $('[style*="url("]').filter(function() {
    var style = $(this).attr('style');
    return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
  }).hide();
  $('svg').hide();
  $('canvas').hide();
  $('iframe').each(function() {
    var iframe = $(this);
    var iframeContent = iframe.contents();
    iframeContent.find('img').hide();
    iframeContent.find('[style*="url("]').filter(function() {
      var style = $(this).attr('style');
      return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
    }).hide();
    iframeContent.find('svg').hide();
    iframeContent.find('canvas').hide();
  });
}

function showAds() {

}

function hideAds() {

}

function showSocialNetworks() {

}

function hideSocialNetworks() {
  
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-image',
  contexts: [
    {
      context: 'root',
      commands: [
        {
          name: 'i18n-command.show-images',
          action: showImages,
          help: 'i18n-help.show-images',
          group: 'i18n-group.show-images'
        },
        {
          name: 'i18n-command.hide-images',
          action: hideImages,
          help: 'i18n-help.hide-images',
          group: 'i18n-group.hide-images'
        }
      ],
      i18n: {
        en: {
          'command.show-images': 'show images',
          'help.show-images': 'Show all images on a page',
          'group.show-images': 'Images',
          'command.hide-images': 'hide images',
          'help.hide-images': 'Hide all images on a page',
          'group.hide-images': 'Images'
        },
        es: {
          'command.show-images': 'mostrar imagenes',
          'help.show-images': 'Mostrar todas las imagenes de una pagina',
          'group.show-images': 'Imagenes',
          'command.hide-images': 'ocultar image',
          'help.hide-images': 'Ocultar todas las imagenes de una pagina',
          'group.hide-images': 'Imagenes'
        }
      }
    }
  ],
  i18n: {
    en: {
      'name': 'Multimedia',
      'description': 'This module allows you to show and hide media items'
    },
    es: {
      'name': 'Multimedia',
      'description': 'Este módulo permite mostrar y ocultar elementos de multimedia'
    }
  }
};