(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
	var center = [Game.DIM_X / 2, Game.DIM_Y / 2];
    this.ship = new Asteroids.Ship(center);
	this.numAsteroids = Game.NUM_ASTEROIDS;

    for (var i = 0; i < Game.NUM_ASTEROIDS; i += 1) {
      this.addAsteroid(Game.LARGE_ASTEROID);
    }
  };

  Game.NUM_ASTEROIDS = 3;
  Game.DIM_X = document.body.clientWidth;
  Game.DIM_Y = document.body.clientHeight;
  Game.LARGE_ASTEROID = 25;
  Game.MEDIUM_ASTEROID = 10;
  Game.SMALL_ASTEROID = 5;

  Game.prototype.populate = function () {
    for (var i = 0; i < this.numAsteroids; i += 1) {
      this.addAsteroid(Game.LARGE_ASTEROID);
    }
  };

  Game.prototype.addAsteroid = function (attrsObj) {
	var pos = (attrsObj.pos === undefined) ? Game.randomPos() : attrsObj.pos;
	var rad = (attrsObj.radius === undefined) ? Game.LARGE_ASTEROID : attrsObj.radius;
    this.asteroids.push(new Asteroids.Asteroid({ 
	  pos: pos,
	  radius: rad
	}));
  };

  Game.prototype.replaceAsteroid = function (asteroid) {
	var nextSize;
	if (asteroid.radius === Game.SMALL_ASTEROID) {
	  return;
	} else if (asteroid.radius === Game.MEDIUM_ASTEROID) {
	  nextSize = Game.SMALL_ASTEROID
	} else if (asteroid.radius === Game.LARGE_ASTEROID) {
	  nextSize = Game.MEDIUM_ASTEROID;
	}

	for (var i = 0; i < Game.NUM_ASTEROIDS; i += 1) {
	  this.addAsteroid({
	    pos: [asteroid.x, asteroid.y],
	    radius: nextSize
	  });
	}
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  }

  Game.randomPos = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.step = function (canvasEl) {
    this.cleanUpBullets();
    this.draw(canvasEl);
    this.checkCollisions();
    this.moveObjects();

	if (this.asteroids.length === 0) {
	  this.numAsteroids += 1;
	  this.populate();
	}
  };

  Game.prototype.draw = function (canvasEl) {
    Game.DIM_X = document.body.clientWidth;
    Game.DIM_Y = document.body.clientHeight;
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;
    var ctx = canvasEl.getContext('2d');
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach( function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach( function (obj) {
      obj.move();
    });
  };

  Game.wrapPos = function (obj) {
	obj.x = (obj.x + Game.DIM_X) % Game.DIM_X;
	obj.y = (obj.y + Game.DIM_Y) % Game.DIM_Y;
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(game.ship)) {
        game.ship.relocate();
      }
    });

    this.asteroids.forEach(function (asteroid) {
      game.bullets.forEach(function (bullet) {
        if (bullet.isCollidedWith(asteroid)) {
          game.replaceAsteroid(asteroid);
          game.remove(asteroid, game.asteroids);
          game.remove(bullet, game.bullets);
        }
      });
    });
  };

  Game.prototype.remove = function(object, array) {
	array.splice(array.indexOf(object), 1);
  }

  Game.prototype.cleanUpBullets = function () {
    game = this;

    this.bullets.forEach(function (bullet) {
      if (Game.outOfBounds([bullet.x, bullet.y])) {
		game.remove(bullet, game.bullets)
      }
    });
  };

  Game.prototype.shoot = function () {
    var ship = this.ship;
    var pos = [
      ship.x + ship.radius * Math.cos(-ship.direction),
      ship.y + ship.radius * Math.sin(-ship.direction)
    ];
    var direction = this.ship.direction;
    this.bullets.push(new Asteroids.Bullet(pos, direction));
  };

  Game.outOfBounds = function (pos) {
    return (pos[0] > Game.DIM_X || 
			pos[0] < 0 || 
			pos[1] > Game.DIM_Y || 
			pos[1] < 0);
  };

})();
