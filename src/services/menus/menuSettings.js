import addRemoveImages from '../settings/add-remove-images';
import fontSize from '../settings/font_size';
import contrast from '../settings/contrast_adjustment';
const items = [addRemoveImages, fontSize, contrast];
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