(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function () {
    Asteroids.MovingObject.call(this, {
      pos: Asteroids.Game.randomPos(),
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
