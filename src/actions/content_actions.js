import $ from 'jquery';

const chrome = window.chrome;

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
  //Falta revisar como se guarda esto
  localStorage.setItem('input.name.hideImages', 'true');
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
  //localStorage.setItem('input.name.hideImages', 'false');
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
  //localStorage.setItem('input.name.hideImages', 'true');
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
  //localStorage.setItem('input.name.hideSocialNetworks', true);
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

function enableAccesibilityHTML() {

  // Agregar roles ARIA a elementos específicos
  $('nav:not([role]), nav[role=""]').attr('role', 'navigation');
  $('header:not([role]), header[role=""]').attr('role', 'banner');
  $('footer:not([role]), footer[role=""]').attr('role', 'contentinfo');
  $('main:not([role]), main[role=""]').attr('role', 'main');
  $('aside:not([role]), aside[role=""]').attr('role', 'complementary');
  $('section:not([role]), section[role=""]').attr('role', 'region');
  $('form:not([role]), form[role=""]').attr('role', 'form');
  $('article:not([role]), article[role=""]').attr('role', 'article');
  $('button:not([role]), button[role=""]').attr('role', 'button');
  $('ul:not([role]), ul[role=""]').attr('role', 'list');
  $('ol:not([role]), ol[role=""]').attr('role', 'list');
  $('li:not([role]), li[role=""]').attr('role', 'listitem');
  $('table:not([role]), table[role=""]').attr('role', 'table');
  $('th:not([role]), th[role=""]').attr('role', 'columnheader');
  $('td:not([role]), td[role=""]').attr('role', 'cell');
  $('tr:not([role]), tr[role=""]').attr('role', 'row');
  $('img:not([role]), img[role=""]').attr('role', 'img');
  $('a:not([role]), a[role=""]').attr('role', 'link');

  // Agregar atributos ARIA a elementos con identificadores específicos
  $('[id!=""]').each(function() {
    const id = $(this).attr('id');
    if (/captcha/i.test(id)) { // Verifica si el id contiene la palabra "captcha"
      const ariaLabel = $(this).attr('aria-label');
      if (!ariaLabel) { // Verifica si el aria-label está vacío o no definido
        $(this).attr('aria-label', 'captcha');
      }
    }
  });

  // Agregar atributos ARIA a elementos con clases específicas
  $('[class!=""]').each(function() {
    const clazz = $(this).attr('class');
    if (/captcha/i.test(clazz)) { // Verifica si el class contiene la palabra "captcha"
      const ariaLabel = $(this).attr('aria-label');
      if (!ariaLabel) { // Verifica si el aria-label está vacío o no definido
        $(this).attr('aria-label', 'captcha');
      }
    }
  });

  // Agregar atributos ARIA a elementos de formulario
  $('input[id!=""], textarea[id!=""], select[id!=""]').each(function() {
    const id = $(this).attr('id');
    const label = $(`label[for="${id}"]`);
    if (label.length > 0) {
      const ariaLabelledBy = $(this).attr('aria-labelledby');
      if (!ariaLabelledBy) { // Verifica si el aria-labelledby está vacío o no definido
        $(this).attr('aria-labelledby', id);
      }
    }
  });

  // Agregar atributos ARIA a botones y enlaces
  $('button,a').each(function() {
    const text = $(this).text().trim();
    if (text) {
      const ariaLabel = $(this).attr('aria-label');
      if (!ariaLabel) { // Verifica si el aria-label está vacío o no definido
        $(this).attr('aria-label', text);
      }
    }
  });

  // Agregar atributos ARIA a imágenes
  $('img').each(function() {
    const alt = $(this).attr('alt');
    if (!alt) {
      $(this).attr('aria-hidden', 'true');
    }
  });

  // Agregar atributos ARIA a elementos interactivos
  $('[tabindex]').each(function() {
    const role = $(this).attr('role');
    if (!role) { // Verifica si el role está vacío o no definido
      $(this).attr('role', 'button');
    }
  });

  // Agregar atributos ARIA a elementos con estados
  $('[aria-expanded]').each(function() {
    const expanded = $(this).attr('aria-expanded');
    if (expanded === 'true') {
      $(this).attr('aria-expanded', 'true');
    } else {
      $(this).attr('aria-expanded', 'false');
    }
  });

  // Agregar atributos ARIA a elementos con descripciones
  /* A efectos practicos esta logica no hace nada
  $('[aria-describedby]').each(function() {
    const describedby = $(this).attr('aria-describedby');
    if (describedby) {
      $(this).attr('aria-describedby', describedby);
    }
  });
  */

  // Agregar aria-live a elementos dinámicos
  $('[data-dynamic]').each(function() {
    const ariaLive = $(this).attr('aria-live');
    if (!ariaLive) { // Verifica si el aria-live está vacío o no definido
      $(this).attr('aria-live', 'polite');
    }
  });

  // Agregar aria-controls a elementos que controlan otros elementos
  $('[data-controls]').each(function() {
    const controls = $(this).attr('data-controls');
    if (controls) {
      const ariaControls = $(this).attr('aria-controls');
      if (!ariaControls) { // Verifica si el aria-controls está vacío o no definido
        $(this).attr('aria-controls', controls);
      }
    }
  });

  // Agregar aria-haspopup a elementos que abren menús o diálogos
  $('[data-has-popup]').each(function() {
    const ariaHasPopup = $(this).attr('aria-haspopup');
    if (!ariaHasPopup) { // Verifica si el aria-haspopup está vacío o no definido
      $(this).attr('aria-haspopup', 'true');
    }
  });

  // Agregar aria-current a elementos que representan el estado actual
  $('.current').each(function() {
    const ariaCurrent = $(this).attr('aria-current');
    if (!ariaCurrent) { // Verifica si el aria-current está vacío o no definido
      $(this).attr('aria-current', 'page');
    }
  });

  // Agregar role="alert" a elementos que muestran mensajes importantes
  $('.alert').each(function() {
    const role = $(this).attr('role');
    if (!role) { // Verifica si el role está vacío o no definido
      $(this).attr('role', 'alert');
    }
  });
}

function disableAccesibilityHTML() {
}


/*
export default {
  showImages,
  hideImages,
  showAds,
  hideAds,
  showSocialNetworks,
  hideSocialNetworks,
  changeAlign,
  changeFont,
  changeFontSize,
  changeLineSpacing,
  changeParagraphSpacing,
  changeContrast
};
*/

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