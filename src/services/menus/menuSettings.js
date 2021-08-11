import addRemoveImages from '../settings/add-remove-images';
const items = [addRemoveImages];
export default {
  name: 'i18n-name',
  titleMain: 'i18n-titleMain',
  icon: 'fa fa-cogs',
  items: items,
  i18n: {
    en: {
      'name': 'Settings',
      'titleMain': 'Active Settings'
    },
    es: {
      'name': 'Configuraciones',
      'titleMain': 'Configuraciones Activas'
    }
  }
};