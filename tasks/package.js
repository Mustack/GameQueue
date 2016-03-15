'use strict';

var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');
var gutil = require('gulp-util');

function pack(done) {

    // Add some plugins for production code
    var prodConfig = Object.create(webpackConfig);
    prodConfig.plugins = prodConfig.plugins.concat(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    webpack(prodConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        done();
    });
}

pack.depends = ['clean'];

module.exports = pack;
