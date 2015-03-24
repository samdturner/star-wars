(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Asteroid = A.Asteroid = function (params) {
    var allParams =
      {
        game: params.game,
        pos: params.pos,
        color: Asteroid.COLOR,
        vel: A.Util.randomVec(Asteroid.SPEED),
        radius: Asteroid.RADIUS
      };

    A.MovingObject.call(this, allParams);
  };

  A.Util.inherits(Asteroid, A.MovingObject);

  Asteroid.COLOR = "#32cd32";
  Asteroid.RADIUS = 32;
  Asteroid.SPEED = 3.2;

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof A.Ship){
      otherObject.relocate();
    }
  };
})();
