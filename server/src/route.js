import express from 'express';
import path from 'path';

import config_globals from './config/site-config';
import HomeController from './controllers/home';

var router = express.Router();

router.all("/", HomeController.index);

export default router;
