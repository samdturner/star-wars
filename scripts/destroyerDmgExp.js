(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var DestroyerDmgExp = A.DestroyerDmgExp = function (params) {
    var allParams = {
      game: params.game,
      pos: params.pos,
      vec: params.vec
    };

    A.MovingObject.call(this, allParams);

    this.imgParams = {
      img: DestroyerDmgExp.PICTURES['assets/destroyerDmgExps/explosions [www.imagesplitter.net]-7-15.png'],
      width: 30,
      height: 30
    };

    this.frameCounter = 0;
  };

  A.Util.inherits(DestroyerDmgExp, A.MovingObject);

  DestroyerDmgExp.PICTURES = (function loadImages() {
    var images = {};

    for(var i = 0; i < 31; i++){
      var col = Math.abs(15 - i);
      var row = 7 - Math.floor(i / 16);

      var filePathStr = 'assets/destroyerDmgExps/explosions [www.imagesplitter.net]-' + row + '-' + col + '.png'
      images[filePathStr] = new Image();
      images[filePathStr].src = filePathStr;
    }

    return images;
  })();

  DestroyerDmgExp.prototype.drawAnimation = function (ctx) {
    var picNum = Math.floor(this.frameCounter);
    var col = Math.abs(15 - picNum);
    var row = 7 - Math.floor(picNum / 16);


    var filePathStr = 'assets/destroyerDmgExps/explosions [www.imagesplitter.net]-' + row + '-' + col + '.png'
    this.imgParams.img = DestroyerDmgExp.PICTURES[filePathStr];

    this.draw(ctx);

    this.frameCounter += 1;
    if(this.frameCounter > 30){
      this.game.remove(this);
    }
  };
})();
