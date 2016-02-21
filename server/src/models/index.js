var mongoose = require('mongoose');
var config = require('../config/site-config.js');

var db = mongoose.createConnection(config.mongoUrl);

module.exports = db;
