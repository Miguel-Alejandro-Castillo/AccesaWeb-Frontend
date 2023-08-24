import _ from 'lodash';
import $ from 'jquery';

export const clickableSelector = {
  audio: ['audio'],
  button: [
    'button',
    'input[type=button]',
    'input[type=reset]',
    'input[type=submit]',
    '[role=button]',
    '[role=menuitem]',
    '[role=option]'
  ],
  checkbox: [
    'input[type=checkbox]',
    '[role=checkbox]',
    '[role=menuitemcheckbox]'
  ],
  color: ['input[type=color]'],
  date: [
    'input[type=date]',
    'input[type=time]',
    'input[type=datetime]',
    'input[type=datetime-local]',
    'input[type=month]',
    'input[type=week]'
  ],
  file: ['input[type=file]'],
  image: ['img'],
  link: [
    'a',
    '[role=link]'
  ],
  media: ['audio', 'video'],
  range: [
    'input[type=range]',
    '[role=slider]'
  ],
  radio: [
    'input[type=radio]',
    '[role=radio]',
    '[role=menuitemradio]'
  ],
  select: [
    'select',
    'keygen',
    '[role=listbox]'
  ],
  text: [
    'datalist',
    '[role=listbox]',
    'input[type=number]',
    '[role=spinbutton]',
    'input[type=email]',
    '[role=textbox]',
    '[role=searchbox]',
    '[role=combobox]',
    'input[type=password]',
    'input[type=search]',
    'input[type=tel]',
    'input[type=text]',
    'input[type=button]',
    'input[type=url]',
    'textarea',
    '[contentEditable]'
  ],
  video: ['video']
};

export const foucusableElementAfterClickSelector = _.pick(clickableSelector, [
  'audio', 'checkbox', 'color', 'date', 'file', 'media', 'range', 'radio', 'select', 'text'
]);

export const selectableSelectors = {
  audio: clickableSelector.audio,
  image: clickableSelector.image,
  link: clickableSelector.link,
  media: clickableSelector.media,
  text: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'dl', 'dt', 'li', 'dd', 'table', 'code', 'pre', 'blockquote', 'span'],
  video: clickableSelector.video
};

export function is(selectors, el) {
  return _.some(selectors, selector => {
    if (_.isArray(selector)) {
      return is(selector, el);
    }
    return el.matches(selector);
  });
}

export function isImage(el) {
  return is(selectableSelectors.image, el);
}

export function isLink(el) {
  return is(selectableSelectors.link, el);
}

export function isText(el) {
  return is(selectableSelectors.text, el);
}

export function isTextInput(el) {
  return is(clickableSelector.text, el);
}

export function isColorInput(el) {
  return is(clickableSelector.color, el);
}

export function isSelect(el) {
  return is(clickableSelector.select, el);
}

export function isMedia(el) {
  return is(clickableSelector.media, el);
}

export function isRange(el) {
  return is(clickableSelector.range, el);
}

export function isDate(el) {
  return el.matches('input[type=date]');
}

export function isDatetime(el) {
  return el.matches('input[type=datetime], input[type=datetime-local]');
}

export function isMonth(el) {
  return el.matches('input[type=month]');
}

export function isTime(el) {
  return el.matches('input[type=time]');
}

export function isWeek(el) {
  return el.matches('input[type=week]');
}

export function isMultiline(el) {
  return el.matches('textarea');
}

function isElementInViewport(rect) {
  return rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth)  &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight);
}


function isVisible({el, rect}) {
  if (!isElementInViewport(rect) ||
    !!el.getAttribute('aria-disabled') ||
    !!el.getAttribute('aria-hidden')) {
    return false;
  }

  const $el = $(el);
  const opacity = +$el.css('opacity');
  return $el.is(':visible') && $el.css('visibility') !== 'hidden' && opacity > 0;
}

export function getVisibleElements(selectors) {
  let elements = document.querySelectorAll(selectors);
  elements = _.map(elements, el => ({
    el,
    rect: el.getBoundingClientRect()
  }));
  return _.filter(elements, isVisible);
}

export function getQuerySelectorFor(selectors) {
  return _.reduce(selectors, (all, selector) => all.push(selector) && all, []).join(', ');
}

export function getClickableSelector(filter) {
  let selector = clickableSelector[filter] && clickableSelector[filter].join(', ');
  if (!selector) {
    selector = getQuerySelectorFor(clickableSelector);
  }
  return selector;
}

export function getSelectableSelector(filter) {
  let selector = selectableSelectors[filter] && selectableSelectors[filter].join(', ');
  if (!selector) {
    selector = getQuerySelectorFor(selectableSelectors);
  }
  return selector;
}

