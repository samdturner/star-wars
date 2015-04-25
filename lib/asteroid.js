(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Asteroid = A.Asteroid = function (params) {
    var allParams =
      {
        game: params.game,
        pos: params.pos,
        color: Asteroid.COLOR,
        angle: A.Util.randAngle(),
        radius: Asteroid.RADIUS
      };

    A.MovingObject.call(this, allParams);

    this.vec = this.newVector(1);

    var img = new Image();
    img.src = 'assets/star_destroyer.jpg'
    this.imgParams = {
      img: img,
      width: 300,
      height: 180
    };
  };

  A.Util.inherits(Asteroid, A.MovingObject);

  Asteroid.COLOR = "#32cd32";
  Asteroid.RADIUS = 32;

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof A.Ship){
      otherObject.revive();
    } else if (otherObject instanceof A.Bullet && !otherObject.isEnemy){
      debugger
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

  Asteroid.prototype.draw = function (ctx) {
    var x = this.pos[0] - this.imgParams.width / 2 + 32;
    var y = this.pos[1] - this.imgParams.height / 2 + 32;

    ctx.drawImage(
      this.imgParams.img,
      x,
      y,
      this.imgParams.width,
      this.imgParams.height
    );
  };

  Asteroid.prototype.fireLaser = function () {
    this.game.addBullet(new A.Bullet({
      game: this.game,
      pos: this.pos,
      angle: this.angleToxWing() * this.randomNum(1000),
      isEnemy: true
    }));

    return false;
  };

  Asteroid.prototype.angleToxWing = function () {
    var xWing = this.game.ship;
    var xWingPos = this.game.getPosOf(xWing);
    var deltaY = xWingPos[1] - this.pos[1];
    var deltaX = xWingPos[0] - this.pos[0];
    return Math.atan(deltaY / deltaX) * 180 / Math.PI;
  };

  Asteroid.prototype.randomNum = function (c) {
    return 1 + (((Math.random() * c)  - (c / 2)) / (c * 5));
  };
})();
