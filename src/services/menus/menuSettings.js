import addRemoveImages from '../settings/show-hide-images';
import menuView from '../settings/menu-view';
import contrast from '../settings/contrast-adjustment';
import onOffRecognition from '../settings/on-off-recognition';
import htmlAccesibility from '../settings/html-accesibility';
import format from '../settings/format';
import showHideSocialNetworks from '../settings/show-hide-social-networks';

const items = [addRemoveImages, menuView, contrast, onOffRecognition, htmlAccesibility, format, showHideSocialNetworks];
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