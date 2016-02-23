/*
 * This model is for viewers, who are part of the queue.
 */
var Schema = require('mongoose').Schema;
var mongooseHidden = require('mongoose-hidden')({});
var db = require('./index');

var queueEntrySchema = new Schema({
  username    : { type : String, required: true, index: true },
  queueOwner  : { type : String, required: true, index: true },
  isWaiting   : { type : Boolean, default: true },
  createdAt   : { type : Date,  default: new Date() }
});

// This ensures that each combination of username and queueOwner are unique
queueEntrySchema.index({username: 1, queueOwner: 1}, {unique: true});

// This hides the database ID and documention version information
// when querying this model so that we don't have to send that
// information to the client.
queueEntrySchema.plugin(mongooseHidden);

module.exports = db.model('QueueEntry', queueEntrySchema);
