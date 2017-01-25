var Peer = require('peerjs');
var peer = new Peer('server', {host: window.location.hostname, port: window.location.port, path: '/peerjs'});

window.connections = {};

peer.on('connection', function (conn) {
  console.log('connection to ' + conn.peer);
  window.connections[conn.peer] = conn;
});

if (module.hot) {
  console.log('hot!');
}
