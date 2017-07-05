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

var port = 9080;

if (process.env.NODE_ENV === 'production') {
  port = 80;
}

var server = app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});

app.use('/peerjs', ExpressPeerServer(server));
