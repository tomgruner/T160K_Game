// Rain.js
// Copyright © Julio Cesar Ody
// Additional Changes Copyright © Thomas Gruner 2013
(function(window, undefined) {

  Rain = function(canvas, speed, angle) {

    var self = this;

    self.init = function(canvas, config) {
     
      self.config = config;
      self.canvas = canvas;
      self.angle = config.angles[0];
      self.angleIndex = 0;
      self.nextAngle();
      self.drops = {};
      runEngine();
      return self;
    };


    function runEngine() {
      self.enginePid = setInterval(function() { createDrop(); }, 100 / self.config.intensity);
    }

    function createDrop() {
      self.angle += self.angleStep;

      if((self.angleStep > 0 && self.angle >= self.targetAngle)
        || (self.angleStep < 0 && self.angle <= self.targetAngle)) {
        self.nextAngle();
      }

      var offset = (Math.tan(self.angle * Math.PI / 180) * self.canvas.height);

      var config = self.config,
          startPoint = Math.floor(Math.random() * self.canvas.width),
          factor = Math.random(),
          speed = config.speed * (1 + factor);

      var scale = self.config.size / 10;

      var drop = self.canvas.image('images/drop_1.png', startPoint + (offset / 2), -30, 18*scale,30*scale);
      drop.toBack();
      drop
        .rotate(self.angle)
        .animate({transform: 'r' + self.angle + 't0' + ',' + (self.canvas.height + Math.abs(offset /2))}, speed, function() { delete self.drops[drop.id]; drop.remove();  });

      self.drops[drop.id] = drop;
      return drop;
    }

    self.nextAngle = function() {

      if(self.angleIndex == self.config.angles.length - 1) {
        var nextIndex = 0;
        var currentIndex = self.angleIndex;
        self.angleIndex = 0;
      } else {
        var nextIndex = self.angleIndex + 1;
        var currentIndex = self.angleIndex;
        self.angleIndex ++;
      }
      self.targetAngle = self.config.angles[nextIndex];
      self.angleStep = (self.config.angles[nextIndex] - self.config.angles[currentIndex]) / 80;
    }

    // "class" methods
    self.setIntensity = function(intensity) {
      self.stop();
      self.config.intensity = intensity;
      self.enginePid = setInterval(function() { createDrop(self.config); }, 100 / self.config.intensity);
    };

    self.stop = function() {
      clearInterval(self.enginePid);
    }


    return self.init.apply(self, arguments);
  };
})(window);