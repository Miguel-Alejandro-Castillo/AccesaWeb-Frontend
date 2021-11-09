import $ from 'jquery';
import configureStore from './redux/configure-store.js';
import Main from './containers/main_container.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  init as initCommands,
  updateSelectedElement
} from './actions/commands_actions';
import {
  init as initBackground,
  handleBackgroundData } from './actions/background_actions';
import fontAwesome from './services/font-awesome';
import { getActiveItemsMenu } from './services/commands/index';
import _ from 'lodash';

const getURL = window.chrome.runtime.getURL;

function getInitialData(cb) {
  window.chrome.runtime.sendMessage({getInitialData: true}, cb);
}

function initStyle(callback) {
  //const $style = $('<style type="text/css"></style>');
  /*
  const $style = document.createElement('style');
  $style.type = 'text/css';
  $style.load(getURL('/accesibility.css'), function() {
    $('head').append($style);
    window.addEventListener('load', (event) => {
      setTimeout(function() {
        console.log('Se ejecuto esto');
        $('iframe').contents().find('head').append($style);
        callback();
      }, 250);
    });
  });
  */

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = getURL('/accesibility.css');
  document.head.appendChild(link);

  window.addEventListener('load', (event) => {
    const $iStyle = $('<style id="styleIframeAccesaWeb" type="text/css"></style>');
    $iStyle.load(link.href, function() {
      $('iframe').contents().find('head').append($iStyle);
      callback();
    });
  });
  callback();
}

function initUi() {
  const mainCssUrl = getURL('/app.css');
  const nativeCommandsHandlerUrl = getURL('/native-commands-handler.js');

  const $rootElement = $('<div id="browser-voice-control"></div>');
  const $appStyle = $('<style></style>');
  const $appContainer = $('<div></div>');

  const scr = document.createElement('script');
  scr.setAttribute('src', nativeCommandsHandlerUrl);
  scr.setAttribute('id', 'nativeCommands');
  document.head.appendChild(scr);

  $('head').append($(`<style>${fontAwesome(getURL)}</style>`));
  $('body').append($rootElement);

  const shadowRootElement = $rootElement[0].attachShadow({mode: 'open'});
  const $shadowRootElement = $(shadowRootElement);

  $shadowRootElement.append($appStyle);
  $shadowRootElement.append($appContainer);

  $appStyle.load(mainCssUrl);


  return {
    shadowRootElement,
    appContainer: $appContainer[0]
  };
}

function looseFocus({turnedOn}) {
  if (turnedOn) {
    $('body').focus();
  }
}

function initState(store, initialData) {
  store.dispatch(initCommands(initialData));
  store.dispatch(initBackground(initialData));
}

function initEvents(store, rootElement, appContainer, data) {

  const focusElementHandler = () => {
    store.dispatch(updateSelectedElement());
  };

  const keydownHandler = (event) => {
    if (event.keyCode === 17) {
      window.chrome.runtime.sendMessage({startSpeechRecognition: true});
    }
  };

  const changeBackgroundHandler = data => {
    if (data.importedModules) {
      getInitialData(initialData => initState(store, {...initialData, rootElement}));
    }
    executeSettingAction(data);
    store.dispatch(handleBackgroundData(data));

    if ( _.has(data, 'isOnRecognition') ) {
      if ( data.isOnRecognition ) {
        document.addEventListener('keydown', keydownHandler, true);
        document.addEventListener('focus', focusElementHandler, true);
        ReactDOM.render(<Provider store={store}><Main /></Provider>, appContainer);
      } else {
        document.removeEventListener('keydown', keydownHandler, true);
        document.removeEventListener('focus', focusElementHandler, true);
        ReactDOM.unmountComponentAtNode(appContainer);
      }
    }
  };

  if ( _.has(data, 'isOnRecognition') && data.isOnRecognition ) {
    //$(document).keydown(keydownHandler);
    document.addEventListener('keydown', keydownHandler, true);
    document.addEventListener('focus', focusElementHandler, true);
  }
  window.chrome.extension.onMessage.addListener(changeBackgroundHandler);
}

function executeSettingAction(data) {
  if ( _.has(data, 'settingsValues') && !_.isEmpty(data.settingsValues)) {
    getActiveItemsMenu().forEach( itemMenu => {
      itemMenu.items.filter( setting => setting.action && setting.propertySettingLocalStorage ).forEach( setting => {
        const valueSetting = data.settingsValues[setting.propertySettingLocalStorage];
        setting.action(valueSetting);
      });
    });
  }
}

function initApp(initialData) {
  const containers = initUi();
  initialData = {
    ...initialData,
    rootElement: containers.shadowRootElement
  };
  const store = configureStore({});
  looseFocus(initialData);
  initState(store, initialData);
  initEvents(store, containers.shadowRootElement, containers.appContainer, initialData);
  if ( _.has(initialData, 'isOnRecognition') && initialData.isOnRecognition )
    ReactDOM.render(<Provider store={store}><Main /></Provider>, containers.appContainer);
  initStyle(() => executeSettingAction(initialData));
}

getInitialData(initApp);
