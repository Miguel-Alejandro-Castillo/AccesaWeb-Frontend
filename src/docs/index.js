global.Promise = global.Promise || require('es6-promise').Promise;

import $ from 'jquery';
import { getActiveItemsMenu } from '../services/commands/index';
import {
  getSelectedLang,
  setLanguage,
  onLanguageChange,
  //importModule,
  onImportedModulesChange,
  removeImportedModule,
  //moduleCanBeImported,
  //getContinuousMode,
  //setContinuousMode,
  onContinuousModeChange,
  onChangeInput,
  isOnRecognition,
  onChangeOnRecognition
} from '../services/appSettings';
import Main from './components/main';
import Menu from './components/menu';
//import MenuFooter from './components/menu-footer';
import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from './components/top-bar';
import SpeechRecognizer from '../services/speech-recognizer';
import { getI18nText } from './i18n/i18n';

function renderComponents() {
  const itemsMenu = getActiveItemsMenu();

  const $topBarContent = $('#top-bar');
  const TopBarComponent = (<TopBar
    currentLanguage={getSelectedLang()}
    setLanguage={setLanguage}
  />);
  ReactDOM.render(TopBarComponent, $topBarContent[0]);

  const $menu = $('#menu-container');
  const MenuComponent = (<Menu itemsMenu={itemsMenu}
  />);
  ReactDOM.render(MenuComponent, $menu[0]);

  /*const $menuFooter = $('#menu-footer-container');
  const MenuFooterComponent = (<MenuFooter
    importModule={importModule}
    validateModule={moduleCanBeImported}
  />);
  ReactDOM.render(MenuFooterComponent, $menuFooter[0]);*/

  const $mainContent = $('#main-component');
  const MainComponent = (<Main itemsMenu={itemsMenu}
    removeModule={removeImportedModule}
  />);
  ReactDOM.render(MainComponent, $mainContent[0]);

  const titleNavComponent = (<span>{getI18nText('my-setting')}</span>);
  ReactDOM.render( titleNavComponent, document.getElementById('titleNav'));
}

function initSpeechRecognition() {
  if (isOnRecognition())
    SpeechRecognizer.init();
  else
    SpeechRecognizer.stopp();
}

initSpeechRecognition();
renderComponents();
onLanguageChange(renderComponents);
onContinuousModeChange(renderComponents);
onImportedModulesChange(renderComponents);
onChangeInput(renderComponents);
onChangeOnRecognition(() => {
  initSpeechRecognition();
  renderComponents();
});