'use strict';
var gulp = require('gulp');
var config = require('./config');
var reloadClient = require('browser-sync').reload;

function watch() {
  gulp.watch(config.src.scripts, ['build', reloadClient]);
}

module.exports = watch;
