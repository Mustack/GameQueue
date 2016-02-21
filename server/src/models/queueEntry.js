/*
 * This model is for viewers, who are part of the queue.
 */
var Schema = require('mongoose').Schema;
var db = require('./index');

var viewerSchema = new Schema({
  username    : { type : String, required: true, unique: true},
  created_at  : { type : Date },
});

viewerSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now;
  }

  next();
});

module.exports = db.model('QueueEntry', viewerSchema);
