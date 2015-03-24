(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Ship = A.Ship = function (params) {
    var allParams = {
        game: params.game,
        pos: params.pos,
        color: Ship.COLOR,
        vel: [0, 0],
        radius: Ship.RADIUS
    };

    A.MovingObject.call(this, allParams);
  };

  A.Util.inherits(Ship, A.MovingObject);

  Ship.RADIUS = 16;
  Ship.COLOR = "#837402";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel = this.addVectors(this.vel, impulse);
  };
})();
