import mongoose from 'mongoose';
import config from '../config/site-config.js';

var db = mongoose.createConnection(config.mongoUrl);

export default db;
