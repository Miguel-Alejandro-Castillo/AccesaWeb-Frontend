import $ from 'jquery';
import { copy as copyToClipboard } from '../clipboard';
import { executeBackgroundAction } from './background';
import { isImage } from '../element_selectors';

function getAddress(state) {
  return $(state.selectedElement).prop('src');
}

function copyAddress(state) {
  copyToClipboard(getAddress(state));
}

function openInNewTab(state) {
  executeBackgroundAction({newTab: getAddress(state)});
}

function download(state) {
  executeBackgroundAction({downloadFile: getAddress(state)});
}

function handleSwitchOnSelectElement(state) {
  return isImage(state.selectedElement);
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-picture-o',
  contexts: [{
    context: 'imageOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    commands: [{
      name: 'i18n-command.copy-address',
      action: copyAddress,
      help: 'i18n-help.copy-address',
      group: 'i18n-group.copy-address',
      switchToContext: 'root'
    }, {
      name: 'i18n-command.open-in-new-tab',
      action: openInNewTab,
      help: 'i18n-help.open-in-new-tab',
      group: 'i18n-group.open-in-new-tab',
      switchToContext: 'root'
    }, {
      name: 'i18n-command.download',
      action: download,
      help: 'i18n-help.download',
      group: 'i18n-group.download',
      switchToContext: 'root'
    }],
    htmlExample: 'i18n-html-example',
    i18n: {
      en: {
        'name': 'Image Actions',
        'command.copy-address': 'copy address',
        'group.copy-address': 'Image Actions',
        'help.copy-address': 'Copies the address of the selected image',
        'command.open-in-new-tab': 'open in new tab',
        'group.open-in-new-tab': 'Image Actions',
        'help.open-in-new-tab': 'Opens the selected image address in a new tab',
        'command.download': 'download',
        'group.download': 'Image Actions',
        'help.download': 'Downloads the selected image',
        'copy-address': 'Copy address',
        'open-in-new-tab': 'Open in new tab',
        'download': 'Download',
        'html-example': 'Use the command "select" or "select image"<br/><img src="/docs-assets/media/image.png" />',
        'exit': 'Exit'
      },
      es: {
        'name': 'Opciones de Imagen',
        'command.copy-address': 'copiar dirección',
        'group.copy-address': 'Acciones de Imágenes',
        'help.copy-address': 'Copia la dirección de la imagen seleccionada',
        'command.open-in-new-tab': 'abrir en nueva pestaña',
        'group.open-in-new-tab': 'Acciones de Imágenes',
        'help.open-in-new-tab': 'Abre la dirección de la imagen en una nueva pestaña',
        'command.download': 'descargar',
        'group.download': 'Acciones de Imágenes',
        'help.download': 'Descarga la imagen seleccionada',
        'copy-address': 'Copiar dirección',
        'open-in-new-tab': 'Abrir en nueva pestaña',
        'download': 'Descargar',
        'html-example': 'Usar el comando "seleccionar" or "seleccionar imagen"<br/><img src="/docs-assets/media/image.png" />',
        'exit': 'Salir'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Image Options',
      'description': 'After select an image it allows you to perform several actions'
    },
    es: {
      'name': 'Opciones de Imágen',
      'description': 'Luego de seleccionar una imagen habilita a realizar varias acciones'
    }
  }
};
