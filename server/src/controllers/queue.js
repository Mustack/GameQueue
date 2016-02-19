import queueSvc from '../services/queue';

var exports = {};

exports.enqueue = function(request, response) {
  queueSvc.enqueue(request.body.username)
    .then(() => {
      response.status(200).send();
    })
    .catch((error) => {
      response.send(error);
    });
};

export default exports;
