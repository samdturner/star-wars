(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Bullet = A.Bullet = function (params) {
    var allParams = {
      game: params.game,
      pos: params.pos,
      color: Bullet.COLOR,
      radius: Bullet.RADIUS,
      angle: params.angle,
      isEnemy: params.isEnemy
    };

    A.MovingObject.call(this, allParams);
    this.vec = this.newVector(40);

    var img = new Image();
    img.src = 'assets/red_laser.png'
    this.imgParams = {
      img: img,
      width: 100,
      height: 25
    };
  };

  A.Util.inherits(Bullet, A.MovingObject);

  Bullet.RADIUS = 5;
  Bullet.COLOR = "#837402";

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof A.Asteroid && !this.isEnemy){
      this.game.remove(otherObject);
    }
  };

  Bullet.prototype.isWrappable = function () {
    return false;
  };

  Bullet.prototype.draw = function(ctx) {
    // debugger

    // save the unrotated ctx of the canvas so we can restore it later
    // // the alternative is to untranslate & unrotate after drawing
    ctx.save();
    // //
    ctx.translate(this.pos[0], this.pos[1])

    // // rotate the canvas to the specified degrees
    ctx.rotate(this.angle * Math.PI/180);

    ctx.translate(-this.pos[0], -this.pos[1])

    var x = this.pos[0] - this.imgParams.width / 2;
    var y = this.pos[1] - this.imgParams.height / 2;

    ctx.drawImage(
      this.imgParams.img,
      x,
      y,
      this.imgParams.width,
      this.imgParams.height
    );

    ctx.restore();
  };
})();
