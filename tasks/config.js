'use strict';

var devConfig = {
    production: false,

    server: {
        port: 8080
    },

    src: {
        js: ['./*.js', './client/**/*.js', './tasks/**/*.js', './test/**/*.js'],
        scripts: './client/**/*.js',
        tests: './test/**/*.js',
        testConfig: './karma.conf.js',
        styles: 'client/**/*.scss',
        main: 'app.js'
    },

    dest: {
      root: './build'
    }
};

module.exports = devConfig;
