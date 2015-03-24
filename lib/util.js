(function(){
  var A = window.Asteroids = window.Asteroids || {};

  A.Util = {};

  A.Util.inherits = function (child, parent) {
    function Surrogate(){}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  A.Util.randomVec = function (length) {
    var angle = 2 * Math.PI * Math.random();
    var vector = [];
    vector.push(length * Math.cos(angle));
    vector.push(length * Math.sin(angle));
    return vector;
  };
})();
