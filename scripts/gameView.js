(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var GameView = A.GameView = function (ctx) {
    this.ctx = ctx;
    window.addEventListener("keydown", function(e) {
      if([32, 37, 38, 39, 40, 87, 65, 83, 68].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);
  };

  GameView.prototype.start = function () {
    for (var i = 3; i > 0; i--) {
      var idStr = "xwing-img-" + i;
      document.getElementById(idStr).style.visibility = 'visible';
    }

    var currentGame = new A.Game();

    currentGame.addShip();
    var updateFrames = setInterval(function () {
      currentGame.step();
      currentGame.draw(this.ctx);
      if(currentGame.lives === 0){
        clearInterval(updateFrames);
      }
    }.bind(this), 20);
  };
})();
