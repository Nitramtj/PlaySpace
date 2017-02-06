const Peer = require('peerjs');
const peer = new Peer({host: window.location.hostname, port: window.location.port, path: '/peerjs'});
const CanvasRenderer = require('./middleware/canvasrender');
const Rx = require('rx');

document.addEventListener('DOMContentLoaded', function (event) {
  const renderer = new CanvasRenderer(document.body, renderStream);
});

const conn = peer.connect('server');
conn.on('open', function () {
});

const renderStream = Rx.Observable.create(function (observer) {
  conn.on('data', function (data) {
    console.log('recieved');
    observer.onNext(data);
  });
});
