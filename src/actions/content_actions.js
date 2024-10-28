import $ from 'jquery';

function showImages() {
  $('img').show();
  $('[style*="url("]').filter(function() {
    var style = $(this).attr('style');
    return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
  }).show();
  $('svg').show();
  $('canvas').show();
  $('iframe').each(function () {
    var iframe = $(this);
    var iframeContent = iframe.contents();
    iframeContent.find('img').show();
    iframeContent.find('[style*="url("]').filter(function () {
      var style = $(this).attr('style');
      return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
    }).show();
    iframeContent.find('svg').show();
    iframeContent.find('canvas').show();
  });
}

function hideImages() {
  $('img').hide();
  $('[style*="url("]').filter(function () {
    var style = $(this).attr('style');
    return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
  }).hide();
  $('svg').hide();
  $('canvas').hide();
  $('iframe').each(function () {
    var iframe = $(this);
    var iframeContent = iframe.contents();
    iframeContent.find('img').hide();
    iframeContent.find('[style*="url("]').filter(function () {
      var style = $(this).attr('style');
      return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|heic|heif|raw)\b/i.test(style);
    }).hide();
    iframeContent.find('svg').hide();
    iframeContent.find('canvas').hide();
  });
}

function showAds() {

}

function hideAds() {

}

function showSocialNetworks() {

}

function hideSocialNetworks() {

}

export default {
  showImages,
  hideImages
};