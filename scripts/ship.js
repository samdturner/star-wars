(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Ship = A.Ship = function (params) {
    var allParams =
      {
        game: params.game,
        pos: this.centerPos(),
        radius: Ship.RADIUS,
        angle: 0,
        vec: [0, 0]
      };

    A.MovingObject.call(this, allParams);

    var img = new Image();
    img.src = 'assets/xwing.png'
    this.imgParams = {
      img: img,
      width: 50,
      height: 50
    };

    this.pendingRotation = 0;
    this.bulletCountdown = 0;
    this.isVulnerable = false;
  };


  A.Util.inherits(Ship, A.MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = "#837402";

  Ship.prototype.centerPos = function () {
    var x = canvasEl.width/2;
    var y = canvasEl.height/2;

    return [x, y];
  };

  Ship.prototype.power = function (impulse) {
    this.vec = this.addVectors(this.vec, this.newVector(1));
    return false;
  };

  Ship.prototype.fireLaser = function () {
    this.game.addLaser(new A.Laser({ game: this.game,
                                       pos: this.pos,
                                       angle: this.angle,
                                       isEnemy: false,
                                       width: 40}));
    this.game.playSound('assets/sounds/xwing_weapons.wav');
  };

  Ship.prototype.rotateClockwise = function () {
    this.pendingRotation += 7;
  };

  Ship.prototype.rotateCClockwise = function () {
    this.pendingRotation -= 7;
  };

  Ship.prototype.usePendingRotation = function () {
    this.angle += this.pendingRotation * 0.5;
    this.pendingRotation *= 0.5;
  };

  Ship.prototype.slowDown = function () {
    this.vec[0] = this.vec[0] * 0.95;
    this.vec[1] = this.vec[1] * 0.95;
  };

  Ship.prototype.collideWith = function (otherObject) {
    if(otherObject instanceof A.Laser && otherObject.isEnemy && this.isVulnerable){
      this.laserDestroy();
      this.game.remove(otherObject);
      this.game.subtractLives();
    }
  };

  Ship.prototype.update = function (pressedKeys) {
    if(this.bulletCountdown > 0){
      this.bulletCountdown--;
    }

    if (pressedKeys[38] || pressedKeys[87]) {
      this.power([0.1, 0])
    }

    if (pressedKeys[37] || pressedKeys[65]) {
      this.rotateCClockwise();
    }

    if (pressedKeys[39] || pressedKeys[68]) {
      this.rotateClockwise();
    }

    if (pressedKeys[32]) {
      if(this.bulletCountdown === 0){
        this.fireLaser();
        this.bulletCountdown = 6;
      }
    }

    this.move();
  }
})();
