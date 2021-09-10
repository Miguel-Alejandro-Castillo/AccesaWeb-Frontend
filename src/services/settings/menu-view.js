import expandedMenu from './expandend-menu';
import orientationMenu from './change-menu-orientation';
const subItems = [expandedMenu, orientationMenu];
export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-bars',
  subItems: subItems,
  i18n: {
    en: {
      'name': 'Menu',
      'description': 'Change menu:'
    },
    es: {
      'name': 'Menú',
      'description': 'Cambios del menú:'
    }
  },
  contexts: []
};