(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var StarDestroyer = A.StarDestroyer = function (params) {
    var allParams =
    {
      game: params.game,
      pos: params.pos,
      angle: 0,
    };

    A.EnemyShip.call(this, allParams);

    this.vec = this.newVector(1);

    var img = new Image();
    img.src = 'assets/star_destroyer.jpg'
    this.imgParams = {
      img: img,
      width: 370,
      height: 150
    };

    this.healthPts = 20;
    this.tmp = [0, 0];
    this.scoreValue = 25000;
  };

A.Util.inherits(StarDestroyer, A.EnemyShip);

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

StarDestroyer.prototype.circleInTriangle = function (triangle, circle, radius) {
  if (this.pointInTriangle(circle, triangle)) {
    return true;
  } else if (this.lineCircleCollide(triangle[0], triangle[1], circle, radius)) {
    return true;
  } else if (this.lineCircleCollide(triangle[1], triangle[2], circle, radius)) {
    return true;
  } else if (this.lineCircleCollide(triangle[2], triangle[0], circle, radius)) {
    return true;
  }

  return false;
};

StarDestroyer.prototype.pointInTriangle = function (point, triangle) {
  //compute vectors & dot products
  var cx = point[0], cy = point[1],
  t0 = triangle[0], t1 = triangle[1], t2 = triangle[2],
  v0x = t2[0]-t0[0], v0y = t2[1]-t0[1],
  v1x = t1[0]-t0[0], v1y = t1[1]-t0[1],
  v2x = cx-t0[0], v2y = cy-t0[1],
  dot00 = v0x*v0x + v0y*v0y,
  dot01 = v0x*v1x + v0y*v1y,
  dot02 = v0x*v2x + v0y*v2y,
  dot11 = v1x*v1x + v1y*v1y,
  dot12 = v1x*v2x + v1y*v2y;

  // Compute barycentric coordinates
  var b = (dot00 * dot11 - dot01 * dot01),
  inv = b === 0 ? 0 : (1 / b),
  u = (dot11*dot02 - dot01*dot12) * inv,
  v = (dot00*dot12 - dot01*dot02) * inv;

  return u>=0 && v>=0 && (u+v < 1);
};

StarDestroyer.prototype.lineCircleCollide = function (a, b, circle, radius, nearest) {
  //check to see if start or end points lie within circle

  if (this.pointCircleCollide(a, circle, radius)) {
    if (nearest) {
      nearest[0] = a[0];
      nearest[1] = a[1];
    }
    return true;
  } else if (this.pointCircleCollide(b, circle, radius)) {
    if (nearest) {
      nearest[0] = b[0];
      nearest[1] = b[1];
    }
    return true;
  }

  var x1 = a[0],
  y1 = a[1],
  x2 = b[0],
  y2 = b[1],
  cx = circle[0],
  cy = circle[1];

  //vector d
  var dx = x2 - x1;
  var dy = y2 - y1;

  //vector lc
  var lcx = cx - x1;
  var lcy = cy - y1;

  //project lc onto d, resulting in vector p
  var dLen2 = dx * dx + dy * dy; //len2 of d
  var px = dx;
  var py = dy;
  if (dLen2 > 0) {
    var dp = (lcx * dx + lcy * dy) / dLen2;
    px *= dp;
    py *= dp;
  }

  if (!nearest) {
    nearest = this.tmp;
    nearest[0] = x1 + px;
    nearest[1] = y1 + py;
  }

  //len2 of p
  var pLen2 = px * px + py * py;

  //check collision
  return this.pointCircleCollide(nearest, circle, radius)
  && pLen2 <= dLen2 && (px * dx + py * dy) >= 0
};

StarDestroyer.prototype.pointCircleCollide = function (point, circle, r) {
  if (r===0) {
    return false;
  }
  var dx = circle[0] - point[0];
  var dy = circle[1] - point[1];
  return dx * dx + dy * dy <= r * r;
};

StarDestroyer.prototype.rectCircleColliding = function (rect, cp, cr) {
  var rp1 = rect[0];
  var rp2 = rect[1];
  var rp3 = rect[2];

  var rectWidth = Math.abs(rp1[0] - rp3[0]);
  var rectHeight = Math.abs(rp1[1] - rp2[1]);

  var circle = {x:cp[0], y:cp[1], r:cr};
  var rect = {x:rp2[0], y:rp2[1], w:rectWidth, h:rectHeight};

  var distX = Math.abs(circle.x - rect.x-rect.w/2);
  var distY = Math.abs(circle.y - rect.y-rect.h/2);

  if (distX > (rect.w/2 + circle.r)) { return false; }
  if (distY > (rect.h/2 + circle.r)) { return false; }

  if (distX <= (rect.w/2)) { return true; }
  if (distY <= (rect.h/2)) { return true; }

  var dx=distX-rect.w/2;
  var dy=distY-rect.h/2;
  return (dx*dx+dy*dy<=(circle.r*circle.r));
};
})();
