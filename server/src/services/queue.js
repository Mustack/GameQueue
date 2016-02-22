var QE = require('../models/queueEntry');

var exports = {};

// Todo: dispatch events for all of these actions

exports.enqueue = function(queueOwner, username) {
  return QE.create({queueOwner, username});
};

exports.remove = function(queueOwner, username) {
  return QE.remove({queueOwner, username});
};

module.exports = exports;
