/*
 * This model is for viewers, who are part of the queue.
 */
var Schema = require('mongoose').Schema;
var db = require('./index');

var queueEntrySchema = new Schema({
  username    : { type : String, required: true, index: true },
  queueOwner  : { type : String, required: true, index: true },
  createdAt   : { type : Date },
});

// This will automatically add a timestamp for createdAt
queueEntrySchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

// This ensures that each combination of username and queueOwner are unique
queueEntrySchema.index({username: 1, queueOwner: 1}, {unique: true});

module.exports = db.model('QueueEntry', queueEntrySchema);
