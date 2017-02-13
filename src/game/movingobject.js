const Rx = require('rx');

const movingObject$ = Rx.Observable.interval(60000).startWith(0)
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
  });

  module.exports = movingObject$;
