'use strict';

var del = require('del');
var config = require('./config');

function clean() {
    return del([config.dest.root]);
}

module.exports = clean;
