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
  }
};
