import bookmarks from '../commands/bookmarks';
import click from '../commands/click';
import colorOptions from '../commands/color-options';
import dateOptions from '../commands/date-options';
import datetimeOptions from '../commands/datetime-options';
import downloads from '../commands/downloads';
import _findText from '../commands/find-text';
import _global from '../commands/global';
import help from '../commands/help';
import history from '../commands/history';
import imageOptions from '../commands/image-options';
import introduceText from '../commands/introduce-text';
import linkOptions from '../commands/link-options';
import mediaOptions from '../commands/media-options';
import monthOptions from '../commands/month-options';
import navigation from '../commands/navigation';
import pickLabel from '../commands/pick-label';
import open from '../commands/open';
import rangeOptions from '../commands/range-options';
import scroll from '../commands/scroll';
import search from '../commands/search';
import select from '../commands/select';
import selectOptions from '../commands/select-options';
import tabs from '../commands/tabs';
import textOptions from '../commands/text-options';
import timeOptions from '../commands/time-options';
import topSites from '../commands/top-sites';
import weekOptions from '../commands/week-options';

const items = [
  bookmarks,
  click,
  colorOptions,
  dateOptions,
  datetimeOptions,
  downloads,
  _findText,
  _global,
  help,
  history,
  imageOptions,
  introduceText,
  linkOptions,
  mediaOptions,
  monthOptions,
  navigation,
  open,
  pickLabel,
  rangeOptions,
  scroll,
  search,
  select,
  selectOptions,
  tabs,
  textOptions,
  timeOptions,
  topSites,
  weekOptions
];
export default {
  name: 'i18n-name',
  titleMain: 'i18n-titleMain',
  icon: 'fa fa-cubes',
  items: items,
  i18n: {
    en: {
      'name': 'Interaction mode',
      'titleMain': 'Active Modules'
    },
    es: {
      'name': 'Modo de Interacción',
      'titleMain': 'Módulos Activos'
    }
  }
};