(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Game = A.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.ship = new A.Ship({ game: this });
  };

  Game.DIM_X = 1296;
  Game.DIM_Y = 810;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function () {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
      this.asteroids.push(new A.Asteroid({game: this,
                                          pos: this.randomPosition()}));
    }
  };

  Game.prototype.addBullet = function (bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.randomPosition = function () {
    var pos = [];
    pos.push(Math.floor(Math.random() * Game.DIM_X));
    pos.push(Math.floor(Math.random() * Game.DIM_Y));
    return pos;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].move();
    }
  };

  Game.prototype.wrap = function (pos) {
    if(pos[0] > Game.DIM_X){
      pos[0] -= Game.DIM_X;
    } else if(pos[0] < 0) {
      pos[0] += Game.DIM_X;
    }
    if(pos[1] > Game.DIM_Y){
      pos[1] -= Game.DIM_Y;
    } else if(pos[1] < 0) {
      pos[1] += Game.DIM_Y;
    }

    return pos;
  };

  Game.prototype.checkCollisions = function () {
    for(var i = 0; i < this.allObjects().length - 1; i++){
      for(var j = i + 1; j < this.allObjects().length; j++){
        if(this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.enemyFireLasers();
    this.checkCollisions();
  };

  Game.prototype.enemyFireLasers = function () {
    for(var i = 0; i < this.asteroids.length; i++){
      var rand = Math.random();
      if(rand < 0.005) {
        this.asteroids[i].fireLaser();
      }
    }
  };

  Game.prototype.remove = function (object) {
    if(object instanceof A.Asteroid){
      var idx = this.asteroids.indexOf(object);
      this.asteroids = this.asteroids.slice(0, idx).concat(this.asteroids.slice(idx + 1));
    } else if(object instanceof A.Bullet) {
      var idx = this.bullets.indexOf(object);
      this.bullets = this.bullets.slice(0, idx).concat(this.bullets.slice(idx + 1));
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship], this.bullets);
  };

  Game.prototype.isOutOfBounds = function (pos) {
    if(pos[0] > Game.DIM_X || pos[0] < 0){
      return true;
    } else if(pos[1] > Game.DIM_Y || pos[1] < 0) {
      return true;
    }

    return false;
  };

  Game.prototype.getPosOf = function (obj) {
    return obj.pos;
  };
})();
