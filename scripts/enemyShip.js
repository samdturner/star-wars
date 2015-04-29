(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var EnemyShip = A.EnemyShip = function (params) {
    var allParams =
  {
    game: params.game,
    pos: params.pos,
    angle: params.angle,
    radius: params.radius || null
  };

  A.MovingObject.call(this, allParams);
}

A.Util.inherits(EnemyShip, A.MovingObject);

EnemyShip.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof A.Ship && otherObject.isVulnerable){
    otherObject.laserDestroy();
    this.game.subtractLives();
  } else if (otherObject instanceof A.Laser && !otherObject.isEnemy) {
    this.healthPts--;
    this.game.remove(otherObject);
    if(this.healthPts <= 0){
      this.laserDestroy();
      this.game.addToScore(this.scoreValue);
    } else {
      this.game.addExplosion(new A.DestroyerDmgExp({
        game: this.game,
        pos: otherObject.pos,
        vec: this.vec
      }));
    }
  }
};

EnemyShip.prototype.isProbabilityTrue = function (num) {
  var rand = Math.random();
  if (rand < num) {
    return true;
  };

  return false;
};

EnemyShip.prototype.fireLaser = function (offset) {
  if(this.game.ship.length === 0){
    return false;
  }

  var width = 40;
  if(this instanceof A.StarDestroyer){
    width = 100;
  }

  this.game.addLaser(new A.Laser({
    game: this.game,
    pos: this.pos,
    angle: this.angleToxWing() + this.randomNum(offset),
    isEnemy: true,
    width: width
  }));

  return false;
};

EnemyShip.prototype.angleToxWing = function () {
  var xWing = this.game.ship[0];
  var xWingPos = this.game.getPosOf(xWing);
  var deltaY = xWingPos[1] - this.pos[1];
  var deltaX = xWingPos[0] - this.pos[0];
  return Math.atan2(deltaY, deltaX) * 180 / Math.PI;
};

EnemyShip.prototype.randomNum = function (c) {
  return (c / 2) - (Math.random() * c);
};
})();
