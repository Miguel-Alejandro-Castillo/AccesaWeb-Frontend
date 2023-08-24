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

function initEvents(store, rootElement) {
  const focusElementHandler = () => store.dispatch(updateSelectedElement());
  const changeBackgroundHandler = data => {
    if (data.importedModules) {
      getInitialData(initialData => initState(store, {...initialData, rootElement}));
    }
    store.dispatch(handleBackgroundData(data));
  };

  $(document).keydown(function(event) {
    if (event.keyCode === 17) {
      window.chrome.runtime.sendMessage({startSpeechRecognition: true});
    }
  });

  document.addEventListener('focus', focusElementHandler, true);
  window.chrome.extension.onMessage.addListener(changeBackgroundHandler);
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
  initEvents(store, containers.shadowRootElement);
  ReactDOM.render(<Provider store={store}><Main /></Provider>, containers.appContainer);
}

getInitialData(initApp);
