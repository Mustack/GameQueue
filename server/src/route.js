import express from 'express';
import path from 'path';

import config_globals from './config/site-config';
import HomeController from './controllers/home';
import QueueController from './controllers/queue';

var router = express.Router();

router.all("/", HomeController.index);

router.post('/QueueEntry', QueueController.enqueue);

export default router;
