const Peer = require('peerjs');

class PeerServer {
  constructor(stream) {
    this.peer = new Peer('server', {host: window.location.hostname, port: window.location.port, path: '/peerjs'});
    this.lastState = {};
    this.connections = {};

    this.peer.on('connection', (conn) => {
      console.log('connection to ' + conn.peer);
      this.connections[conn.peer] = conn;

      // Use a timeout because immediately sending doesn't seem to work
      setTimeout(() => {
        conn.send({
          eid: 'state',
          value: this.lastState
        });
      }, 1000);
    });

    stream.subscribe((state) => {
      this.lastState = state;
      Object.keys(this.connections).forEach((name) => {
        this.connections[name].send({
          eid: 'state',
          value: state
        });
      });
    });
  }
}

module.exports = PeerServer;
