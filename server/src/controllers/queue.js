var queueSvc = require('../services/queue');

var exports = {};

exports.enqueue = function(request, response) {
  var queueOwner = request.params.queue_owner;

  queueSvc.enqueue(queueOwner, request.body.username)
    .then(() => {
      response.status(200).send();
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
      response.status(200).send();
    })
    .catch((error) => {
      response.send(error);
    });
};

module.exports = exports;
