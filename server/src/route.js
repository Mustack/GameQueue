var express = require('express');
var path = require('path');

var config_globals = require('./config/site-config');
var homeController = require('./controllers/home');
var queueController = require('./controllers/queue');

var router = express.Router();

router.all("/", homeController.index);

router.post('/queue/:queue_owner/entry', queueController.enqueue);
router.delete('/queue/:queue_owner/entry/:username', queueController.remove);
router.put('/queue/:queue_owner/dequeue', queueController.dequeue);

module.exports = router;
