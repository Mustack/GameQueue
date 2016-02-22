var queueSvc = require('../services/queue');

var exports = {};

exports.enqueue = function(request, response) {
  var queueOwner = request.params.queue_id;
  queueSvc.enqueue(queueOwner, request.body.username)
    .then(() => {
      response.status(200).send();
    })
    .catch((error) => {
      response.send(error);
    });
};

module.exports = exports;
