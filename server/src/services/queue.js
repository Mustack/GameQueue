var QE = require('../models/queueEntry');

var exports = {};

exports.enqueue = function(queueOwner, username) {
  return QE.create({queueOwner, username});

  // Todo: dispatch event that someone joined the queue
};

module.exports = exports;
