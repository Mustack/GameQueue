'use strict';

var config = require('./config');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpack.config.js');

var open = require('open');

function serve() {
    // Add some development configuration options
    var devConfig = Object.create(webpackConfig);
    devConfig.devtool = 'inline-source-map';
    devConfig.debug = true;

    // Start a webpack-dev-server
    var server = new WebpackDevServer(webpack(devConfig), {
        contentBase: config.dest,
        publicPath: devConfig.output.publicPath,

        stats: {
            colors: true
        },
        hot: true,
        noInfo: true
    });

    server.listen(config.server.port, 'localhost', function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:' + config.server.port + '/webpack-dev-server/index.html');

        open('http://localhost:' + config.server.port);
    });
}

serve.depends = ['watch'];

module.exports = serve;
