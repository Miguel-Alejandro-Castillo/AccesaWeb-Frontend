import _ from 'lodash';
import commands from './index';

import {
  selectableSelectors,
  getSelectableSelector,
  getVisibleElements } from '../element_selectors';

const selectableFilters = _.keys(selectableSelectors);

const filterInEs = {
  image: 'imagen',
  link: 'vínculo',
  media: 'multimedia',
  text: 'texto'
};

const esHtmlExample = `
  <h4>Audio</h4>
  <p class="box">
    Usar comando "seleccionar", "seleccionar audio" o "seleccionar multimedia"<br/>
    <audio controls>
      <source src="/docs-assets/media/audio.mp3" type="audio/mpeg">
    </audio>
  </p>
  <h4>Imagén</h4>
  <p class="box">
    Usar comando "seleccionar" o "seleccionar imágen"<br/>
    <img src="/docs-assets/media/image.png" />
  </p>
  <h4>Vínculo</h4>
  <p class="box">
    Usar comando "seleccionar" o "seleccionar vínculo"<br/>
    <a href="#">seleccionar este vínculo</a>
  </p>
  <h4>Texto</h4>
  <p class="box">
    Usar comando "seleccionar" o "seleccionar texto" para seleccionar esta linea de texto
  </p>
  <h4>Video</h4>
  <p class="box">
    Usar comando "seleccionar", "seleccionar video" o "seleccionar multimedia"<br/>
    <video width="320" height="240" controls>
      <source src="/docs-assets/media/video.mp4" type="video/mp4">
    </video>
  </p>`;

const enHtmlExample = `
  <h4>Audio</h4>
  <p class="box">
    Use the command "select", "select audio" or "select media"<br/>
    <audio controls>
      <source src="/docs-assets/media/audio.mp3" type="audio/mpeg">
    </audio>
  </p>
  <h4>Image</h4>
  <p class="box">
    Use the command "select" or "select image"<br/>
    <img src="/docs-assets/media/image.png" />
  </p>
  <h4>Link</h4>
  <p class="box">
    Use the command "select" or "select link"<br/>
    <a href="#">select this</a>
  </p>
  <h4>Text</h4>
  <p class="box">
    Use the command "select" or "select text" to select this text
  </p>
  <h4>Video</h4>
  <p class="box">
    Use the command "select", "select video" or "select media"<br/>
    <video width="320" height="240" controls>
      <source src="/docs-assets/media/video.mp4" type="video/mp4">
    </video>
  </p>`;

function getFilterInEs(filter) {
  return filterInEs[filter] || filter;
}

const filterElementMap = selectableFilters.map(filter => ({
  name: `i18n-command.select-${filter}`,
  help: `i18n-help.select-${filter}`,
  switchToContext: 'pickLabel',
  group: 'i18n-group.select',
  action: (state, command, background) => select(state, command, background, filter)
}));

function i18nEn() {
  const map = {};
  selectableFilters.forEach(filter => {
    map[`command.select-${filter}`] = `select ${filter}`;
    map[`help.select-${filter}`] = `Selects a ${filter} element`;
  });
  return map;
}

function i18nEs() {
  const map = {};
  selectableFilters.forEach(filter => {
    map[`command.select-${filter}`] = `seleccionar ${getFilterInEs(filter)}`;
    map[`help.select-${filter}`] = `Seleccionar un ${getFilterInEs(filter)}`;
  });
  return map;
}

function selectElement(el, state, lang) {
  return commands.getStateForSelectedElement(_.omit(state, 'labels'), el, lang);
}

function select(state, command, background, filter) {
  const selector = getSelectableSelector(filter);
  const elements = getVisibleElements(selector);

  if (elements.length > 1) {
    return {
      context: 'pickLabel',
      labels: selector,
      selectedElementHandler: selectElement
    };
  } else if (elements.length === 1) {
    return selectElement(elements[0].el, state, background.lang);
  }
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-bars',
  contexts: [{
    context: 'root',
    htmlExample: 'i18n-html-example',
    commands: [{
      name: 'i18n-command.select',
      action: select,
      help: 'i18n-help.select',
      group: 'i18n-group.select'
    },
      ...filterElementMap
    ],
    i18n: {
      en: {
        'command.select': 'select',
        'help.select': 'Useful to focus an element',
        'group.select': 'Select an element',
        'html-example': enHtmlExample,
        ...i18nEn()
      },
      es: {
        'command.select': 'seleccionar',
        'help.select': 'Selecciona el elemento indicado',
        'group.select': 'Selecciona un elemento',
        'html-example': esHtmlExample,
        ...i18nEs()
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Select',
      'description': 'This module allows you to select an element and then be able to execute commands related with the selected element'
    },
    es: {
      'name': 'Seleccionar',
      'description': 'Este módulo permite seleccionar un elemento y luego poder ejecutar opciones basadas en el elemento seleccionado'
    }
  }
};
