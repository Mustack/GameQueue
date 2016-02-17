import Viewer from '../models/viewer.js';

var exports = {};

exports.enqueue = function(username) {
  return Viewer.create({username});
};

export default exports;
