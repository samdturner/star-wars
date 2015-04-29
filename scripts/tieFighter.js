(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var TieFighter = A.TieFighter = function (params) {
    var allParams =
  {
    game: params.game,
    pos: params.pos,
    angle: this.randAngle(),
    radius: TieFighter.RADIUS
  };

  A.EnemyShip.call(this, allParams);

  this.vec = this.newVector(3);

  var img = new Image();
  img.src = 'assets/tie_fighter.png'
  this.imgParams = {
    img: img,
    width: 50,
    height: 50
  };

  this.healthPts = 1;
  this.scoreValue = 5000;
};

A.Util.inherits(TieFighter, A.EnemyShip);

TieFighter.RADIUS = 20;

TieFighter.prototype.changeRotation = function () {
  this.angle *= this.randomNum(0.8);
};

TieFighter.prototype.randAngle = function () {
  return 360 * Math.random();
};
})();
