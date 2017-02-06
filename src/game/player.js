const Rx = require('rx');
const inputs = require('./keyboard');

const increments = inputs.flatMap(function (event) {
  var increment = {
    x: 0,
    y: 0
  };

  switch (event.key) {
    case 'ArrowUp':
      increment.y--;
      break;
    case 'ArrowDown':
      increment.y++;
      break;
    case 'ArrowLeft':
      increment.x--;
      break;
    case 'ArrowRight':
      increment.x++;
      break;
  }

  if (increment.x !== 0 || increment.y !== 0) {
    return Rx.Observable.just(increment);
  } else {
    return Rx.Observable.empty();
  }
});

const player = increments.scan(function (state, increment) {
  return {
    x: state.x + increment.x,
    y: state.y + increment.y,
    color: 'grey'
  };
}).startWith({
  x: 5,
  y: 5,
  color: 'grey'
});

module.exports = player;
