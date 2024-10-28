
function showImages() {
  var event = new CustomEvent('modificarDOM', { detail: {action: 'showImages'}});
  document.dispatchEvent(event);
}

function hideImages() {
  var event = new CustomEvent('modificarDOM', { detail: {action: 'hideImages'}});
  document.dispatchEvent(event);
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
          'command.show-images': 'mostrar imágenes',
          'help.show-images': 'Mostrar todas las imágenes de una pagina',
          'group.show-images': 'Imágenes',
          'command.hide-images': 'ocultar imágenes',
          'help.hide-images': 'Ocultar todas las imágenes de una pagina',
          'group.hide-images': 'Imágenes'
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