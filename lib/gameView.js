(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.ctx = ctx;
    this.game = new Asteroids.Game();
  };

  GameView.prototype.start = function () {
    //this.bindKeyHandlers();

    setInterval(function () {
      this.game.step(this.ctx);
    }.bind(this), 1000 / 60);
  };

  GameView.prototype.registerKey = function (keyCode) {
    var ship = this.game.ship;
    var game = this.game;

    if (keyCode === 38) {
      ship.power(0.2);
    } else if (keyCode === 39) {
      ship.rotate(-1 * Math.PI / 36);
    } else if (keyCode === 37) {
      ship.rotate(Math.PI / 36);
    } else if (keyCode === 32) {
      game.shoot();
    }
  };

  //GameView.prototype.bindKeyHandlers = function () {
  //  var ship = this.game.ship;
  //  var game = this.game;

  //  key('left, h', function () {
  //    ship.rotate(Math.PI / 18);
  //  });
  //  key('right, l', function () {
  //    ship.rotate(-1 * Math.PI / 18);
  //  });
  //  key('up, k', function () {
  //    ship.power(0.2);
  //  });
  //  key('space', function () {
  //    game.shoot();
  //  })
  //  key('x', function () {
  //    game.asteroids = [];
  //  });
  //};
})();
