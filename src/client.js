var Peer = require('peerjs');
var peer = new Peer({host: window.location.hostname, port: window.location.port, path: '/peerjs'});

var conn = peer.connect('server');
conn.on('open', function () {
  console.log('connecion open!');
  conn.send('hi!');
});

conn.on('data', function (data) {
  document.write(data)
});
