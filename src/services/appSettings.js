import _ from 'lodash';
import safeEval from 'safe-eval';
import { getActiveSettings } from './commands/index';

const languages = {
  en: 'en-US',
  es: 'es-AR'
};

export function getSelectedLang() {
  return localStorage.lang || navigator.languages[0] || navigator.language || 'en-US';
}

export function getAvailableLanguages() {
  return ['en', 'es'];
}

export function setLanguage(lang) {
  if (getSelectedLang() !== lang) {
    localStorage.setItem('lang', languages[lang] || lang);
    document.dispatchEvent(new Event('languageChange'));
  }
}

export function onLanguageChange(callback) {
  window.addEventListener('storage', event => {
    if (event.key === 'lang') {
      callback(getSelectedLang());
    }
  }, false);
  document.addEventListener('languageChange', (event) => {
    console.log('ENTREE POR EL onLanguageChange 222');
    console.log(event);
    callback(getSelectedLang());
  });
}

export function getContinuousMode() {
  return localStorage.continuousMode === 'false' ? false : true;
}

export function setContinuousMode(status) {
  if (getContinuousMode() !== status) {
    localStorage.setItem('continuousMode', status);
    document.dispatchEvent(new Event('continuousModeChange'));
  }
}

export function onContinuousModeChange(callback) {
  window.addEventListener('storage', event => {
    if (event.key === 'continuousMode') {
      callback(getContinuousMode());
    }
  }, false);
  document.addEventListener('continuousModeChange', () => callback(getContinuousMode()));
}

export function onChangeInput(callback) {
  window.addEventListener('storage', event => {
    if (event.key.startsWith('input.name.')) {
      callback();
    }
  }, false);
  document.addEventListener('changeInput', () => callback());
}

export function getInitialContext() {
  return 'root';
}

function getImportedModuleIds() {
  return localStorage.modules && JSON.parse(localStorage.modules) || [];
}

function setImportedModuleIds(ids) {
  localStorage.setItem('modules', JSON.stringify(ids));
}

function notifyImportedModulesChange() {
  document.dispatchEvent(new Event('importedModulesOnChange'));
}

function getModuleFromSource(source) {
  let module = safeEval(source);
  module = _.isFunction(module) ? module() : module;
  return module;
}

export function importModule(source) {
  const importedModules = getImportedModuleIds();
  const moduleId = `module-${Date.now()}`;
  importedModules.push(moduleId);
  localStorage.setItem(moduleId, source);
  setImportedModuleIds(importedModules);
  notifyImportedModulesChange();
  return moduleId;
}

function getImportedModule(id) {
  const module = getModuleFromSource(localStorage[id]);
  module.id = id;
  module.imported = true;
  return module;
}

export function getImportedModules() {
  return getImportedModuleIds().map(getImportedModule);
}

export function getImportedSourceModules() {
  return getImportedModuleIds().map(id => localStorage[id]);
}

export function onImportedModulesChange(callback) {
  window.addEventListener('storage', event => {
    if (event.key === 'modules') {
      callback(getImportedModules());
    }
  }, false);
  document.addEventListener('importedModulesOnChange', () => callback(getImportedModules()));
}

export function removeImportedModule(id) {
  localStorage.removeItem(id);
  const moduleIds = _.without(getImportedModuleIds(), id);
  setImportedModuleIds(moduleIds);
  notifyImportedModulesChange();
}

export function moduleCanBeImported(source) {
  const module = getModuleFromSource(source);
  return module && module.name;
}

export function getSettingsValues() {
  const result = {};
  getActiveSettings().filter(setting => setting.propertySettingLocalStorage ).forEach(setting => {
    result[setting.propertySettingLocalStorage] = localStorage.getItem(setting.propertySettingLocalStorage);
  });
  return result;
}