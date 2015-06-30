(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var MovingObject = Asteroids.MovingObject = function(attrObj) {
    this.x = attrObj.pos[0];
    this.y = attrObj.pos[1];
    this.vX = attrObj.vel[0];
    this.vY = attrObj.vel[1];
    this.radius = attrObj.radius;
    this.color = attrObj.color;
	this.wrappable = true;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
	this.x += this.vX;
	this.y -= this.vY;
	if (this.wrappable) {
	  Asteroids.Game.wrapPos(this)
	}
  };

  MovingObject.prototype.isCollidedWith = function (otherObj) {
    var dx = (this.x - otherObj.x);
    var dy = (this.y - otherObj.y);
    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist <= (this.radius + otherObj.radius);
  };

})();
