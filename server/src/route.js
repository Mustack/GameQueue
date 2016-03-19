var router = require('express').Router();

var queueController = require('./controllers/queue');

router.get('/queue/:queue_owner', queueController.getQueue)
router.post('/queue/:queue_owner/entry', queueController.enqueue);
router.delete('/queue/:queue_owner/entry/:username', queueController.remove);
router.put('/queue/:queue_owner/dequeue', queueController.dequeue);

module.exports = router;
