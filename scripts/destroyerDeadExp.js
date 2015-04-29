(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var DestroyerDeadExp = A.DestroyerDeadExp = function (params) {
    var allParams = {
      game: params.game,
      pos: params.pos,
      vec: params.vec
    };

    A.MovingObject.call(this, allParams);

    this.imgParams = {
      img: DestroyerDeadExp.PICTURES['assets/destroyerDeadExps/explosion1_0001.png'],
      width: params.width,
      height: params.width
    };

    this.frameCounter = 1;
  };

  A.Util.inherits(DestroyerDeadExp, A.MovingObject);

  DestroyerDeadExp.PICTURES = (function loadImages() {
    var images = {};

    for(var i = 1; i <= 90; i++){
      var picNum = function () {
          num = i;
          var s = num+"";
          while (s.length < 4) s = "0" + s;
          return s;
      }();
      var filePathStr = 'assets/destroyerDeadExps/explosion1_' + picNum + '.png';
      images[filePathStr] = new Image();
      images[filePathStr].src = filePathStr;
    }

    return images;
  })();

  DestroyerDeadExp.prototype.drawAnimation = function (ctx) {
    var picNum = this.pad(this.frameCounter, 4);

    var filePathStr = 'assets/destroyerDeadExps/explosion1_' + picNum + '.png';
    this.imgParams.img = DestroyerDeadExp.PICTURES[filePathStr];

    this.draw(ctx);

    this.frameCounter += 1;
    if(this.frameCounter > 90){
      this.game.remove(this);
    }
  };

  DestroyerDeadExp.prototype.pad = function (num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  };
})();
