var path = require('path');
var webpack = require('webpack');
var config = require('./tasks/config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var bourbon = require('node-neat').includePaths.map(function(sassPath) {
  return 'includePaths[]=' + sassPath;
}).join('&');


module.exports = {
  context: path.join(__dirname, 'client'),
  entry: {
    app: [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/dev-server',
        './' + config.src.main
    ]
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(config.dest),
    publicPath: '/',
    filename: config.src.main
  },
  module: {
    loaders: [
        // {
        //     test: require.resolve('virtual-element'), loader: 'expose?$virtualElement'
        // },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?' + bourbon)
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file?name=[path][name].[ext]'
      },
      {
        test: /\.jpe?g$|\.svg$|\.png$/,
        exclude: /node_modules/,
        loader: 'file?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css')
  ],
  resolve: { fallback: path.join(__dirname, 'node_modules') },
  resolveLoader: { fallback: path.join(__dirname, 'node_modules') }
};
