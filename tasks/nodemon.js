var gulpNodemon = require('gulp-nodemon');
var reloadClient = require('browser-sync').reload;

var called = false;

function nodemon(done) {
  gulpNodemon({
    script: './server/src/index.js',
    watch: ['./server/src']
  })
  .on('start', function() {
   // ensure start only got called once
    if (!called) { done(); }
    called = true;
  })
  .on('restart', reloadClient);
}

module.exports = nodemon;
