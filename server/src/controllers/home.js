var config = require('../config/site-config');
var _ = require('lodash');

var env = process.env.NODE_ENV || 'development';

var Home = {};

Home.index = function(request, response) {
	var data = {};

  return response.render('home.html', {
    data: data,
    env: env,
    title: 'Angular ES6 Demo',
    config: config,
    classes: 'home'
  });
};

module.exports = Home;
