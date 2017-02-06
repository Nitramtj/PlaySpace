const Rx = require('rx');

module.exports = Rx.Observable.fromEvent(document, 'keydown');
