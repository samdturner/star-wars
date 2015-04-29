(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Game = A.Game = function () {
    this.starDestroyers = [];
    this.tieFighters = [];
    this.addInitialEnemyShips();
    this.lasers = [];
    this.ship = [];
    this.explosions = [];
    this.score = 0;
    this.thresholdAddSd = 0.001;
    this.thresholdAddTf = 0.01;
    this.lives = 3;

    this.backgroundMusic = new Audio('assets/sounds/battle_music.mp3');
    this.volume = 0;
    this.backgroundMusic.volume = this.volume;
    this.backgroundMusic.play();

    var enableVolume = document.getElementById('enable-volume');
    enableVolume.onclick = this.enableVolume.bind(this);
    this.changeZIndex('enable-volume', 1000);

    var disableVolume = document.getElementById('disable-volume');
    disableVolume.onclick = this.disableVolume.bind(this);

    document.getElementById('score-label').innerHTML = 0;
  };

  Game.DIM_X = 1296;
  Game.DIM_Y = 810;
  Game.NUM_STAR_DESTROYERS = 0;
  Game.NUM_TIE_FIGHTERS = 2;

  Game.prototype.enableVolume = function () {
    this.changeZIndex('enable-volume', -2000);
    this.changeZIndex('disable-volume', 1000);

    this.backgroundMusic.volume = 1;
    this.volume = 1;
  };

  Game.prototype.disableVolume = function () {
    this.changeZIndex('enable-volume', 1000);
    this.changeZIndex('disable-volume', -2000);

    this.backgroundMusic.volume = 0;
    this.volume = 0;
  };

  Game.prototype.respawnShip = function () {
    setTimeout(function () {
      this.addShip();
    }.bind(this), 1500);
  };

  Game.prototype.addShip = function () {
    setTimeout(function () {
      this.ship[0].isVulnerable = true;
    }.bind(this), 2000)

    this.ship.push(new A.Ship({ game: this }));
  };

  Game.prototype.subtractLives = function () {
    var idStr = "xwing-img-" + (4 - this.lives);
    document.getElementById(idStr).style.visibility = 'hidden';

    this.lives--;

    if(this.lives > 0){
      this.respawnShip();
    } else {
      this.endGame();
    }

    return false;
  };

  Game.prototype.endGame = function () {
    this.changeZIndex('enable-volume', -2000);
    this.changeZIndex('disable-volume', -2000);

    var startGameCont = document.getElementById('start-game-cont');
    startGameCont.style.zIndex = 100;

    this.backgroundMusic.pause();

    delete this;
  };

  Game.prototype.addToScore = function (num) {
    this.score += num;
    var el = document.getElementById("score-label");
    el.innerHTML = this.score;
  };

  Game.prototype.addInitialEnemyShips = function () {
    for(var i = 0; i < Game.NUM_STAR_DESTROYERS; i++){
      this.addStarDestroyer();
    }

    for(var i = 0; i < Game.NUM_TIE_FIGHTERS; i++){
      this.addTieFighter();
    }
  };

  Game.prototype.addStarDestroyer = function () {
    this.starDestroyers.push(new A.StarDestroyer({game: this,
                                                  pos: this.randStartPosX()}));
  };

  Game.prototype.addTieFighter = function () {
    this.tieFighters.push(new A.TieFighter({game: this,
                                            pos: this.randomPosition()}));
  };

  Game.prototype.addEnemyShips = function () {
    var randSd = Math.random();
    if(randSd < this.thresholdAddSd){
      this.addStarDestroyer();
    }

    var randTf = Math.random();
    if(randTf < this.thresholdAddTf){
      this.addTieFighter();
    }
  };

  Game.prototype.addLaser = function (laser) {
    this.lasers.push(laser);
  };

  Game.prototype.addExplosion = function (explosion) {
    this.explosions.push(explosion);
  };

  Game.prototype.randomPosition = function () {
    var rand = Math.random();
    if(rand < 0.5){
      return this.randStartPosX();
    }

    return this.randStartPosY();
  };

  Game.prototype.randStartPosX = function () {
    var pos = [];
    pos.push(0);
    pos.push(Math.floor(Math.random() * Game.DIM_Y));

    return pos;
  }

  Game.prototype.randStartPosY = function () {
    var pos = [];
    pos.push(Math.floor(Math.random() * Game.DIM_X));
    pos.push(0);

    return pos;
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var allObjects = this.allObjects().concat(this.explosions);
    for(var i = 0; i < allObjects.length; i++){
      if(allObjects[i] instanceof A.EnemyShip){
        allObjects[i].draw(ctx);
      } else if(allObjects[i] instanceof A.DestroyerDmgExp || allObjects[i] instanceof A.DestroyerDeadExp) {
        allObjects[i].drawAnimation(ctx);
      } else {
        allObjects[i].drawRotatedImg(ctx);
      }
    }
  };

  Game.prototype.moveObjects = function () {
    if(this.ship.length === 1){
      this.ship[0].update(A.currentlyPressed);
    }

    var allObjects = this.allObjects().concat(this.explosions);
    for(var i = 0; i < allObjects.length; i++){
      allObjects[i].move();
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
    this.addEnemyShips();
  };

  Game.prototype.enemyFireLasers = function () {
    for(var i = 0; i < this.starDestroyers.length; i++){
      var enemyShip = this.starDestroyers[i];
      if(enemyShip.isProbabilityTrue(0.001)) {
        enemyShip.fireLaser(65);
      }
    }

    for(var i = 0; i < this.tieFighters.length; i++){
      var enemyShip = this.tieFighters[i];
      if(enemyShip.isProbabilityTrue(0.0025)) {
        enemyShip.fireLaser(65);
      }
    }
  };

  Game.prototype.remove = function (object) {
    if(object instanceof A.StarDestroyer){
      var idx = this.starDestroyers.indexOf(object);
      this.starDestroyers = this.starDestroyers.slice(0, idx).concat(this.starDestroyers.slice(idx + 1));
    } else if(object instanceof A.TieFighter) {
      var idx = this.tieFighters.indexOf(object);
      this.tieFighters = this.tieFighters.slice(0, idx).concat(this.tieFighters.slice(idx + 1));
    } else if(object instanceof A.Laser) {
      var idx = this.lasers.indexOf(object);
      this.lasers = this.lasers.slice(0, idx).concat(this.lasers.slice(idx + 1));
    } else if(object instanceof A.Ship) {
      A.currentlyPressed = {};
      this.ship.shift();
    } else {
      var idx = this.explosions.indexOf(object);
      this.explosions = this.explosions.slice(0, idx).concat(this.explosions.slice(idx + 1));
    }
  };

  Game.prototype.allObjects = function () {
    return this.starDestroyers.concat(this.tieFighters, this.ship, this.lasers);
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

  Game.prototype.playSound = function (filePath) {
    var explosion = new Audio(filePath);
    explosion.volume = this.volume;
    explosion.play();
  };

  Game.prototype.changeZIndex = function (className, newIdx) {
    document.getElementById(className).style.zIndex = newIdx;
  };
})();
