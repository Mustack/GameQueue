var config = require('./tasks/config');
var webpackConfig = require('./webpack.config');

var options = {
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['mocha', 'junit'],

    junitReporter: {
        outputDir: process.env.CIRCLE_TEST_REPORTS || config.dest.root
    },

    files: [].concat(
        config.src.tests
    ),

    preprocessors: {
        './test/**/*.js': ['webpack']
    },

    webpack: webpackConfig,
    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    }

};

module.exports = function(karmaConfig) {
    karmaConfig.set(options);
};

module.exports.options = options;
