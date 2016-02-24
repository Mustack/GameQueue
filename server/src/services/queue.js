var QE = require('../models/queueEntry');
var bluebird = require('bluebird');
var _ = require('lodash');

var exports = {};

// Todo: dispatch events for all of these actions
exports.getQueue = function(queueOwner) {
  return QE.find({queueOwner})
    .sort({createdAt: 'asc'})
    .sort({isConfirmationPending: 'asc'})
    .then((queueEntries) => {
      return {
        owner: queueOwner,
        entries: queueEntries
      }
    });
};

exports.enqueue = function(queueOwner, username) {
  return QE.create({queueOwner, username});
};

exports.remove = function(queueOwner, username) {
  return QE.remove({queueOwner, username});
};

exports.dequeue = function(queueOwner, count) {
  return QE.find({queueOwner, isConfirmationPending: true})
    .sort({createdAt: 'asc'})
    .limit(count)
    .then((queueEntries) => {
      return bluebird.map(queueEntries, (queueEntry) => {
        queueEntry.isConfirmationPending = false;

        return queueEntry.save();
      });
    });
};

module.exports = exports;
