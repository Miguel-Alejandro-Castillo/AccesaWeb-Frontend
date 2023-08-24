import _ from 'lodash';
import log from 'loglevel';

let speechRecognizer;
let speechRecognizerStarted = false;
let notifySpeechRecognizerState = () => {};
let waitingForResultTimeout;

function handleOnStart() {
  log.info('handleOnStart');
  notifySpeechRecognizerState({
    recording: true
  });
}

function updateHandleResultTimeout(text, isFinal) {
  clearTimeout(waitingForResultTimeout);
  if (!isFinal) {
    waitingForResultTimeout = setTimeout(() => {
      log.error('result timeout');
      notifySpeechRecognizerState({
        final: true,
        text
      });
      abortSpeechRecognizer();
    }, 2000);
  }
}

function abortSpeechRecognizer() {
  speechRecognizer.abort();
  speechRecognizerStarted = false;
  log.info('abortSpeechRecognizer');
  notifySpeechRecognizerState();
}

function stopSpeechRecognizer() {
  speechRecognizer.stop();
  speechRecognizerStarted = false;
  log.info('stopSpeechRecognizer');
  clearTimeout(waitingForResultTimeout);
  notifySpeechRecognizerState();
}

function handleResult(result) {
  if (!result || !result.results) {
    return;
  }

  const recognition = result.results[result.resultIndex];
  const text = _.map(recognition, text => ({
    confidence: text.confidence,
    text: text.transcript
  }));
  log.info('handleResult');
  notifySpeechRecognizerState({
    final: recognition.isFinal,
    recording: true,
    text
  });
  updateHandleResultTimeout(text, recognition.isFinal);
}

function handleOnEnd() {
  log.info('handleOnEnd');
  speechRecognizerStarted = false;
  clearTimeout(waitingForResultTimeout);
  notifySpeechRecognizerState({});
}

function handleError(event) {
  log.info('handleError', event.error);
  notifySpeechRecognizerState({
    error: event.error
  });
}

function startSpeechRecognizer() {
  if (!speechRecognizerStarted) {
    log.info('startSpeechRecognizer');
    notifySpeechRecognizerState({
      starting: true
    });
    try {
      speechRecognizer.start();
      speechRecognizerStarted = true;
    } catch (err) {
      log.error(err);
    }
  }
}

function initSpeechRecognition({lang}) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  speechRecognizer = new SpeechRecognition();
  speechRecognizer.continuous = false;
  speechRecognizer.lang = lang;
  speechRecognizer.interimResults = true;
  speechRecognizer.maxAlternatives = 10;

  speechRecognizer.onstart = handleOnStart;
  speechRecognizer.onresult = handleResult;
  speechRecognizer.onerror = handleError;
  speechRecognizer.onend = handleOnEnd;
}

function init(config) {
  initSpeechRecognition(config);
  notifySpeechRecognizerState = config.notifySpeechRecognizerState;
}

function start() {
  startSpeechRecognizer();
}

function stop() {
  stopSpeechRecognizer();
}

export default {
  init,
  start,
  stop
};
