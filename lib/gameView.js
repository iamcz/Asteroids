(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (canvasEl) {
    this.canvasEl = canvasEl;
    this.game = new Asteroids.Game();
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step(this.canvasEl);
    }.bind(this), 1000 / 60);
  };

  GameView.prototype.registerKey = function (keyCode) {
    var ship = this.game.ship;
    var game = this.game;

    if (keyCode === 38) { // Up
      ship.power(0.2);
    } else if (keyCode === 39) { // Right
      ship.rotate(-1 * Math.PI / 36);
    } else if (keyCode === 37) { // Left
      ship.rotate(Math.PI / 36);
    } else if (keyCode === 32) { // Space
      game.shoot();
    }
  };
})();
