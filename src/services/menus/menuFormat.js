import alignText from '../settings/format/align-text';
import lineSpacingSetting from '../settings/format/line-spacing';
import paragraphSpacing from '../settings/format/paragraph-spacing';
import fontSize from '../settings/format/font-size';
import changeFont from '../settings/format/change-font';

const items = [alignText, lineSpacingSetting, paragraphSpacing, fontSize, changeFont];
export default {
  name: 'i18n-name',
  titleMain: 'i18n-titleMain',
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