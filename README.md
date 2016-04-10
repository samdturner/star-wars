# star-wars
This Star Wars game was inspired by asteroids and was built in javascript.

View it live: http://samdturner.github.io/star-wars/


###Technical Challenges:
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

Since the enemy star destroyers are irregular shapes, I used three polygons (bottom triangle, top triangle, and rectangle) to calcuate when the star destroyer has been hit by a laser.

```
#scripts/starDestroyer.js

StarDestroyer.prototype.isCollidedWith = function (otherObj) {
  xStart = this.pos[0] - 80;
  yStart = this.pos[1] + 52;

  var btmTriangle = [[xStart, yStart],
  [xStart - 80, yStart - 21],
  [xStart + 230, yStart - 16]];

  if(this.circleInTriangle(btmTriangle, otherObj.pos, otherObj.radius)){
    return true;
  }

  var topTriangle = [[xStart - 80, yStart - 21],
  [xStart - 6, yStart - 65],
  [xStart + 230, yStart - 16]];

  if(this.circleInTriangle(topTriangle, otherObj.pos, otherObj.radius)){
    return true;
  }

  var rect = [[xStart - 8, yStart - 76],
  [xStart - 8, yStart - 95],
  [xStart + 45, yStart - 95],
  [xStart + 45, yStart - 75]];

  if(this.rectCircleColliding(rect, otherObj.pos, otherObj.radius)){
    return true;
  }

  return false;
};
```
