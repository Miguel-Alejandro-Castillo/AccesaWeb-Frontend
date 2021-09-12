import htmlAccesibility from '../settings/html-accesibility';
import onOffRecognition from '../settings/on-off-recognition';

const items = [htmlAccesibility, onOffRecognition];
export default {
  name: 'i18n-name',
  icon: 'fa fa-universal-access',
  items: items,
  i18n: {
    en: {
      'name': 'Accesibility'
    },
    es: {
      'name': 'Accesibilidad'
    }
  }
};