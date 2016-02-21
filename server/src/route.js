var express = require('express');
var path = require('path');

var config_globals = require('./config/site-config');
var HomeController = require('./controllers/home');
var QueueController = require('./controllers/queue');

var router = express.Router();

router.all("/", HomeController.index);

router.post('/QueueEntry', QueueController.enqueue);

module.exports = router;
