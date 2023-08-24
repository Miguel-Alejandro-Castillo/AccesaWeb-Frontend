import { isMedia } from '../element_selectors';

const enHtmlExample = `
  <p>
    Use the command "select", "select video", "select audio" o "select media" over one of the following media content
  </p>
  <h4>Audio</h4>
  <p class="box">
    <audio controls>
      <source src="/docs-assets/media/audio.mp3" type="audio/mpeg">
    </audio>
  </p>
  <h4>Video</h4>
  <p class="box">
    <video width="320" height="240" controls>
      <source src="/docs-assets/media/video.mp4" type="video/mp4">
    </video>
  </p>`;

const esHtmlExample = `
  <p>
    Usar el comando "seleccionar", "seleccionar video", "seleccionar audio" o "seleccionar multimedia" sobre uno de los siguientes contenidos multimedia
  </p>
  <h4>Audio</h4>
  <p class="box">
    <audio controls>
      <source src="/docs-assets/media/audio.mp3" type="audio/mpeg">
    </audio>
  </p>
  <h4>Video</h4>
  <p class="box">
    <video width="320" height="240" controls>
      <source src="/docs-assets/media/video.mp4" type="video/mp4">
    </video>
  </p>`;


const defaultLapse = 30;

const timeLapses = [{
  name: 'thirty seconds',
  time: 30
}, {
  name: 'one minute',
  time: 60
}, {
  name: 'three minutes',
  time: 3 * 60
}, {
  name: 'five minutes',
  time: 5 * 60
}, {
  name: 'ten minutes',
  time: 10 * 60
}, {
  name: 'fifteen minutes',
  time: 15 * 60
}, {
  name: 'twenty minutes',
  time: 20 * 60
}, {
  name: 'thirty minutes',
  time: 30 * 60
}, {
  name: 'forty five minutes',
  time: 45 * 60
}, {
  name: 'sixty minutes',
  time: 60 * 60
}, {
  name: 'one hour',
  time: 60 * 60
}];

const translations = {
  'thirty seconds': 'treinta segundos',
  'one minute': 'un minuto',
  'three minutes': 'tres minutos',
  'five minutes': 'cinco minutos',
  'ten minutes': 'diez minutos',
  'fifteen minutes': 'quince minutos',
  'twenty minutes': 'veinte minutos',
  'thirty minutes': 'treinta minutos',
  'forty five minutes': 'cuarenta y cinco minutos',
  'sixty minutes': 'sesenta minutos',
  'one hour': 'una hora'
};

function getTimeLapseInEs(time) {
  return translations[time] || time;
}

function play(state) {
  state.selectedElement.play();
}

function pause(state) {
  state.selectedElement.pause();
}

function stop(state) {
  pause(state);
  state.selectedElement.currentTime = 0;
}

function unmute(state) {
  state.selectedElement.volume = state.unmute;
  return {};
}

function mute(state) {
  let newState;
  if (state.selectedElement.volume > 0) {
    newState = {
      unmute: state.selectedElement.volume
    };
    state.selectedElement.volume = 0;
  } else {
    newState = unmute(state);
  }
  return newState;
}

function volumeUp(state) {
  let newVolume = state.selectedElement.volume + 0.25;
  if (newVolume > 1) {
    newVolume = 1;
  }
  state.selectedElement.volume = newVolume;
}

function volumeDown(state) {
  let newVolume = state.selectedElement.volume - 0.25;
  if (newVolume < 0) {
    newVolume = 0;
  }
  state.selectedElement.volume = newVolume;
  return {
    unmute: 0.50
  };
}

function rewind(state, time = defaultLapse) {
  let currentTime = state.selectedElement.currentTime - time;
  if (currentTime < 0) {
    currentTime = 0;
  }
  state.selectedElement.currentTime = currentTime;
}

function forward(state, time = defaultLapse) {
  let currentTime = state.selectedElement.currentTime + time;
  if (currentTime > state.selectedElement.duration) {
    currentTime = state.selectedElement.duration;
  }
  state.selectedElement.currentTime = currentTime;
}

function rewindActions() {
  return timeLapses.map(timeLapse => ({
    name: `i18n-command.rewind-${timeLapse.name}`,
    help: `i18n-help.rewind-${timeLapse.name}`,
    action: state => rewind(state, timeLapse.time),
    group: 'i18n-group.rewind'
  }));
}

function rewindI18nEn() {
  const map = {};
  timeLapses.forEach(timeLapse => {
    map[`command.rewind-${timeLapse.name}`] = `rewind ${timeLapse.name}`;
    map[`help.rewind-${timeLapse.name}`] = `Rewind media ${timeLapse.name}`;
  });
  return map;
}

function rewindI18nEs() {
  const map = {};
  timeLapses.forEach(timeLapse => {
    map[`command.rewind-${timeLapse.name}`] = `rebobinar ${getTimeLapseInEs(timeLapse.name)}`;
    map[`help.rewind-${timeLapse.name}`] = `Rebobinar ${getTimeLapseInEs(timeLapse.name)}`;
  });
  return map;
}

function forwardActions() {
  return timeLapses.map(timeLapse => ({
    name: `i18n-command.forward-${timeLapse.name}`,
    help: `i18n-help.forward-${timeLapse.name}`,
    action: state => forward(state, timeLapse.time),
    group: 'i18n-group.forward'
  }));
}

function forwardI18nEn() {
  const map = {};
  timeLapses.forEach(timeLapse => {
    map[`command.forward-${timeLapse.name}`] = `forward ${timeLapse.name}`;
    map[`help.forward-${timeLapse.name}`] = `Forward media ${timeLapse.name}`;
  });
  return map;
}

function forwardI18nEs() {
  const map = {};
  timeLapses.forEach(timeLapse => {
    map[`command.forward-${timeLapse.name}`] = `adelantar ${getTimeLapseInEs(timeLapse.name)}`;
    map[`help.forward-${timeLapse.name}`] = `Adelantar ${getTimeLapseInEs(timeLapse.name)}`;
  });
  return map;
}

function handleSwitchOnSelectElement(state) {
  return isMedia(state.selectedElement);
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-music',
  contexts: [{
    context: 'media',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: 'i18n-command.play',
      action: play,
      help: 'i18n-help.play',
      group: 'i18n-group.play'
    }, {
      name: 'i18n-command.pause',
      help: 'i18n-help.pause',
      action: pause,
      group: 'i18n-group.pause'
    }, {
      name: 'i18n-command.stop',
      action: stop,
      help: 'i18n-help.stop',
      group: 'i18n-group.stop'
    }, {
      name: 'i18n-command.mute',
      action: mute,
      help: 'i18n-help.mute',
      group: 'i18n-group.mute'
    }, {
      name: 'i18n-command.volume-up',
      action: volumeUp,
      help: 'i18n-help.volume-up',
      group: 'i18n-group.volume-up'
    }, {
      name: 'i18n-command.volume-down',
      action: volumeDown,
      help: 'i18n-help.volume-down',
      group: 'i18n-group.volume-down'
    }, {
      name: 'i18n-command.rewind',
      help: 'i18n-help.rewind',
      action: state => rewind(state),
      group: 'i18n-group.rewind'
    }, {
      name: 'i18n-command.forward',
      action: state => forward(state),
      help: 'i18n-help.forward',
      group: 'i18n-group.forward'
    },
      ...rewindActions(),
      ...forwardActions()
    ],
    i18n: {
      en: {
        'name': 'Media Actions',
        'command.play': 'play',
        'help.play': 'Play media',
        'group.play': 'Control media content',
        'command.pause': 'pause',
        'help.pause': 'Pause media',
        'group.pause': 'Control media content',
        'command.stop': 'stop',
        'help.stop': 'Stop media',
        'group.stop': 'Control media content',
        'command.mute': 'mute',
        'help.mute': 'Mutes media',
        'group.mute': 'Control volume',
        'command.volume-up': 'volume up',
        'help.volume-up': 'Increases volume level',
        'group.volume-up': 'Control volume',
        'command.volume-down': 'volume down',
        'help.volume-down': 'Decreases volume level',
        'group.volume-down': 'Control volume',
        'command.rewind': 'rewind',
        'help.rewind': 'Rewind media 30 seconds',
        'group.rewind': 'Control media content',
        'command.forward': 'forward',
        'help.forward': 'Forward media 30 seconds',
        'group.forward': 'Control media content',
        'play': 'Play',
        'pause': 'Pause',
        'stop': 'Stop',
        'mute': 'Mute',
        'volume-up': 'Volume Up',
        'volume-down': 'Volume Down',
        'rewind': 'Rewind',
        'forward': 'Forward',
        'exit': 'Exit',
        'html-example': enHtmlExample,
        ...rewindI18nEn(),
        ...forwardI18nEn()
      },
      es: {
        'name': 'Opciones de multimedia',
        'command.play': 'reproducir',
        'help.play': 'Reproducir',
        'group.play': 'Control de contenido',
        'command.pause': 'pausar',
        'help.pause': 'Pausar',
        'group.pause': 'Control de contenido',
        'command.stop': 'parar',
        'help.stop': 'Parar',
        'group.stop': 'Control de contenido',
        'command.mute': 'silencio',
        'help.mute': 'Silenciar',
        'group.mute': 'Control de volumen',
        'command.volume-up': 'subir volumen',
        'help.volume-up': 'Incrementar volumen',
        'group.volume-up': 'Control de volumen',
        'command.volume-down': 'bajar volumen',
        'help.volume-down': 'Disminuir volumen',
        'group.volume-down': 'Control de volumen',
        'command.rewind': 'rebobinar',
        'help.rewind': 'Rebobinar 30 segundos',
        'group.rewind': 'Control de contenido',
        'command.forward': 'adelantar',
        'help.forward': 'Adelantar  30 segundos',
        'group.forward': 'Control de contenido',
        'play': 'Reproducir',
        'pause': 'Pausar',
        'stop': 'Parar',
        'mute': 'Silencio',
        'volume-up': 'Subir volumen',
        'volume-down': 'Bajar volumen',
        'rewind': 'Rebobinar',
        'forward': 'Adelantar',
        'exit': 'Salir',
        'html-example': esHtmlExample,
        ...rewindI18nEs(),
        ...forwardI18nEs()
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Media Options',
      'description': 'After select a video or a sound player it allows you to perform several actions'
    },
    es: {
      'name': 'Opciones de Multimedia',
      'description': 'Luego de seleccionar un video o un reproductor de sonido habilita a realizar varias acciones'
    }
  }
};
