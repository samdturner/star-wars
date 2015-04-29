(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var currentlyPressed = A.currentlyPressed = {};

  addEventListener('keydown', function (event) {
    A.currentlyPressed[event.keyCode] = true;
  }, false);

  addEventListener('keyup', function (event) {
    delete A.currentlyPressed[event.keyCode];
  }, false);
})();
