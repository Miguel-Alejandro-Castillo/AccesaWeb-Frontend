import _ from 'lodash';
import hark from 'hark';
import log from 'loglevel';

let speechRecognizer;
let waitingForResultTimeout;
let waitingForActivityTimeout;
let audioStream;
let audioStreamSpeechEvents;
let speaking;

let stopped = false;
let notifySpeechRecognizerState = () => {};

function clearAllTimeouts() {
  clearTimeout(waitingForResultTimeout);
  clearTimeout(waitingForActivityTimeout);
}

function abortSpeechRecognizer() {
  clearAllTimeouts();
  speechRecognizer.abort();
  log.info('abortSpeechRecognizer');
  notifySpeechRecognizerState();
}

function stopSpeechRecognizer() {
  clearAllTimeouts();
  speechRecognizer.stop();
  log.info('stopSpeechRecognizer');
  notifySpeechRecognizerState();
}

function delayedStartSpeechRecognizer() {
  try {
    _.defer(startSpeechRecognizer);
  } catch (error) {
    delayedStartSpeechRecognizer();
  }
}


function stopSpeakRecognizer() {
  audioStream.getTracks().forEach(track => track.stop());
  audioStreamSpeechEvents.stop();
}

function handleOnEnd() {
  log.info('handleOnEnd');
  clearAllTimeouts();
  notifySpeechRecognizerState();
  log.info('handleOnEnd', 'restarting');
  if (!stopped) {
    notifySpeechRecognizerState({
      restarting: true
    });
    delayedStartSpeechRecognizer();
  }
}

function handleOnStart() {
  log.info('handleOnStart');
  notifySpeechRecognizerState({
    recording: true
  });
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

function handleError(event) {
  log.info('handleError', event.error);
  notifySpeechRecognizerState({
    error: event.error
  });
}

function handleWaitingForActivityTimeout() {
  if (!speaking) {
    abortSpeechRecognizer();
  }
}

function handleAudioStream(stream) {
  audioStream = stream;
  audioStreamSpeechEvents = hark(audioStream, {
    interval: 200
  });
  audioStreamSpeechEvents.on('speaking', () => {
    speaking = true;
    log.info('speaking');
  });
  audioStreamSpeechEvents.on('stopped_speaking', () => {
    speaking = false;
    clearTimeout(waitingForActivityTimeout);
    waitingForActivityTimeout = setTimeout(handleWaitingForActivityTimeout, 5000);
    log.info('stopped_speaking');
  });
}

function startSpeakRecognizer() {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: false
    })
    .then(handleAudioStream)
    .catch(err => log.error(err));
}

function startSpeechRecognizer() {
  log.info('startSpeechRecognizer');
  notifySpeechRecognizerState({
    starting: true
  });
  try {
    speechRecognizer.start();
  } catch (err) {
    log.error(err);
  }
}

function initSpeechRecognition({lang}) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  speechRecognizer = new SpeechRecognition();
  speechRecognizer.continuous = true;
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
  stopped = false;
  startSpeakRecognizer();
  startSpeechRecognizer();
}

function stop() {
  stopped = true;
  clearAllTimeouts();
  stopSpeakRecognizer();
  stopSpeechRecognizer();
}

export default {
  init,
  start,
  stop
};
