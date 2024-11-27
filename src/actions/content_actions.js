import $ from 'jquery';

const chrome = window.chrome;

const CLASS_ARIA_ADDED = 'aria-added-aw';

const socialNetworks = ['facebook', 'twitter', 'whatsapp', 'youtube', 'instagram', 'telegram', 'linkedin', 'qzone', 'pinterest', 'badoo', 'tiktok', 'github'];

function showHideImages(param) {
  param ? showImages() : hideImages();
}

function showHideAds(param) {
  param ? showAds() : hideAds();
}

function showHideSocialNetworks(param) {
  param ? showSocialNetworks() : hideSocialNetworks();
}

// Función para cambiar el alineamiento de texto en todos los elementos que contienen texto
function changeTextAlign(param) {
  // Seleccionar todos los elementos
  $('*').filter(function() {
    // Verificar si el elemento contiene texto no vacío
    return $(this).text().trim().length > 0;
  }).each(function() {
    // Almacenar el valor original de text-align si no está ya almacenado
    if (!$(this).data('original-text-align')) {
      $(this).data('original-text-align', $(this).css('text-align'));
    }
    // Cambiar el alineamiento de texto
    $(this).css('text-align', param === 'none' ? $(this).data('original-text-align') : param);
  });
}

// Función para cambiar el tipo de fuente en todos los elementos que contienen texto
function changeFont(param) {
  // Seleccionar todos los elementos
  $('*').filter(function() {
    // Verificar si el elemento contiene texto no vacío
    return $(this).text().trim().length > 0;
  }).each(function() {
    // Almacenar el valor original de font-family si no está ya almacenado
    if (!$(this).data('original-font-family')) {
      $(this).data('original-font-family', $(this).css('font-family'));
    }
    // Cambiar el tipo de fuente
    $(this).css('font-family', param === 'none' ? $(this).data('original-font-family') : param);
  });
}

function changeFontSize(param) {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // Obtener el tamaño de fuente del elemento raíz
  $('body *').filter(function() {
    return $(this).text().trim().length > 0;
  }).each(function() {
    if (!$(this).data('original-font-size')) {
      $(this).data('original-font-size', $(this).css('font-size'));
    }

    const originalFontSize = parseFloat($(this).data('original-font-size')) / rootFontSize;

    const newFontSize = (originalFontSize * param) / 100;

    $(this).css('font-size', param === 'none' ? $(this).data('original-font-size') : newFontSize + 'rem');
  });
}

function changeLineSpacing(param) {
  $('body,p,span,div,main,article,section,header,footer,aside,nav,h1,h2,h3,h4,h5,h6').filter(function() {
    return $(this).text().trim().length > 0;
  }).each(function() {
    const elem = $(this);
    if (!elem.data('original-line-height')) {
      elem.data('original-line-height', elem.css('line-height'));
    }
    elem.css('line-height', param === 'none' ? elem.data('original-line-height') : param + 'em');
  });
}

function changeParagraphSpacing(param) {
  $('p').filter(function() {
    return $(this).text().trim().length > 0;
  }).each(function() {
    const elem = $(this);
    if (!elem.data('original-margin-bottom')) {
      elem.data('original-margin-bottom', elem.css('margin-bottom'));
    }
    elem.css('margin-bottom', param === 'none' ? elem.data('original-margin-bottom') : param + 'em');
  });
}

function changeContrast(param) {
  const id = 'link-contrast-accesa';
  const documentElementStyle = document.documentElement.style;

  let url = window.chrome.extension.getURL('contrast.css');

  switch (param) {
  case 'blackWhite':
    documentElementStyle.setProperty('--color', 'black');
    documentElementStyle.setProperty('--background', 'white');
    documentElementStyle.setProperty('--border', 'silver');
    break;
  case 'blackYellow':
    documentElementStyle.setProperty('--color', 'black');
    documentElementStyle.setProperty('--background', 'yellow');
    documentElementStyle.setProperty('--border', 'gold');
    break;
  case 'yellowBlack':
    documentElementStyle.setProperty('--color', 'yellow');
    documentElementStyle.setProperty('--background', 'black');
    documentElementStyle.setProperty('--border', '#333');
    break;
  case 'whiteBlack':
    documentElementStyle.setProperty('--color', 'white');
    documentElementStyle.setProperty('--background', 'black');
    documentElementStyle.setProperty('--border', 'grey');
    break;
  case 'none':
    documentElementStyle.removeProperty('--color');
    documentElementStyle.removeProperty('--background');
    documentElementStyle.removeProperty('--border');
    url = '';
    break;
  }

  if (url) {
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement('link');
      style.rel = 'stylesheet';
      style.id = id;
      style.type = 'text/css';
      (document.head || document.documentElement).appendChild(style);
    }
    style.href = url;
  } else {
    $('#' + id).prop('disabled', true);
    $('#' + id).remove();
  }
}

function showImages() {
  $('img').show();
  $('[style*="url("]').filter(function() {
    var style = $(this).attr('style');
    return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
  }).show();
  $('svg').show();
  $('canvas').show();
  $('iframe').each(function() {
    var iframe = $(this);
    var iframeContent = iframe.contents();
    iframeContent.find('img').show();
    iframeContent.find('[style*="url("]').filter(function() {
      var style = $(this).attr('style');
      return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
    }).show();
    iframeContent.find('svg').show();
    iframeContent.find('canvas').show();
  });
}

function hideImages() {
  $('img').hide();
  $('[style*="url("]').filter(function() {
    var style = $(this).attr('style');
    return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
  }).hide();
  $('svg').hide();
  $('canvas').hide();
  $('iframe').each(function() {
    var iframe = $(this);
    var iframeContent = iframe.contents();
    iframeContent.find('img').hide();
    iframeContent.find('[style*="url("]').filter(function() {
      var style = $(this).attr('style');
      return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
    }).hide();
    iframeContent.find('svg').hide();
    iframeContent.find('canvas').hide();
  });
}

function showAds() {
  $("ins[class='adsbygoogle'],a[href*='ads.e-planning.net'],a[href*='adclick.g.doubleclick.net'],div[id*='google_ads_iframe']").show();
}

function hideAds() {
  $("ins[class='adsbygoogle'],a[href*='ads.e-planning.net'],a[href*='adclick.g.doubleclick.net'],div[id*='google_ads_iframe']").hide();
}

function showSocialNetworks() {
  $("a[href]:not([href=''])").filter(function() {
    let hrefValue = $(this).attr('href');
    hrefValue = hrefValue.toLowerCase();
    return socialNetworks.some(function(socialNetwork) {
      return hrefValue.includes(socialNetwork);
    });
  }).show();
}

function hideSocialNetworks() {
  $("a[href]:not([href=''])").filter(function() {
    let hrefValue = $(this).attr('href');
    hrefValue = hrefValue.toLowerCase();
    return socialNetworks.some(function(socialNetwork) {
      return hrefValue.includes(socialNetwork);
    });
  }).hide();
}

function enableDisableAccesibilityHTML(param) {
  param ? enableAccesibilityHTML() : disableAccesibilityHTML();
}

function addAriaAttribute(selector, attribute, value) {
  $(selector).each(function() {
    if (!$(this).attr(attribute)) {
      $(this).attr(attribute, value).addClass(CLASS_ARIA_ADDED);
    }
  });
}

function addAriaLabelIfContains(selector, regex, label) {
  $(selector).each(function() {
    const idOrClass = $(this).attr('id') || $(this).attr('class');
    if (regex.test(idOrClass) && !$(this).attr('aria-label')) {
      $(this).attr('aria-label', label).addClass(CLASS_ARIA_ADDED);
    }
  });
}

function enableAccesibilityHTML() {
  // Agregar roles ARIA a elementos específicos
  addAriaAttribute('nav:not([role]), nav[role=""]', 'role', 'navigation');
  addAriaAttribute('header:not([role]), header[role=""]', 'role', 'banner');
  addAriaAttribute('footer:not([role]), footer[role=""]', 'role', 'contentinfo');
  addAriaAttribute('main:not([role]), main[role=""]', 'role', 'main');
  addAriaAttribute('aside:not([role]), aside[role=""]', 'role', 'complementary');
  addAriaAttribute('section:not([role]), section[role=""]', 'role', 'region');
  addAriaAttribute('form:not([role]), form[role=""]', 'role', 'form');
  addAriaAttribute('article:not([role]), article[role=""]', 'role', 'article');
  addAriaAttribute('button:not([role]), button[role=""]', 'role', 'button');
  addAriaAttribute('ul:not([role]), ul[role=""]', 'role', 'list');
  addAriaAttribute('ol:not([role]), ol[role=""]', 'role', 'list');
  addAriaAttribute('li:not([role]), li[role=""]', 'role', 'listitem');
  addAriaAttribute('table:not([role]), table[role=""]', 'role', 'table');
  addAriaAttribute('th:not([role]), th[role=""]', 'role', 'columnheader');
  addAriaAttribute('td:not([role]), td[role=""]', 'role', 'cell');
  addAriaAttribute('tr:not([role]), tr[role=""]', 'role', 'row');
  addAriaAttribute('img:not([role]), img[role=""]', 'role', 'img');
  addAriaAttribute('a:not([role]), a[role=""]', 'role', 'link');

  // Agregar atributos ARIA a elementos con identificadores específicos
  addAriaLabelIfContains('[id!=""]', /captcha/i, 'captcha');

  // Agregar atributos ARIA a elementos con clases específicas
  addAriaLabelIfContains('[class!=""]', /captcha/i, 'captcha');

  // Agregar atributos ARIA a elementos de formulario
  $('input[id!=""], textarea[id!=""], select[id!=""]').each(function() {
    const id = $(this).attr('id');
    const label = $(`label[for="${id}"]`);
    if (label.length > 0 && !$(this).attr('aria-labelledby')) {
      $(this).attr('aria-labelledby', id).addClass(CLASS_ARIA_ADDED);
    }
  });

  // Agregar atributos ARIA a botones y enlaces
  $('button,a').each(function() {
    const text = $(this).text().trim();
    if (text && !$(this).attr('aria-label')) {
      $(this).attr('aria-label', text).addClass(CLASS_ARIA_ADDED);
    }
  });

  // Agregar atributos ARIA a imágenes
  $('img').each(function() {
    if (!$(this).attr('alt')) {
      $(this).attr('aria-hidden', 'true').addClass(CLASS_ARIA_ADDED);
    }
  });

  // Agregar atributos ARIA a elementos interactivos
  addAriaAttribute('[tabindex]', 'role', 'button');

  // Agregar atributos ARIA a elementos con estados
  $('[aria-expanded]').each(function() {
    const expanded = $(this).attr('aria-expanded');
    $(this).attr('aria-expanded', expanded === 'true' ? 'true' : 'false').addClass(CLASS_ARIA_ADDED);
  });

  // Agregar aria-live a elementos dinámicos
  addAriaAttribute('[data-dynamic]', 'aria-live', 'polite');

  // Agregar aria-controls a elementos que controlan otros elementos
  $('[data-controls]').each(function() {
    const controls = $(this).attr('data-controls');
    if (controls && !$(this).attr('aria-controls')) {
      $(this).attr('aria-controls', controls).addClass(CLASS_ARIA_ADDED);
    }
  });

  // Agregar aria-haspopup a elementos que abren menús o diálogos
  addAriaAttribute('[data-has-popup]', 'aria-haspopup', 'true');

  // Agregar aria-current a elementos que representan el estado actual
  addAriaAttribute('.current', 'aria-current', 'page');

  // Agregar role="alert" a elementos que muestran mensajes importantes
  addAriaAttribute('.alert', 'role', 'alert');
}

function disableAccesibilityHTML() {
  $('.' + CLASS_ARIA_ADDED).each(function() {
    $(this).removeAttr('role')
      .removeAttr('aria-label')
      .removeAttr('aria-labelledby')
      .removeAttr('aria-hidden')
      .removeAttr('aria-expanded')
      .removeAttr('aria-live')
      .removeAttr('aria-controls')
      .removeAttr('aria-haspopup')
      .removeAttr('aria-current')
      .removeClass(CLASS_ARIA_ADDED);
  });
}

// Mapeo de acciones a funciones
export const actionMap = {
  showImages: showHideImages,
  showAds: showHideAds,
  showSocialNetworks: showHideSocialNetworks,
  changeTextAlign: changeTextAlign,
  changeFont: changeFont,
  changeFontSize: changeFontSize,
  changeLineSpacing: changeLineSpacing,
  changeParagraphSpacing: changeParagraphSpacing,
  changeContrast: changeContrast,
  enableAccesibilityHTML: enableDisableAccesibilityHTML
};

export const USER_SETTINGS_DEFAULT = {
  userSettings: {
    showImages: true,
    showAds: true,
    showSocialNetworks: true,
    changeTextAlign: 'none',
    changeFont: 'none',
    changeFontSize: 'none',
    changeLineSpacing: 'none',
    changeParagraphSpacing: 'none',
    changeContrast: 'none',
    enableAccesibilityHTML: true
  }
};

export function applyUserSettings() {
  chrome.storage.local.get('userSettings', function(result) {
    if (result.userSettings) {
      console.log('User settings retrieved:', result.userSettings);
      Object.entries(actionMap).forEach(([key, value]) => {
        value(result.userSettings[key]);
        console.log(`Key: ${key}, Value: ${value}`);
      });
    } else {
      console.log('No user settings found.');
    }
  });
}