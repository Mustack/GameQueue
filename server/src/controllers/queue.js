var queueSvc = require('../services/queue');

var exports = {};

exports.getQueue = function(request, response) {
  var queueOwner = request.params.queue_owner;

  queueSvc.getQueue(queueOwner)
    .then((queue) => {
      response.send(queue);
    })
    .catch((error) => {
      response.send(error);
    });
};

exports.enqueue = function(request, response) {
  var queueOwner = request.params.queue_owner;

  queueSvc.enqueue(queueOwner, request.body.username)
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      response.send(error);
    });
};

// Removes a viewer before they get to the end of the queue
exports.remove = function(request, response) {
  var queueOwner = request.params.queue_owner;
  var username = request.params.username;

  queueSvc.remove(queueOwner, username)
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      response.send(error);
    });
};

exports.dequeue = function(request, response) {
  var queueOwner = request.params.queue_owner;
  var count = Number(request.query.count) || 1;

  queueSvc.dequeue(queueOwner, count)
    .then((entries) => {
      response.send(entries);
    })
    .catch((error) => {
      response.send(error);
    });
};

module.exports = exports;
