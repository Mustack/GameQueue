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
	
	var _servicesApi = __webpack_require__(12);
	
	var _servicesApi2 = _interopRequireDefault(_servicesApi);
	
	/*
	  Routes config
	 */
	
	var _route = __webpack_require__(13);
	
	var _route2 = _interopRequireDefault(_route);
	
	var app = (0, _express2['default'])();
	
	var scheme = _configSiteConfig2['default'].https_enabled ? 'https://' : 'http://';
	var api_req_url = scheme + _configSiteConfig2['default'].api_host + _configSiteConfig2['default'].url;
	
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
	  // return console.log("This Server listening on http://" + (app.get("ipaddr")) + ":" + (app.get("port")));
	};
	
	var server = app.listen(app.get('port'), app.get('ipaddr'), serverStarted);
	
	app.use(function (req, res, next) {
	  var err = undefined;
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
	
	var _lodash = __webpack_require__(2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _request = __webpack_require__(1);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _configSiteConfig = __webpack_require__(4);
	
	var _configSiteConfig2 = _interopRequireDefault(_configSiteConfig);
	
	var Api = (function () {
	  var _module = {};
	
	  var isJSON = function isJSON(str) {
	    console.log(str);
	
	    try {
	      JSON.parse(str);
	    } catch (e) {
	      console.log('JSON.parse failed!');
	      return false;
	    }
	    return true;
	  };
	
	  _module.proxy = function (req, res) {
	    var options = {};
	    var scheme = _configSiteConfig2['default'].https_enabled ? 'https://' : 'http://';
	    var api_req_url = scheme + _configSiteConfig2['default'].api_host + req.url;
	
	    options = {
	      url: api_req_url,
	      headers: {
	        "content-type": "application/json"
	      },
	      json: true,
	      method: req.method
	    };
	
	    if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
	      options = _lodash2['default'].extend(options, { body: req.body });
	    }
	
	    var r = (0, _request2['default'])(options, function (error, response, body) {
	      var errorResponse = {};
	      if (body.statusCode === 0) {
	        return res.json(200, body);
	      } else {
	        if (typeof body === 'object') {
	          errorResponse = _lodash2['default'].extend({ error: true }, body);
	        } else {
	          errorResponse = { error: true, statusMessage: JSON.stringify(body) };
	        }
	        return res.json(200, errorResponse);
	      }
	    });
	  };
	  return _module;
	})();
	
	exports['default'] = Api;
	module.exports = exports['default'];

/***/ },
/* 13 */
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
	
	var _controllersHome = __webpack_require__(14);
	
	var _controllersHome2 = _interopRequireDefault(_controllersHome);
	
	var _servicesGooglePlace = __webpack_require__(15);
	
	var _servicesGooglePlace2 = _interopRequireDefault(_servicesGooglePlace);
	
	var _servicesApi = __webpack_require__(12);
	
	var _servicesApi2 = _interopRequireDefault(_servicesApi);
	
	var router = _express2['default'].Router();
	
	router.all("/", _controllersHome2['default'].index);
	
	router.get("/maps/api/*", _servicesGooglePlace2['default'].api);
	router.get("/api/place/autocomplete", _servicesGooglePlace2['default'].autocomplete);
	router.get("/api/place/staticmap", _servicesGooglePlace2['default'].signurl);
	
	router.get("/api/*", _servicesApi2['default'].proxy);
	router.post("/api/*", _servicesApi2['default'].proxy);
	router['delete']("/api/*", _servicesApi2['default'].proxy);
	router.put("/api/*", _servicesApi2['default'].proxy);
	
	exports['default'] = router;
	module.exports = exports['default'];

/***/ },
/* 14 */
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _configSiteConfig = __webpack_require__(4);
	
	var _configSiteConfig2 = _interopRequireDefault(_configSiteConfig);
	
	var _request = __webpack_require__(1);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _urlParse = __webpack_require__(16);
	
	var _urlParse2 = _interopRequireDefault(_urlParse);
	
	var _crypto = __webpack_require__(17);
	
	var _crypto2 = _interopRequireDefault(_crypto);
	
	var _urlsafeBase64 = __webpack_require__(18);
	
	var _urlsafeBase642 = _interopRequireDefault(_urlsafeBase64);
	
	var _lodash = __webpack_require__(2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var GooglePlace = {};
	var api_key = 'AIzaSyDXV-Ok4azfGvTlW79pANsvmL3--5EVpR0';
	// Replace with your secret key & client id here
	var secret = '*****';
	var client_id = '*****';
	
	GooglePlace.api = function (req, res) {
	  var api_request_url = undefined;
	  var originalUrl = req.originalUrl;
	
	  originalUrl = originalUrl.replace('/maps/api/', '');
	  api_request_url = 'https://maps.googleapis.com/maps/api/' + originalUrl;
	  api_request_url += '&key=' + api_key;
	
	  _request2['default'].get(api_request_url, function (error, response, body) {
	    if (error) {
	      res.json(200, error);
	    } else {
	      var data = JSON.parse(body);
	      res.json(200, data);
	    }
	    return;
	  });
	};
	
	GooglePlace.autocomplete = function (req, res) {
	  var input = req.query.input;
	  var path = (0, _urlParse2['default'])(req.headers.referer).pathname;
	  var currentCity = undefined,
	      cityName = undefined,
	      location = undefined,
	      filterStr = undefined;
	  var api_request_url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + input + '&key=' + api_key;
	
	  _request2['default'].get(api_request_url, function (error, response, body) {
	    if (error) {
	      res.json(200, error);
	    } else {
	      var data = JSON.parse(body);
	      res.json(200, data);
	    }
	    return;
	  });
	};
	
	// /api/place/staticmap?url=https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fstaticmap%3Fzoom%3D15%26size%3D300x200%26maptype%3Droadmap%26markers%3D12.927923%2C77.627108
	GooglePlace.signurl = function (req, res) {
	  var input_url = req.query.url;
	
	  input_url += '&client=' + client_id;
	
	  var url = (0, _urlParse2['default'])(input_url);
	
	  var url_to_sign = url.pathname + url.query;
	  var decoded_key = _urlsafeBase642['default'].decode(secret);
	
	  var signature = _crypto2['default'].createHmac('sha1', decoded_key).update(url_to_sign).digest('base64');
	  signature = signature.replace(/\+/g, '-').replace(/\//g, '_');
	  var encoded_signature = _urlsafeBase642['default'].encode(signature);
	
	  var original_url = url.protocol + '//' + url.host + url.pathname + url.query;
	
	  return res.redirect(original_url + '&signature=' + encoded_signature);
	};
	
	exports['default'] = GooglePlace;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("url-parse");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("urlsafe-base64");

/***/ }
/******/ ]);