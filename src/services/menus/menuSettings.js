import addRemoveImages from '../settings/show-hide-images';
import fontSize from '../settings/font-size';
import contrast from '../settings/contrast-adjustment';
import onOffRecognition from '../settings/on-off-recognition';
import htmlAccesibility from '../settings/html-accesibility';
import changeMemuOrientation from '../settings/change-menu-orientation';
import expandedMenu from '../settings/expendend-menu';

const items = [addRemoveImages, fontSize, contrast, onOffRecognition, htmlAccesibility, changeMemuOrientation, expandedMenu];
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