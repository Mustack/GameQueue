'use strict';
var webpack = require('webpack');
var gutil = require('gulp-util');
var wpConfig = require('../webpack.config');

function build(done) {
  if (process.env.NODE_ENV === 'prod') {
    // Add some plugins for production code
    wpConfig = Object.create(webpackConfig);
    wpConfig.plugins = wpConfig.plugins.concat(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
  }

  webpack(wpConfig, function(err, stats) {
      if (err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString({
          colors: true
      }));
      done();
  });
}

build.depends = ['clean'];

module.exports = build;
