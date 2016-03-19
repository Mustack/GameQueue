var globalConfig = require('../../../tasks/config');

var normalizePort;

var exports = {};

exports.setEnv = function(environment) {
  /*
    Common config
   */
  exports.HOSTNAME = "0.0.0.0";
  exports.PORT = globalConfig.server.port;
  exports.PUBLIC_PATH = "build";
  exports.VIEWS_ENGINE = "html";
  // exports.VIEWS_PATH = "server/views";
  exports.IMAGES_PATH = "images";

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

normalizePort = function(val) {
  var port;
  port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

module.exports = exports;
