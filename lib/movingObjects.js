(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var MovingObject = A.MovingObject = function (params) {
    this.game = params.game;
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    this.color = params.color;
  };

  MovingObject.prototype.draw = function (ctx){
    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function (){
    this.pos = this.addVectors(this.pos, this.vel);
    this.game.wrap(this.pos);
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
})();
