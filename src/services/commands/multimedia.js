import { executeBackgroundAction } from './background';

export function showHideImages(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'showImages',
      param: value
    }
  });
}

export function showHideAds(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'showAds',
      param: value
    }
  });
}

export function showHideSocialNetworks(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'showSocialNetworks',
      param: value
    }
  });
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
          action: (state, command) => showHideImages(true),
          help: 'i18n-help.show-images',
          group: 'i18n-group.show-images'
        },
        {
          name: 'i18n-command.hide-images',
          action: (state, command) => showHideImages(false),
          help: 'i18n-help.hide-images',
          group: 'i18n-group.hide-images'
        },
        {
          name: 'i18n-command.show-ads',
          action: (state, command) => showHideAds(true),
          help: 'i18n-help.show-ads',
          group: 'i18n-group.show-ads'
        },
        {
          name: 'i18n-command.hide-ads',
          action: (state, command) => showHideAds(false),
          help: 'i18n-help.hide-ads',
          group: 'i18n-group.hide-ads'
        },
        {
          name: 'i18n-command.show-social-networks',
          action: (state, command) => showHideSocialNetworks(true),
          help: 'i18n-help.show-social-networks',
          group: 'i18n-group.show-social-networks'
        },
        {
          name: 'i18n-command.hide-social-networks',
          action: (state, command) => showHideSocialNetworks(false),
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