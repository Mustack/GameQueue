/*
 * This model is for viewers, who are part of the queue.
 */
import { Schema } from 'mongoose';
import db from './index';

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

export default db.model('QueueEntry', viewerSchema);
