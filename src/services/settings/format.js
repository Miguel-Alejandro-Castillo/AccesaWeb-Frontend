import fontSize from './font-size';
import lineSpacing from './line-spacing';
import alignText from './align-text';
import paragraphSacing from './paragraph-spacing';
const subItems = [fontSize, alignText, lineSpacing, paragraphSacing];
export default {
  name: 'i18n-name',
  description: 'i18n-description',
  subItems: subItems,
  icon: 'fa fa-text',
  i18n: {
    en: {
      'name': 'Format',
      'description': 'Format options:'
    },
    es: {
      'name': 'Formato',
      'description': 'Opciones de formato:'
    }
  },
  contexts: []
};