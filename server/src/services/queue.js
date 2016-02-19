import QE from '../models/queueEntry';

var exports = {};

exports.enqueue = function(username) {
  return QE.create({username});
};

export default exports;
