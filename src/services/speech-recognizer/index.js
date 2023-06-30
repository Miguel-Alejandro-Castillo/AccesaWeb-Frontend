import _ from 'lodash';
import {
  getSelectedLang,
  onLanguageChange,
  onContinuousModeChange,
  removeOnContinuousModeChange,
  getContinuousMode,
  isOnRecognition
} from '../appSettings';
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
  window.chrome.runtime.onMessage.addListener(handlePostMessage);
}

function stopListenForExternalMessages() {
  window.chrome.runtime.onMessage.removeListener(handlePostMessage);
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
  window.chrome.runtime.sendMessage({
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
  if (isOnRecognition()) {
    speechRecognition.stop();
    delayedStartSpeechRecognition();
  }
}

function handleOnContinuousModeChange() {
  if (isOnRecognition()) {
    speechRecognition.stop();
    speechRecognition = getSpeechRecognition();
    delayedStartSpeechRecognition();
    if (getContinuousMode()) {
      stopListenForExternalMessages();
    } else {
      listenForExternalMessages();
    }
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

function stopp() {
  if (speechRecognition) {
    speechRecognition.stop();
    if (!getContinuousMode())
      stopListenForExternalMessages();
    removeOnContinuousModeChange(handleOnContinuousModeChange);
  }
}



export default {
  init,
  stopp
};
