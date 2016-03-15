'use strict';
var gulp = require('gulp');
var config = require('./config');

function watch() {
    gulp.watch(config.src.scripts, ['lint']);
}

watch.depends = ['lint'];

module.exports = watch;
