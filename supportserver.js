var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var ExpressPeerServer = require('peer').ExpressPeerServer;

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // Same as `output.publicPath` in most cases.
}));

app.use(express.static('public'));

var server = app.listen(80, function () {
  console.log("Listening on port 80!");
});

app.use('/peerjs', ExpressPeerServer(server));
