const Peer = require('peerjs');

class PeerClient {
  constructor() {
    this.peer = new Peer({host: window.location.hostname, port: window.location.port, path: '/peerjs'});
    this.conn = this.peer.connect('server');

    this.conn.on('open', () => {

    });

    this.dataStream = Rx.Observable.create((observer) => {
      this.conn.on('data', (data) => {
        observer.onNext(data);
      });
    });
  }

  getNamedStream(eid) {
    return this.dataStream
      .filter(data => data.eid === eid)
      .map(data => data.value);
  }
}

module.exports = PeerClient;
