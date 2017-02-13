const Rx = require('rx');
const Util = require('./util');

const state$ = Rx.Observable.combineLatest(
  [
    require('./game/player'),
    require('./game/objects'),
    require('./game/movingobject'),
  ],
  Util.combine
);

Util.startServer(state$);
