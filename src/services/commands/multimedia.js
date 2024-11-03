import { executeBackgroundAction } from './background';

/*
function sendMessage(message) {
  var channel = new BroadcastChannel('channelModifyDOM');
  channel.postMessage(message);
  channel.close(); // Cerrar el canal después de enviar el mensaje
}
*/

function showImages() {
  executeBackgroundAction({
    modifyDOM: {
      action: 'showImages',
      param: true
    }
  });
}

function hideImages() {
  executeBackgroundAction({
    modifyDOM: {
      action: 'showImages',
      param: false
    }
  });
}

function showAds() {
  executeBackgroundAction({
    modifyDOM: {
      action: 'showAds',
      param: true
    }
  });
}

function hideAds() {
  executeBackgroundAction({
    modifyDOM: {
      action: 'showAds',
      param: false
    }
  });
}

function showSocialNetworks() {
  executeBackgroundAction({
    modifyDOM: {
      action: 'showSocialNetworks',
      param: true
    }
  });
}

function hideSocialNetworks() {
  executeBackgroundAction({
    modifyDOM: {
      action: 'showSocialNetworks',
      param: false
    }
  });
}

/*
function showImages() {
  var event = new CustomEvent('modificarDOM', { detail: { action: 'showImages' } });
  document.dispatchEvent(event);
}

function hideImages() {
  var event = new CustomEvent('modificarDOM', { detail: { action: 'hideImages' } });
  document.dispatchEvent(event);
}

function showAds() {
  var event = new CustomEvent('modificarDOM', { detail: { action: 'showAds' } });
  document.dispatchEvent(event);
}

function hideAds() {
  var event = new CustomEvent('modificarDOM', { detail: { action: 'hideAds' } });
  document.dispatchEvent(event);
}

function showSocialNetworks() {
  var event = new CustomEvent('modificarDOM', { detail: { action: 'showSocialNetworks' } });
  document.dispatchEvent(event);
}

function hideSocialNetworks() {
  var event = new CustomEvent('modificarDOM', { detail: { action: 'hideSocialNetworks' } });
  document.dispatchEvent(event);
}
*/

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
        },
        {
          name: 'i18n-command.show-ads',
          action: showAds,
          help: 'i18n-help.show-ads',
          group: 'i18n-group.show-ads'
        },
        {
          name: 'i18n-command.hide-ads',
          action: hideAds,
          help: 'i18n-help.hide-ads',
          group: 'i18n-group.hide-ads'
        },
        {
          name: 'i18n-command.show-social-networks',
          action: showSocialNetworks,
          help: 'i18n-help.show-social-networks',
          group: 'i18n-group.show-social-networks'
        },
        {
          name: 'i18n-command.hide-social-networks',
          action: hideSocialNetworks,
          help: 'i18n-help.hide-social-networks',
          group: 'i18n-group.hide-social-networks'
        }
      ],
      i18n: {
        en: {
          'command.show-images': 'show images',
          'help.show-images': 'Show all images on a page',
          'group.show-images': 'Images',
          'command.hide-images': 'hide images',
          'help.hide-images': 'Hide all images on a page',
          'group.hide-images': 'Images',
          'command.show-ads': 'show ads',
          'help.show-ads': 'Show all ads on a page',
          'group.show-ads': 'Ads',
          'command.hide-ads': 'hide ads',
          'help.hide-ads': 'Hide all ads on a page',
          'group.hide-ads': 'Ads',
          'command.show-social-networks': 'show social networks',
          'help.show-social-networks': 'Show all social networks on a page',
          'group.show-social-networks': 'Show social networks',
          'command.hide-social-networks': 'hide social netwoks',
          'help.hide-social-networks': 'Hide all social netwoks on a page',
          'group.hide-social-networks': 'Social netwoks'
        },
        es: {
          'command.show-images': 'mostrar imágenes',
          'help.show-images': 'Mostrar todas las imágenes de una página',
          'group.show-images': 'Imágenes',
          'command.hide-images': 'ocultar imágenes',
          'help.hide-images': 'Ocultar todas las imágenes de una página',
          'group.hide-images': 'Imágenes',
          'command.show-ads': 'mostrar publicidades',
          'help.show-ads': 'Mostrar todas las publicidades de una página',
          'group.show-ads': 'Publicidades',
          'command.hide-ads': 'ocultar publicidades',
          'help.hide-ads': 'Ocultar todas las publicidades de una página',
          'group.hide-ads': 'Publicidades',
          'command.show-social-networks': 'mostrar redes sociales',
          'help.show-social-networks': 'Mostrar todas las redes sociales de una página',
          'group.show-social-networks': 'Redes sociales',
          'command.hide-social-networks': 'ocultar redes sociales',
          'help.hide-social-networks': 'Ocultar todas las redes sociales de una página',
          'group.hide-social-networks': 'Redes sociales'
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