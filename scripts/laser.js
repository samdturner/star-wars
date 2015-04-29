(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Laser = A.Laser = function (params) {
    var allParams = {
      game: params.game,
      pos: params.pos,
      color: Laser.COLOR,
      radius: Laser.RADIUS,
      angle: params.angle,
      isEnemy: params.isEnemy
    };

    A.MovingObject.call(this, allParams);
    this.vec = this.newVector(30);

    var img = new Image();
    if(this.isEnemy){
      img.src = 'assets/green_laser.png';
    } else {
      img.src = 'assets/red_laser.png';
    }

    this.imgParams = {
      img: img,
      width: params.width,
      height: params.width / 4
    };
  };

  A.Util.inherits(Laser, A.MovingObject);

  Laser.RADIUS = 8;
  Laser.COLOR = "#837402";

  Laser.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof A.EnemyShip && !this.isEnemy){
      this.game.remove(otherObject);
    }
  };

  Laser.prototype.isWrappable = function () {
    return false;
  };
})();
