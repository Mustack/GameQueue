var QE = require('../models/queueEntry');
var bluebird = require('bluebird');

var exports = {};

// Todo: dispatch events for all of these actions

exports.enqueue = function(queueOwner, username) {
  return QE.create({queueOwner, username});
};

exports.remove = function(queueOwner, username) {
  return QE.remove({queueOwner, username});
};

exports.dequeue = function(queueOwner, count) {
  return QE.find({queueOwner, isWaiting: true})
    .sort({createdAt: 'desc'})
    .limit(count)
    .then((queueEntries) => {
      return bluebird.map(queueEntries, (queueEntry) => {
        queueEntry.isWaiting = false;

        return queueEntry.save();
      });
    });
};

module.exports = exports;
