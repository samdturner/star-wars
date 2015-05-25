# star-wars
Star Wars game inspired by asteroids


To simulate a more realistic game play experience, the enemy shot vector is calculated based on the angle to the player plus a random variant of +/- 32.5 degrees.
```
# scripts/enemyShip.js

EnemyShip.prototype.fireLaser = function (offset) {
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

```
