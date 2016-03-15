'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var gulpIf = require('gulp-if');
var notifier = require('node-notifier');
var config = require('./config');

// Remember the last linting state so that we can pop-up when the linting succeeds again.
var lintErrors = false;

function lint() {
    return gulp.src(config.src.js)
        .pipe(eslint())
        .pipe(eslint.format('stylish'))
        .pipe(eslint.format(function(files) {
            var hasErrors = function(file) { return file.messages.length; };
            if (files.some(hasErrors)) {
                lintErrors = true;
                notifier.notify({
                    title: 'ESLint Errors',
                    message: 'Some errors were detected by ESLint.',
                    sound: 'Frog'
                });
            } else if (lintErrors) {
                lintErrors = false;
                notifier.notify({
                    title: 'ESLint Success',
                    message: 'Everything looks good.'
                });
            }
        }))
        .pipe(gulpIf(config.production, eslint.failAfterError()));
}

module.exports = lint;
