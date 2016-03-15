'use strict';
var _ = require('lodash');

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

    dest: './build'
};

var productionConfig = Object.create(devConfig);
_.assign(productionConfig, {
    production: true,
    server: {
        port: 80
    }
});

module.exports = process.env.NODE_ENV === 'production' ? productionConfig : devConfig;
