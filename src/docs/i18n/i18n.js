import _ from 'lodash';
import { getSelectedLang } from '../../services/appSettings';
import i18nTexts from './texts';

const i18nSeparator = 'i18n-';

function getCurrentLanguage() {
  return getSelectedLang().split('-')[0];
}

function getKeyToResolve(key = '') {
  return _.last(key.split(i18nSeparator));
}

export function getI18nText(key = '', i18nKeys = {}) {
  const currentLanguage = getCurrentLanguage();
  const keyToResolve = getKeyToResolve(key);
  if (!keyToResolve) {
    return key;
  }
  const contextText = i18nKeys[currentLanguage] && i18nKeys[currentLanguage][keyToResolve];
  const globalText = i18nTexts[currentLanguage] && i18nTexts[currentLanguage][keyToResolve];
  return contextText || globalText || key;
}
