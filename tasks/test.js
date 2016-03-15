'use strict';
var gutil = require('gulp-util');
var karma = require('karma');
var karmaOptions = require('../karma.conf.js').options;

function test() {
    new karma.Server(karmaOptions, function(err) {
        if (err) {
            gutil.log('Error running tests, err:', err);
        }

        // Exit the process, this is most likely due to the user
        // hitting ctrl-c.
        process.exit(1);
    }).start();
}

module.exports = test;
