import $ from 'jquery';

const  socialNetworks = [ 'facebook', 'twitter', 'whatsapp', 'youtube', 'instagram', 'telegram', 'linkedin', 'qzone', 'pinterest', 'badoo', 'tiktok', 'github' ];

function showHideImages(param) {
  param ? showImages() : hideImages();
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
  //Falta revisar como se guarda esto
  localStorage.setItem('input.name.hideImages', 'false');
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

}

function hideAds() {
  /* $("ins[class='adsbygoogle'],a[href*='ads.e-planning.net'],a[href*='adclick.g.doubleclick.net'],div[id*='google_ads_iframe']").each(function () {
     const elem = $(this);
     if (valueSetting === 'false')
       elem.css({ 'display': 'none', 'visibility': 'hidden' });
     else
       elem.css({ 'display': elem.data('defaultDisplay'), 'visibility': elem.data('defaultVisibility') });
   });*/
}

function showSocialNetworks() {
  localStorage.setItem('input.name.hideSocialNetworks', false);
  $("a[href!='']").filter(function() {
    let hrefValue = $(this).attr('href');
    if (hrefValue) {
      hrefValue = hrefValue.toLowerCase();
      return socialNetworks.some(function(socialNetwork) {
        return hrefValue.includes(socialNetwork);
      });
    } else {
      return false;
    }
  }).show();
}

function hideSocialNetworks() {
  localStorage.setItem('input.name.hideSocialNetworks', true);
  $("a[href!='']").filter(function() {
    let hrefValue = $(this).attr('href');
    if (hrefValue) {
      hrefValue = hrefValue.toLowerCase();
      return socialNetworks.some(function(socialNetwork) {
        return hrefValue.includes(socialNetwork);
      });
    } else {
      return false;
    }
  }).hide();
}

function changeAlign() {
  /*const elements = $('*');
  elements.removeClass('text-align-aw');
  if (valueSetting !== 'none') {
    document.documentElement.style.setProperty('--textAlign', valueSetting);
    elements.addClass('text-align-aw');
  }*/
}

function changeFont() {

}

function changeFontSize() {

}

function changeLineSpacing() {

}

function changeParagraphSpacing() {

}

function changeContrast() {

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
  'showImages': showHideImages
};