/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  Module dependencies.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _request = __webpack_require__(1);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _lodash = __webpack_require__(2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _config = __webpack_require__(3);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _configSiteConfig = __webpack_require__(4);
	
	var _configSiteConfig2 = _interopRequireDefault(_configSiteConfig);
	
	var _express = __webpack_require__(5);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _path = __webpack_require__(6);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _bodyParser = __webpack_require__(7);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _cookieParser = __webpack_require__(8);
	
	var _cookieParser2 = _interopRequireDefault(_cookieParser);
	
	var _morgan = __webpack_require__(9);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _nunjucks = __webpack_require__(10);
	
	var _nunjucks2 = _interopRequireDefault(_nunjucks);
	
	var _compression = __webpack_require__(11);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	/*
	  Routes config
	 */
	
	var _route = __webpack_require__(12);
	
	var _route2 = _interopRequireDefault(_route);
	
	var app = (0, _express2['default'])();
	
	/*
	  Configuration
	 */
	app.disable("x-powered-by");
	app.use((0, _compression2['default'])());
	
	var env = process.env.NODE_ENV || "development";
	_config2['default'].setEnv(env);
	app.set("ipaddr", _config2['default'].HOSTNAME);
	app.set("port", _config2['default'].PORT);
	
	_nunjucks2['default'].configure('./server/views/', {
	  autoescape: true,
	  express: app
	});
	
	app.set("view engine", _config2['default'].VIEWS_ENGINE);
	app.use(_bodyParser2['default'].json());
	
	app.use(_bodyParser2['default'].urlencoded({
	  extended: true
	}));
	
	app.use((0, _cookieParser2['default'])());
	app.use(_express2['default']['static'](_path2['default'].join(process.cwd(), _config2['default'].PUBLIC_PATH)));
	
	app.use((0, _morgan2['default'])('dev'));
	
	app.post('/api/middleware-example/*', function (req, res, next) {
	  res.on("finish", function () {
	    if (res.statusCode === 200) {
	      console.log('finish response 200');
	    }
	  });
	  next();
	});
	app.use("/", _route2['default']);
	
	/*
	  Server startup
	 */
	var serverStarted = function serverStarted() {
	  console.log("This Server listening on http://" + app.get("ipaddr") + ":" + app.get("port"));
	};
	
	var server = app.listen(app.get('port'), app.get('ipaddr'), serverStarted);
	
	app.use(function (req, res, next) {
	  var err;
	  err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
	
	if (env === 'development') {
	  app.use(function (err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err,
	      data: {},
	      config: _configSiteConfig2['default']
	    });
	  });
	}
	
	app.use(function (err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {},
	    data: {},
	    config: _configSiteConfig2['default']
	  });
	});
	
	exports['default'] = server;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var normalizePort = undefined;
	
	var Module = {};
	
	Module.setEnv = function (environment) {
	  /*
	    Common config
	   */
	  Module.HOSTNAME = "0.0.0.0";
	  Module.PORT = normalizePort(process.env.PORT || "5000");
	  Module.PUBLIC_PATH = "public";
	  Module.VIEWS_ENGINE = "html";
	  // Module.VIEWS_PATH = "server/views";
	  Module.IMAGES_PATH = "images";
	
	  /*
	    Environment specific config
	   */
	  switch (environment) {
	    case "development":
	      return null;
	    case "testing":
	      return null;
	    case "production":
	      return null;
	    default:
	      return console.log("Unknown environment " + environment + "!");
	  }
	};
	
	/**
	 * Normalize a port into a number, string, or false.
	 */
	
	normalizePort = function (val) {
	  var port = undefined;
	  port = parseInt(val, 10);
	  if (isNaN(port)) {
	    return val;
	  }
	  if (port >= 0) {
	    return port;
	  }
	  return false;
	};
	
	exports["default"] = Module;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  /*
	    Meta config
	   */
	  page_title: "Angular ES6 Demo",
	  page_desc: "This is the page description",
	  site_domain_suffix: "",
	  page_keywords: "",
	  page_robots: "robot.txt",
	  page_image: "",
	  charset: "UTF-8",
	  favicon: "",
	
	  /*
	    API config
	   */
	  api_key: "",
	  api_host: "uat.example.in",
	  api_username: "",
	  api_password: ""
	};
	
	exports["default"] = config;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("nunjucks");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _express = __webpack_require__(5);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _path = __webpack_require__(6);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _configSiteConfig = __webpack_require__(4);
	
	var _configSiteConfig2 = _interopRequireDefault(_configSiteConfig);
	
	var _controllersHome = __webpack_require__(13);
	
	var _controllersHome2 = _interopRequireDefault(_controllersHome);
	
	var router = _express2['default'].Router();
	
	router.all("/", _controllersHome2['default'].index);
	
	exports['default'] = router;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _configSiteConfig = __webpack_require__(4);
	
	var _configSiteConfig2 = _interopRequireDefault(_configSiteConfig);
	
	var _lodash = __webpack_require__(2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var env = process.env.NODE_ENV || 'development';
	
	var Home = {};
	
	Home.index = function (request, response) {
	  var data = {};
	
	  return response.render('home.html', {
	    data: data,
	    env: env,
	    title: 'Angular ES6 Demo',
	    config: _configSiteConfig2['default'],
	    classes: 'home'
	  });
	};
	
	exports['default'] = Home;
	module.exports = exports['default'];

/***/ }
/******/ ]);