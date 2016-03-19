var browserSync = require('browser-sync');
var open = require('open');
var config = require('./config');

function serve() {
  browserSync.init(
    {
      baseDir: config.dest.root,
  		proxy: 'localhost:' + config.server.port,
  		open: false
  	},
    function(err, data) {
        var port = data.options.get('port');
        open('http://localhost:'+ port);
    }
  );
}

serve.depends = ['watch', 'nodemon', 'build'];

module.exports = serve;
