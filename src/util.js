const PeerServer = require('./middleware/peerserver');
const PeerClient = require('./middleware/peerclient');
const CanvasRenderer = require('./middleware/canvasrender');

module.exports = {
  combine: function () {
    var array = [];

    for (var i = 0; i < arguments.length; i++) {
      if (Array.isArray(arguments[i])) {
        arguments[i].forEach(function (item) {
          array.push(item);
        });
      } else {
        array.push(arguments[i]);
      }
    }

    return array;
  },

  startServer: function (state$) {
    const server = new PeerServer(state$);
    document.addEventListener('DOMContentLoaded', function (event) {
      const renderer = new CanvasRenderer(document.body, state$);
    });
  },
  startClient: function () {
    const client = new PeerClient();
    const state$ = client.getNamedStream('state');
    document.addEventListener('DOMContentLoaded', function (event) {
      const renderer = new CanvasRenderer(document.body, state$);
    });
  }
};
