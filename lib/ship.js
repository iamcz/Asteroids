(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (pos) {
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: [0, 0],
      radius: Ship.RADIUS,
      color: Ship.COLOR
    });
    this.direction = Math.PI / 2;
  };
  Asteroids.Util.inherits(Asteroids.MovingObject, Ship);

  Ship.RADIUS = 15;
  Ship.COLOR = "#042B35";
  Ship.MAX_SPEED = 10;

  Ship.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.color;

    var firstPoint = [
      this.x + this.radius * Math.cos(-1 * this.direction),
      this.y + this.radius * Math.sin(-1 * this.direction)
    ];
    var secondPoint = [ 
      this.x + this.radius * Math.cos(-1 * this.direction + 5 * Math.PI / 6),
      this.y + this.radius * Math.sin(-1 * this.direction + 5 * Math.PI / 6)
    ];
    var thirdPoint = [ 
      this.x + this.radius * Math.cos(-1 * this.direction + 7 * Math.PI / 6),
      this.y + this.radius * Math.sin(-1 * this.direction + 7 * Math.PI / 6)
    ];
    ctx.moveTo.apply(ctx, firstPoint);
    ctx.lineTo.apply(ctx, secondPoint);
    ctx.lineTo.apply(ctx, thirdPoint);
    ctx.lineTo.apply(ctx, firstPoint);
    ctx.stroke();
  }

  Ship.prototype.relocate = function () {
    var coords = Asteroids.Game.randomPos();
    this.x = coords[0];
    this.y = coords[1];
    this.vX = 0;
    this.vY = 0;
  };

  Ship.prototype.power = function (impulse) {
    this.vX += impulse * Math.cos(this.direction);
    this.vY += impulse * Math.sin(this.direction);
	this.ensureMaxSpeed();
  };

  Ship.prototype.ensureMaxSpeed = function () {
	//debugger;
	var speed = Math.sqrt(this.vX * this.vX + this.vY * this.vY);
	if (speed > Ship.MAX_SPEED) {
	  this.vX *= Ship.MAX_SPEED / speed;
	  this.vY *= Ship.MAX_SPEED / speed;
	}
  }

  Ship.prototype.rotate = function(degrees) {
    this.direction += degrees;
  };
})();
