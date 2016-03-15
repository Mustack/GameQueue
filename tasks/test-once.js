'use strict';
var _ = require('lodash');
var karma = require('karma');
var karmaOptions = require('../karma.conf.js').options;

function testOnce(done) {
    new karma.Server(_.defaults({singleRun: true}, karmaOptions), function(err) {
        if (err) {
            done(err);
            return;
        }

        done();
    }).start();
}

module.exports = testOnce;
