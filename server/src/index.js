/*
  Module dependencies.
 */
import request from 'request';
import _ from 'lodash';

import config from './config';
import site_config from './config/site-config';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import nunjucks from 'nunjucks';
import compress from 'compression';

var app = express();

/*
  Configuration
 */
app.disable("x-powered-by");
app.use(compress());

var env = process.env.NODE_ENV || "development";
config.setEnv(env);
app.set("ipaddr", config.HOSTNAME);
app.set("port", config.PORT);

nunjucks.configure('./server/views/', {
    autoescape: true,
    express: app
});

app.set("view engine", config.VIEWS_ENGINE);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), config.PUBLIC_PATH)));

app.use(logger('dev'));

app.post('/api/middleware-example/*', function (req, res, next) {
  res.on("finish", function() {
    if (res.statusCode === 200) {
      console.log('finish response 200');
    }
  });
  next();
});

/*
  Routes config
 */

import routes from './route';
app.use("/", routes);

/*
  Server startup
 */
var serverStarted = function() {
  console.log("This Server listening on http://" + (app.get("ipaddr")) + ":" + (app.get("port")));
};

var server = app.listen(app.get('port'), app.get('ipaddr'), serverStarted);

app.use(function(req, res, next) {
  var err;
  err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (env === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      data: {},
      config: site_config
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    data: {},
    config: site_config
  });
});

export default server;
