global.Promise = global.Promise || require('es6-promise').Promise;

import $ from 'jquery';
import { getActiveModules, getActiveSettings, getActiveItemsMenu} from '../services/commands/index';
import {
  getSelectedLang,
  setLanguage,
  onLanguageChange,
  importModule,
  onImportedModulesChange,
  getImportedModules,
  removeImportedModule,
  moduleCanBeImported,
  getContinuousMode,
  setContinuousMode,
  onContinuousModeChange } from '../services/appSettings';
import Main from './components/main';
import Menu from './components/menu';
import MenuFooter from './components/menu-footer';
import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from './components/top-bar';
import SpeechRecognizer from '../services/speech-recognizer';

SpeechRecognizer.init();

function getModules() {
  return getActiveModules().concat(getImportedModules());
}

function getSettings() {
  //Hay que agregarle el concat(getImportedModules()); ?? A mi entender, no
  return getActiveSettings();
}

function getItemsMenu() {
  return getActiveItemsMenu();
}

function renderComponents() {
  const modules = getModules();
  const settings = getSettings();
  const itemsMenu = getItemsMenu();

  const $topBarContent = $('#top-bar');
  const TopBarComponent = (<TopBar
    currentLanguage={getSelectedLang()}
    setLanguage={setLanguage}
  />);
  ReactDOM.render(TopBarComponent, $topBarContent[0]);

  const $menu = $('#menu-container');
  const MenuComponent = (<Menu modules={modules}
    settings={settings}
    itemsMenu={itemsMenu}
  />);
  ReactDOM.render(MenuComponent, $menu[0]);

  const $menuFooter = $('#menu-footer-container');
  const MenuFooterComponent = (<MenuFooter
    importModule={importModule}
    validateModule={moduleCanBeImported}
  />);
  ReactDOM.render(MenuFooterComponent, $menuFooter[0]);

  const $mainContent = $('#main-component');
  const MainComponent = (<Main
    modules={modules}
    settings={settings}
    removeModule={removeImportedModule}
    continuousMode={getContinuousMode()}
    setContinuousMode={setContinuousMode}
  />);

  ReactDOM.render(MainComponent, $mainContent[0]);
}

renderComponents();
onLanguageChange(renderComponents);
onContinuousModeChange(renderComponents);
onImportedModulesChange(renderComponents);
