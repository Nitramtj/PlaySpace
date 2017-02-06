const Rx = require('rx');

module.exports = Rx.Observable.from([
  [
    { x: 20, y: 20, color: 'red' },
    { x: 40, y: 40, color: 'green' }
  ]
]);
