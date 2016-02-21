var QE = require('../models/queueEntry');

var exports = {};

exports.enqueue = function(username) {
  return QE.create({username});
};

module.exports = exports;
