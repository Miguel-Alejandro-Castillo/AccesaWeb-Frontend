import addRemoveImages from '../settings/show-hide-images';
import fontSize from '../settings/font-size';
import contrast from '../settings/contrast-adjustment';
import onOffRecognition from '../settings/on-off-recognition';
import htmlAccesibility from '../settings/html-accesibility';
const items = [addRemoveImages, fontSize, contrast, onOffRecognition, htmlAccesibility];
export default {
  name: 'i18n-name',
  icon: 'fa fa-cogs',
  items: items,
  i18n: {
    en: {
      'name': 'Settings'
    },
    es: {
      'name': 'Configuraciones'
    }
  }
};