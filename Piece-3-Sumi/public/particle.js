// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Process 14
// Casey Reas

// E4
// Circle XXXX
// Moves in a straight line XXXX
// Constrains to surface
// Changes direction while touching (rotate) XXXX

// A rectangular surface filled with instances of Element 4, (Canvas) XXXX
// each with a different size and direction. (Random radius and velocity) XXXX
// Display the intersections by drawing a circle at each point of contact. (Ellipse at middle point when in contact) XXXX
// Set the size of each circle relative to the distance between the centers of the overlapping Elements. (Ellipse size === x - distance) XXXX
// Draw the smallest possible circle as white and the largest as black, (fill(distance))
// with varying grays representing sizes in between.  (Same as above)


function Particle(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1)); // Gives each a different initial velocity
  this.position = createVector(x, y);
  this.r = 30.0 + random(80.0); // Radius of particular circle
  this.maxSpeed = 3;    // Maximum speed
  this.maxForce = 0.05; // Maximum steering force
}

Particle.prototype.run = function () {
  var steer = this.behaviors();
  this.update(steer);
  this.borders();
  // this.render();
}

Particle.prototype.behaviors = function () {
  // Must rotate while in contact
  // Must draw an ellipse at average for distance while in contact
  var steer = createVector(steer);
  for (var i = 0; i < particles.length; i++) {
    var otherParticle = particles[i];
    var distance = p5.Vector.dist(this.position, otherParticle.position);
    if ((distance > 4 && distance < this.r/2)) {
      this.velocity.rotate(1);
      let colorParse = 30 - (distance / 2);
      let xMiddle = (this.position.x + otherParticle.position.x) / 2;
      let yMiddle = (this.position.y + otherParticle.position.y) / 2;
      fill(distance * 1.5);
      noStroke();
      ellipse(xMiddle, yMiddle, colorParse, colorParse);

      // Separation
      var diff = p5.Vector.sub(this.position, otherParticle.position);
      diff.normalize();
      diff.div(distance);        // Weight by distance
      steer.add(diff);
    }
  }
}

Particle.prototype.borders = function () {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

Particle.prototype.render = function () {
  // fill(255);
  // stroke(0);
  ellipse(this.position.x, this.position.y, this.r);
}

Particle.prototype.update = function (steer) {
  // Add accel to velocity
  this.velocity.add(this.acceleration);
  // Limit by max
  this.velocity.limit(this.maxSpeed);
  this.position.add(this.velocity);
  // Reset Accel
  this.acceleration.mult(0);
}