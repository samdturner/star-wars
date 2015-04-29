(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var MovingObject = A.MovingObject = function (params) {
    this.game = params.game;
    this.pos = params.pos;
    this.vec = params.vec || null;
    this.radius = params.radius || null;
    this.angle = params.angle || null;
    this.isEnemy = params.isEnemy || null;
  };

  MovingObject.prototype.draw = function(ctx) {
    var x = this.pos[0] - this.imgParams.width / 2;
    var y = this.pos[1] - this.imgParams.height / 2;

    ctx.drawImage(
      this.imgParams.img,
      x,
      y,
      this.imgParams.width,
      this.imgParams.height
    );
  };

  MovingObject.prototype.drawRotatedImg = function(ctx) {
    ctx.save();

    var x = this.pos[0];
    var y = this.pos[1];

    ctx.translate(x, y);
    ctx.rotate(this.angle * Math.PI/180);
    ctx.translate(-x, -y);
    this.draw(ctx);
    ctx.restore();
  };

  MovingObject.prototype.newVector = function (c) {
    var x = c * Math.cos(this.angle * Math.PI/180);
    var y = c * Math.sin(this.angle * Math.PI/180);
    return [x, y];
  };

  MovingObject.prototype.move = function () {
    if(this instanceof A.Ship) {
      this.slowDown();
      this.usePendingRotation();
    }

    if(this instanceof A.TieFighter) {
      if(this.isProbabilityTrue(0.5)) {

        this.changeRotation();
      }
    }

    this.pos = this.addVectors(this.pos, this.vec);
    if(this.game.isOutOfBounds(this.pos)) {
      if(this.isWrappable()) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
  };

  MovingObject.prototype.addVectors = function (vec1, vec2) {
    var newVec = [];
    for(var i = 0; i < vec1.length; i++){
      newVec.push(vec1[i] + vec2[i]);
    }

    return newVec;
  };

  MovingObject.prototype.distanceFrom = function (otherObject) {
    return Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
                      Math.pow((this.pos[1] - otherObject.pos[1]), 2));
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    return (this.distanceFrom(otherObject) <= this.radius + otherObject.radius);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };

  MovingObject.prototype.isWrappable = function () {
    return true;
  };

  MovingObject.prototype.laserDestroy = function () {
    var soundFilePath = 'assets/sounds/small_explosion.mp3'
    var width = 80;
    if(this instanceof A.StarDestroyer){
      width = 250;
      soundFilePath = 'assets/sounds/star_destroyer_explosion.WAV'
    }

    this.game.addExplosion(new A.DestroyerDeadExp({
      game: this.game,
      pos: this.pos,
      vec: this.vec,
      width: width
    }));

    this.game.playSound(soundFilePath);
    this.game.remove(this);
  };
})();
