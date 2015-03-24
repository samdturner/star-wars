(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var GameView = A.GameView = function (ctx) {
    this.game = new A.Game();
    this.ctx = ctx;
    this.bindKeyHandlers();
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step(),
      this.game.draw(this.ctx);
    }.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function(){ ship.power([0, -2]) }.bind(ship));
    key('down', function(){ ship.power([0, 2]) }.bind(ship));
    key('right', function(){ ship.power([2, 0]) }.bind(ship));
    key('left', function(){ ship.power([-2, 0]) }.bind(ship));
  };
})();
