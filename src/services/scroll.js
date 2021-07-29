function getDefaultDistance($el) {
  return $el.height() * 0.9;
}

function getAnimationConfig(op, distance) {
  return [{
    scrollTop: op + distance
  }, {
    duration: 'slow',
    easing: 'swing'
  }];
}

function down($el, distance) {
  distance = distance || getDefaultDistance($el);
  $el.stop();
  $el.animate(...getAnimationConfig('+=', distance));
}

function up($el, distance) {
  distance = distance || getDefaultDistance($el);
  $el.stop();
  $el.animate(...getAnimationConfig('-=', distance));
}

function bottom($el, distance) {
  $el.stop();
  $el.animate({
    scrollTop: distance
  }, {
    duration: 'fast',
    easing: 'swing'
  });
}

function top($el) {
  $el.stop();
  $el.animate({
    scrollTop: 0
  }, {
    duration: 'fast',
    easing: 'swing'
  });
}

export default {
  up,
  down,
  bottom,
  top
};
