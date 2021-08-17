import {
  getImportedSourceModules,
  getInitialContext,
  onLanguageChange,
  getSelectedLang,
  onImportedModulesChange,
  onContinuousModeChange,
  onChangeInput,
  getSettingsValues
} from './appSettings';
import _ from 'lodash';
import log from 'loglevel';

if (process.env.DEVTOOLS) {
  log.enableAll();
} else {
  log.disableAll();
}

const chrome = window.chrome;
const tabs = chrome.tabs;

const actionHandlers = {
  addBookmark,
  closeTab,
  downloadFile,
  getBookmarks,
  getDownloads,
  getHistory,
  getInitialData,
  getTopSites,
  newTab,
  nextTab,
  previousTab,
  removeBookmark,
  shareSpeechRecognizerState,
  startSpeechRecognition
};

const docsUrl = chrome.extension.getURL('docs.html');
let lastSpeechRecognizerState;

function previousTab(sender) {
  tabs.query({lastFocusedWindow: true}, function(selectedTabs) {
    const tab = selectedTabs[sender.tab.index - 1];
    if (tab) {
      tabs.update(tab.id, {active: true});
    } else {
      tabs.update(selectedTabs[selectedTabs.length - 1].id, {active: true});
    }
  });
}

function nextTab(sender) {
  tabs.query({lastFocusedWindow: true}, function(selectedTabs) {
    const tab = selectedTabs[sender.tab.index + 1];
    if (tab) {
      tabs.update(tab.id, {active: true});
    } else {
      tabs.update(selectedTabs[0].id, {active: true});
    }
  });
}

function closeTab(sender) {
  tabs.remove(sender.tab.id);
}

function newTab(sender, url) {
  const options = {active: true};
  if (_.isString(url)) {
    options.url = url;
  }
  tabs.create(options);
}

function getTopSites() {
  chrome.topSites.get(topSites => sendDataToCurrentTab({topSites}));
}

function getBookmarks() {
  chrome.bookmarks.getTree(bookmarksTree => sendDataToCurrentTab({bookmarksTree}));
}

function addBookmark(sender, bookmark) {
  chrome.bookmarks.create(bookmark);
}

function removeBookmark(sender, bookmarkId) {
  chrome.bookmarks.remove(bookmarkId, getBookmarks);
}

function getHistory(sender) {
  chrome.history.search({
    maxResults: 500,
    text: ''
  }, history => sendDataToCurrentTab({history}));
}

function getDownloads() {
  chrome.downloads.search({}, downloads => sendDataToCurrentTab({downloads}));
}

function downloadFile(sender, url) {
  chrome.downloads.download({url});
}

function startSpeechRecognition() {
  sendDataToDocsTab({start: true});
}

function sendDataToDocsTab(data) {
  tabs.query({url: docsUrl}, function(docsTabs) {
    docsTabs.forEach(tab => {
      tabs.sendMessage(tab.id, data, response => {});
    });
  });
}

function shareSpeechRecognizerState(sender, speechRecognizerState) {
  lastSpeechRecognizerState = speechRecognizerState;
  sendDataToCurrentTab({speechRecognizerState});
}

function sendDataToTabs(data) {
  tabs.query({}, function(allTheTabs) {
    allTheTabs.forEach(tab => {
      tabs.sendMessage(tab.id, data, response => {});
    });
  });
}

function sendDataToCurrentTab(data) {
  tabs.query({active: true, lastFocusedWindow: true}, function(tab) {
    tabs.sendMessage(tab[0].id, data, response => {});
  });
}

function sendLang() {
  sendDataToTabs({
    lang: getSelectedLang()
  });
}

function sendSettingsValues() {
  sendDataToTabs({
    settingsValues: getSettingsValues()
  });
}

function sendTurnedOn() {
  tabs.query({url: docsUrl}, function(docsTabs) {
    sendDataToTabs({
      turnedOn: !_.isEmpty(docsTabs)
    });
  });
}

function sendImportedModules() {
  sendDataToTabs({
    importedModules: getImportedSourceModules()
  });
}

function getInitialData(sender, actionValue, sendResponse) {
  tabs.query({url: docsUrl}, function(docsTabs) {
    sendResponse({
      context: getInitialContext(),
      lang: getSelectedLang(),
      importedModules: getImportedSourceModules(),
      turnedOn: !_.isEmpty(docsTabs),
      speechRecognizerState: {
        ...lastSpeechRecognizerState,
        text: []
      },
      settingsValues: getSettingsValues()
    });
  });
  return true;
}

function handleMessageFromContent(actions, sender, sendResponse) {
  _.each(actions, (actionValue, actionName) => {
    actionHandlers[actionName](sender, actionValue, sendResponse);
  });
  return true;
}

chrome.browserAction.onClicked.addListener(function(tab) {
  tabs.query({url: docsUrl}, function(docsTabs) {
    if (_.isEmpty(docsTabs)) {
      chrome.tabs.create({
        url: docsUrl
      }, sendTurnedOn);
    } else {
      tabs.update(docsTabs[0].id, {active: true});
    }
  });
});

chrome.runtime.onMessage.addListener(handleMessageFromContent);

chrome.tabs.onRemoved.addListener(sendTurnedOn);

sendLang();
sendSettingsValues();
sendTurnedOn();
onLanguageChange(sendLang);
onImportedModulesChange(sendImportedModules);
onContinuousModeChange();
onChangeInput(sendSettingsValues);
