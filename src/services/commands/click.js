import _ from 'lodash';
import focusElement from '../focus_element';
import {
  clickableSelector,
  getClickableSelector,
  getVisibleElements,
  foucusableElementAfterClickSelector,
  is } from '../element_selectors';

const clickFilters = _.keys(clickableSelector);

const filterInEs = {
  button: 'botón',
  checkbox: 'opción',
  date: 'fecha',
  file: 'archivo',
  image: 'imágen',
  link: 'vínculo',
  media: 'multimedia',
  range: 'rango',
  radio: 'opción única',
  select: 'opciones',
  text: 'texto'
};

const esHtmlExample = `
  <h4>Audio</h4>
  <p class="box">
    Usar comando "click", "click audio" o "click multimedia"<br/>
    <audio controls>
      <source src="/docs-assets/media/audio.mp3" type="audio/mpeg">
    </audio>
  </p>
  <h4>Botón</h4>
  <p class="box">
    Usar comando "click" o "click botón"<br/>
    <button>Click aquí</button>
  </p>
  <h4>Opción</h4>
  <p class="box">
    Usar comando "click" o "click opción" <br />
    <input type="checkbox" /> Opción
  </p>
  <h4>Color</h4>
  <p class="box">
    Usar comando "click" o "click color" <br />
    <input type="color" />
  </p>
  <h4>Fechas</h4>
  <p class="box">
    Usar comando "click" o "click fecha"<br/>
    Seleccionar fecha <input type="date" />
  </p>
  <h4>Archivo</h4>
  <p class="box">
    Usar comando "click" o "click archivo"<br/>
    <input type="file" />
  </p>
  <h4>Imagén</h4>
  <p class="box">
    Usar comando "click" o "click imágen"<br/>
    <img src="/docs-assets/media/image.png" />
  </p>
  <h4>Vínculo</h4>
  <p class="box">
    Usar comando "click" o "click vínculo"<br/>
    <a href="#">Click aquí</a>
  </p>
  <h4>Rango</h4>
  <p class="box">
    Usar comando "click" o "click rango"<br/>
    <input type="range" width="100"/>
  </p>
  <h4>Opción única</h4>
  <p class="box">
    Usar comando "click" o "click opción única"<br/>
    <input type="radio" name="option" value="a"> Opción A<br>
    <input type="radio" name="option" value="b"> Opción B
  </p>
  <h4>Opciones</h4>
  <p class="box">
    Usar comando "click" o "click opciones"<br/>
    <select>
      <option value="a">Opción A</option>
      <option value="b">Opción B</option>
    </select>
  </p>
  <h4>Texto</h4>
  <p class="box">
    Usar comando "click" o "click texto"<br/>
    <input type="text" />
  </p>
  <h4>Video</h4>
  <p class="box">
    Usar comando "click", "click video" o "click multimedia"<br/>
    <video width="320" height="240" controls>
      <source src="/docs-assets/media/video.mp4" type="video/mp4">
    </video>
  </p>`;

const enHtmlExample = `
  <h4>Audio</h4>
  <p class="box">
    Use the command "click", "click audio" or "click media"<br/>
    <audio controls>
      <source src="/docs-assets/media/audio.mp3" type="audio/mpeg">
    </audio>
  </p>
  <h4>Button</h4>
  <p class="box">
    Use the command "click" or "click botón"<br/>
    <button>Click here</button>
  </p>
  <h4>Checkbox</h4>
  <p class="box">
    Use the command "click" or "click checkbox" <br />
    <input type="checkbox" /> Opción
  </p>
  <h4>Color</h4>
  <p class="box">
    Use the command "click" or "click color" <br />
    <input type="color" />
  </p>
  <h4>Dates</h4>
  <p class="box">
    Use the command "click" or "click date"<br/>
    Seleccionar fecha <input type="date" />
  </p>
  <h4>File</h4>
  <p class="box">
    Use the command "click" or "click file"<br/>
    <input type="file" />
  </p>
  <h4>Image</h4>
  <p class="box">
    Use the command "click" or "click image"<br/>
    <img src="/docs-assets/media/image.png" />
  </p>
  <h4>Link</h4>
  <p class="box">
    Use the command "click" or "click link"<br/>
    <a href="#">Click here</a>
  </p>
  <h4>Range</h4>
  <p class="box">
    Use the command "click" or "click range"<br/>
    <input type="range" width="100"/>
  </p>
  <h4>Radio buttons</h4>
  <p class="box">
    Use the command "click" or "click radio"<br/>
    <input type="radio" name="option" value="a"> Radio Button A<br>
    <input type="radio" name="option" value="b"> Radio Button B
  </p>
  <h4>Select</h4>
  <p class="box">
    Use the command "click" or "click select"<br/>
    <select>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
    </select>
  </p>
  <h4>Text</h4>
  <p class="box">
    Use the command "click" or "click text"<br/>
    <input type="text" />
  </p>
  <h4>Video</h4>
  <p class="box">
    Use the command "click", "click video" or "select media"<br/>
    <video width="320" height="240" controls>
      <source src="/docs-assets/media/video.mp4" type="video/mp4">
    </video>
  </p>`;

function getFilterInEs(filter) {
  return filterInEs[filter] || filter;
}

const filterElementMap = clickFilters.map(filter => ({
  name: `i18n-command.click-${filter}`,
  help: `i18n-help.click-${filter}`,
  group: 'i18n-group.click',
  action: (state, command, background) => click(state, command, background, filter)
}));

function i18nEn() {
  const map = {};
  clickFilters.forEach(filter => {
    map[`command.click-${filter}`] = `click ${filter}`;
    map[`help.click-${filter}`] = `Executes a "click" over a ${filter}`;
  });
  return map;
}

function i18nEs() {
  const map = {};
  clickFilters.forEach(filter => {
    map[`command.click-${filter}`] = `click ${getFilterInEs(filter)}`;
    map[`help.click-${filter}`] = `Ejecuta un "click" sobre un ${getFilterInEs(filter)}`;
  });
  return map;
}

function clickOverElement(el) {
  _.delay(() => {
    el.dispatchEvent(new MouseEvent('mouseenter'));
    el.dispatchEvent(new MouseEvent('mouseover'));
    el.dispatchEvent(new MouseEvent('mousedown'));
    el.dispatchEvent(new MouseEvent('mouseup'));
    el.click();
    if (is(foucusableElementAfterClickSelector, el)) {
      focusElement(el);
    }
  }, 1000);
  return {
    selectedElement: el,
    context: 'root'
  };
}

function click(state, command, background, filter) {
  const selector = getClickableSelector(filter);
  const elements = getVisibleElements(selector);

  if (elements.length > 1) {
    return {
      context: 'pickLabel',
      labels: selector,
      selectedElementHandler: clickOverElement
    };
  } else if (elements.length === 1) {
    return clickOverElement(elements[0].el);
  }
}

function teardown({selectedElementHandler, labels}) {
  return {
    selectedElementHandler,
    labels
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-mouse-pointer',
  contexts: [{
    context: 'root',
    teardown: teardown,
    commands: [{
      name: 'i18n-command.click',
      action: click,
      help: 'i18n-help.click',
      group: 'i18n-group.click'
    }, {
      name: 'i18n-command.press',
      action: click,
      help: 'i18n-help.press',
      group: 'i18n-group.press'
    },
      ...filterElementMap
    ],
    htmlExample: 'i18n-html-example',
    i18n: {
      en: {
        'command.click': 'click',
        'help.click': 'Executes a "click" over an element',
        'group.click': 'Click something',
        'command.press': 'press',
        'help.press': 'Executes a "click" over an element',
        'group.press': 'Click something',
        'html-example': enHtmlExample,
        ...i18nEn()
      },
      es: {
        'command.click': 'click',
        'help.click': 'Ejecuta un "click" sobre algún elemento',
        'group.click': 'Click sobre algo',
        'command.press': 'presionar',
        'help.press': 'Ejecuta un "click" sobre algún elemento',
        'group.press': 'Click sobre algo',
        'html-example': esHtmlExample,
        ...i18nEs()
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Click',
      'description': 'Perform a "click" over a selected element'
    },
    es: {
      'name': 'Click',
      'description': 'Efectua un "click" sobre un elemento previamente seleccionado'
    }
  }
};
