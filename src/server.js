const Peer = require('peerjs');
const peer = new Peer('server', {host: window.location.hostname, port: window.location.port, path: '/peerjs'});
const Util = require('./util');

let lastState = [];
window.connections = {};

peer.on('connection', function (conn) {
  console.log('connection to ' + conn.peer);
  window.connections[conn.peer] = conn;
  setTimeout(function () { conn.send(lastState)}, 1000);
});

if (module.hot) {
  console.log('hot!');
}

const CanvasRenderer = require('./middleware/canvasrender');
const Rx = require('rx');


const playerStream = require('./game/player');
const objectStream = require('./game/objects');

const playerObjectStream = Rx.Observable.combineLatest(playerStream, objectStream, function (player, objects) {
  return Util.combine(player, objects);
});

const renderStream = Rx.Observable.interval(500)
  .map(i => i % 2)
  .map((odd) => {
    if (odd) {
      return {
        x: 20,
        y: 80,
        color: 'cyan'
      };
    } else {
      return {
        x: 80, y: 80, color: 'cyan'
      };
    }
  })
  .combineLatest(playerObjectStream, Util.combine);

renderStream.subscribe(function (objects) {
  lastState = objects;
  Object.keys(window.connections).forEach(function (name) {
    window.connections[name].send(objects);
  });
});

document.addEventListener('DOMContentLoaded', function (event) {
  const renderer = new CanvasRenderer(document.body, renderStream);
});
