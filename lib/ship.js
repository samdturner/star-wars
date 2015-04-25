(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Ship = A.Ship = function (params) {
    var allParams =
      {
        game: params.game,
        pos: this.centerPos(),
        color: Ship.COLOR,
        radius: Ship.RADIUS,
        angle: 0,
        vec: [0, 0]
      };

    A.MovingObject.call(this, allParams);

    var img = new Image();
    img.src = 'assets/xwing.png'
    this.imgParams = {
      img: img,
      width: 100,
      height: 100
    };

    this.pendingRotation = 0;
  };


  A.Util.inherits(Ship, A.MovingObject);

  Ship.RADIUS = 15;
  Ship.COLOR = "#837402";

  Ship.prototype.centerPos = function () {
    var x = canvasEl.width/2;
    var y = canvasEl.height/2;

    return [x, y];
  };

  Ship.prototype.revive = function () {
    this.pos = this.centerPos();
    this.vec = [0, 0];
    this.angle = 0;
  };

  Ship.prototype.power = function (impulse) {
    this.vec = this.addVectors(this.vec, this.newVector(1));
    return false;
  };

  Ship.prototype.fireBullet = function () {
    this.game.addBullet(new A.Bullet({ game: this.game,
                                       pos: this.pos,
                                       angle: this.angle,
                                       isEnemy: false }));
    return false;
  };

  Ship.prototype.draw = function(ctx) {
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

  Ship.prototype.rotateClockwise = function () {
    this.pendingRotation += 20;
    return false;
  };

  Ship.prototype.rotateCClockwise = function () {
    this.pendingRotation -= 20;
    return false;
  };

  Ship.prototype.usePendingRotation = function () {
    this.angle += this.pendingRotation * 0.1;
    this.pendingRotation *= 0.9;
  };

  Ship.prototype.slowDown = function () {
    this.vec[0] = this.vec[0] * 0.98;
    this.vec[1] = this.vec[1] * 0.98;
  };
})();
