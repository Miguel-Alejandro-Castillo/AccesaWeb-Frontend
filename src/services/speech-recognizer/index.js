import _ from 'lodash';
import {
  getSelectedLang,
  onLanguageChange,
  onContinuousModeChange,
  getContinuousMode } from '../appSettings';
import SpeechRecognitionContinuesMode from './speech-recognition-continues-mode';
import SpeechRecognitionStepMode from './speech-recognition-step-mode';
import log from 'loglevel';

if (process.env.DEVTOOLS) {
  log.enableAll();
} else {
  log.disableAll();
}

let speechRecognition;

function getSpeechRecognition() {
  return getContinuousMode() ? SpeechRecognitionContinuesMode : SpeechRecognitionStepMode;
}

function listenForExternalMessages() {
  window.chrome.extension.onMessage.addListener(handlePostMessage);
}

function stopListenForExternalMessages() {
  window.chrome.extension.onMessage.removeListener(handlePostMessage);
}

const defaultState = {
  error: null,
  final: false,
  recording: false,
  restarting: false,
  starting: false,
  text: []
};

function notifySpeechRecognizerState(state = {}) {
  window.chrome.extension.sendMessage({
    shareSpeechRecognizerState: {
      ...defaultState,
      ...state,
      lastUpdate: Date.now()
    }
  });
}

function handlePostMessage(event) {
  if (event.start) {
    speechRecognition.start();
  }
}

function delayedStartSpeechRecognition() {
  _.delay(() => {
    speechRecognition.init({
      lang: getSelectedLang(),
      notifySpeechRecognizerState
    });
    if (getContinuousMode()) {
      speechRecognition.start();
    }
  }, 1000);
}

function handleOnLanguageChange() {
  speechRecognition.stop();
  delayedStartSpeechRecognition();
}

function handleOnContinuousModeChange(continuousMode) {
  speechRecognition.stop();
  speechRecognition = getSpeechRecognition();
  delayedStartSpeechRecognition();
  if (continuousMode) {
    stopListenForExternalMessages();
  } else {
    listenForExternalMessages();
  }
}

function init() {
  speechRecognition = getSpeechRecognition();
  speechRecognition.init({
    lang: getSelectedLang(),
    notifySpeechRecognizerState
  });

  if (getContinuousMode()) {
    speechRecognition.start();
  } else {
    listenForExternalMessages();
  }
  onLanguageChange(handleOnLanguageChange);
  onContinuousModeChange(handleOnContinuousModeChange);
}

export default {
  init
};
