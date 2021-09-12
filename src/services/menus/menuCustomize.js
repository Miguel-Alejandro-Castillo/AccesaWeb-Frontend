import contrast from '../settings/customize/contrast-adjustment';
import changeMenuOrientation from '../settings/customize/change-menu-orientation';
import expandendMenu from '../settings/customize/expandend-menu';

const items = [contrast, changeMenuOrientation, expandendMenu];
export default {
  name: 'i18n-name',
  icon: 'fa fa-pencil',
  items: items,
  i18n: {
    en: {
      'name': 'Customize'
    },
    es: {
      'name': 'Personalizar'
    }
  }
};