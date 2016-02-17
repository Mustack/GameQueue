import queueSvc from '../services/queue';

var exports = {};

exports.enqueue = function(request, response) {
  console.log(request.body);
  try {
    queueSvc.enqueue(request.body.username)
      .then(() => {
        response.send("Added successfully");
      })
      .catch((error) => {
        response.send(error);
      });
  } catch (e) {
    console.log(e);
  }
};

export default exports;
