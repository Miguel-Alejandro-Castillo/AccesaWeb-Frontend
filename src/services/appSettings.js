/*global chrome*/
import _ from 'lodash';
import safeEval from 'safe-eval';
import { getActiveItemsMenu } from './commands/index';

const languages = {
  en: 'en-US',
  es: 'es-AR'
};

/*  No me compila esta funcion anonima con async/await - Miguel
let localStorage2 = {
  getAllItems: () => chrome.storage.local.get(),
  getItem: async function(key) {
    const result = await chrome.storage.local.get(key);
    return result.key;
  },
  setItem: (key, val) => chrome.storage.local.set({[key]: val}),
  removeItems: (keys) => chrome.storage.local.remove(keys)
};
*/

export async function getSelectedLang() {
  const result = await chrome.storage.local.get("lang");
  console.log(result.key);
  return result || navigator.languages[0] || navigator.language || 'en-US';
}

export function getAvailableLanguages() {
  return ['en', 'es'];
}

export async function setLanguage(lang) {
  if (getSelectedLang() !== lang) {
    await chrome.storage.local.set({[lang]: languages[lang] || lang});
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
    callback(getSelectedLang());
  });
}

export async function getContinuousMode() {
  const result = await chrome.storage.local.get("continuousMode");
  return result === 'false' ? false : true;
}

export async function setContinuousMode(status) {
  if (getContinuousMode() !== status) {
    await chrome.storage.local.set({[continuousMode]: status});
    document.dispatchEvent(new Event('continuousModeChange'));
  }
}

export function onContinuousModeChange(callback) {
  window.addEventListener('storage', event => {
    if (event.key === 'continuousMode') {
      callback(getContinuousMode());
    }
  }, false);
  document.addEventListener('continuousModeChange', callback);
}

export function removeOnContinuousModeChange(callback) {
  document.removeEventListener('continuousModeChange', callback);
}

export async function isOnRecognition() {
  const result = await chrome.storage.local.get("onRecognition");
  return result === 'false' ? false : true;
}

export async function setOnRecognition(value) {
  if (isOnRecognition() !== value) {
    await chrome.storage.local.set({[onRecognition]: value});
    document.dispatchEvent(new Event('changeOnRecognition'));
  }
}

export function onChangeOnRecognition(callback) {
  window.addEventListener('storage', event => {
    if (event.key === 'onRecognition') {
      callback();
    }
  }, false);
  document.addEventListener('changeOnRecognition', () => callback());
}

export function onChangeInput(callback) {
  window.addEventListener('storage', event => {
    if (event.key.startsWith('input.name.')) {
      callback();
    }
  }, false);
  document.addEventListener('changeInput', () => callback());
}

export function onResetSettings(callback) {
  window.addEventListener('storage', event => {
    if (event.key === 'isResetSettings') {
      callback();
    }
  }, false);
  document.addEventListener('resetSettings', () => callback());
}

export function getInitialContext() {
  return 'root';
}

async function getImportedModuleIds() {
  const result = await chrome.storage.local.get("modules");
  return result && JSON.parse(result) || [];
  

}

async function setImportedModuleIds(ids) {
  await chrome.storage.local.set({[modules]: JSON.stringify(ids)});
}

function notifyImportedModulesChange() {
  document.dispatchEvent(new Event('importedModulesOnChange'));
}

function getModuleFromSource(source) {
  let module = safeEval(source);
  module = _.isFunction(module) ? module() : module;
  return module;
}

export async function importModule(source) {
  const importedModules = getImportedModuleIds();
  const moduleId = `module-${Date.now()}`;
  importedModules.push(moduleId);
  await chrome.storage.local.set({[moduleId]: source});
  setImportedModuleIds(importedModules);
  notifyImportedModulesChange();
  return moduleId;
}

async function getImportedModule(id) {
  const result = await chrome.storage.local.get("id");
  const module = getModuleFromSource(result);
  module.id = id;
  module.imported = true;
  return module;
}

export function getImportedModules() {
  return getImportedModuleIds().map(getImportedModule);
}

export async function getImportedSourceModules() {
  const result = await chrome.storage.local.get("id");
  return getImportedModuleIds().map(id => result);
}

export function onImportedModulesChange(callback) {
  window.addEventListener('storage', event => {
    if (event.key === 'modules') {
      callback(getImportedModules());
    }
  }, false);
  document.addEventListener('importedModulesOnChange', () => callback(getImportedModules()));
}

export async function removeImportedModule(id) {
  await chrome.storage.local.remove(id);
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
  getActiveItemsMenu().forEach( itemMenu => {
    itemMenu.items.filter( setting => setting.propertySettingLocalStorage ).forEach(async setting => {
      result[setting.propertySettingLocalStorage] = await chrome.storage.local.get(setting.propertySettingLocalStorage);
    });
  });
  return result;
}

export function initPropertiesSettings() {
  getActiveItemsMenu().forEach( itemMenu => {
    itemMenu.items.filter( setting => setting.propertySettingLocalStorage && setting.valueDefaultSetting ).forEach(async setting => {
      await chrome.storage.local.set({[setting.propertySettingLocalStorage]: setting.valueDefaultSetting});
    });
  });
}