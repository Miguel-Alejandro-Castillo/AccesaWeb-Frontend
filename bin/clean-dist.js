const log = require('npmlog');
log.level = 'silly';

/** run */

log.info('clean-dist', `Cleaning ...`);
const deleted = require('del').sync([
  './build/dist/*',
  './build/dist/**/*',
  './build/dist/!.git/**/*'
]);
deleted.forEach(function(e){
  console.log(e);
});
