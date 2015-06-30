(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(attrObj) {
    Asteroids.MovingObject.call(this, {
      pos: attrObj.pos,
      vel: Asteroids.Util.randomVec(Math.random() * Asteroid.MAX_SPEED),
      radius: attrObj.radius,
      color: Asteroid.COLOR
    });
  };

  Asteroid.MAX_SPEED = 5;

  Asteroid.RADIUS = 5;
  Asteroid.COLOR = "#000000";

  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroid);

})();
