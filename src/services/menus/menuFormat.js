import alignText from '../settings/format/align-text';
import lineSpacingSetting from '../settings/format/line-spacing';
import paragraphSpacing from '../settings/format/paragraph-spacing';
import fontSize from '../settings/format/font-size';

const items = [alignText, lineSpacingSetting, paragraphSpacing, fontSize];
export default {
  name: 'i18n-name',
  icon: 'fa fa-font',
  items: items,
  i18n: {
    en: {
      'name': 'Format',
      'titleMain': 'Format'
    },
    es: {
      'name': 'Formato',
      'titleMain': 'Formato'
    }
  }
};