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
import { getActiveSettings } from './services/commands/index';
import _ from 'lodash';

const getURL = window.chrome.runtime.getURL;

function getInitialData(cb) {
  window.chrome.runtime.sendMessage({getInitialData: true}, cb);
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
  const activeSettings = getActiveSettings();
  if ( _.has(data, 'settingsValues') && !_.isEmpty(data.settingsValues) && !_.isEmpty(activeSettings)) {
    activeSettings.forEach( setting => {
      if (setting.action && setting.propertySettingLocalStorage)
        setting.action(data.settingsValues[setting.propertySettingLocalStorage]);
      if ( !_.isEmpty(setting.subItems) ) {
        _.forEach(setting.subItems, subItem => {
          if (subItem.action && subItem.propertySettingLocalStorage)
            subItem.action(data.settingsValues[subItem.propertySettingLocalStorage]);
        });
      }
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
  executeSettingAction(initialData);
  initState(store, initialData);
  initEvents(store, containers.shadowRootElement, containers.appContainer, initialData);
  if ( _.has(initialData, 'isOnRecognition') && initialData.isOnRecognition )
    ReactDOM.render(<Provider store={store}><Main /></Provider>, containers.appContainer);
}

getInitialData(initApp);
