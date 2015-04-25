(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var GameView = A.GameView = function (ctx) {
    this.game = new A.Game();
    this.ctx = ctx;
    this.bindKeyHandlers();

    // var background = new Image();
    // background.src = "assets/death_star.jpg";
    //
    // background.addEventListener("load", function () {
    //   debugger
    //   ctx.drawImage(background, 0, 0);
    // });
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step(),
      this.game.draw(this.ctx);
    }.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function(){ ship.power([2, 0]) }.bind(ship));
    key('right', function(){ ship.rotateClockwise() }.bind(ship));
    key('left', function(){ ship.rotateCClockwise() }.bind(ship));
    key('space', function(){ ship.fireBullet() }.bind(ship));
  };
})();
