function Flock() {
  // An array for all the particles
  this.particles = []; // Initialize the array
}

Flock.prototype.run = function () {
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].run(this.particles);  // Passing the entire list of particles to each particle individually
  }
}

Flock.prototype.addParticle = function (particle) {
  this.particles.push(particle);
}

// Derived From The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Particle class
// Methods for Separation, Cohesion, Alignment added

function Particle(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}

Particle.prototype.run = function (particles) {
  this.flock(particles);
  this.update();
  this.borders();
  this.render();
}

Particle.prototype.applyForce = function (force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Particle.prototype.flock = function (particles) {
  var sep = this.separate(particles);   // Separation
  var ali = this.align(particles);      // Alignment
  var coh = this.cohesion(particles);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(3.0);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Particle.prototype.update = function () {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Particle.prototype.seek = function (target) {
  var desired = p5.Vector.sub(target, this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Particle.prototype.render = function () {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  // fill(127);
  // stroke(200, 40);
  // push();
  // translate(this.position.x,this.position.y);
  // rotate(theta);
  // beginShape();
  // vertex(0, -this.r*2);
  // vertex(-this.r, this.r*2);
  // vertex(this.r, this.r*2);
  // endShape(CLOSE);
  // pop();
}

// Wraparound
Particle.prototype.borders = function () {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby particles and steers away
Particle.prototype.separate = function (particles) {
  var desiredseparation = 200.0;
  var steer = createVector(0, 0);
  var count = 0;
  // For every particle in the system, check if it's too close
  for (var i = 0; i < particles.length; i++) {
    var d = p5.Vector.dist(this.position, particles[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      // stroke(200 + count * 20, 0, 100, 50)
      if(count > 7) {
        stroke(255, 10)
      } else {
        stroke(255, 1.5)

      }
      line(this.position.x, this.position.y, particles[i].position.x, particles[i].position.y);
      var diff = p5.Vector.sub(this.position, particles[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby particle in the system, calculate the average velocity
Particle.prototype.align = function (particles) {
  var neighbordist = 50;
  var sum = createVector(0, 0);
  var count = 0;
  for (var i = 0; i < particles.length; i++) {
    var d = p5.Vector.dist(this.position, particles[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(particles[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby particles, calculate steering vector towards that location
Particle.prototype.cohesion = function (particles) {
  var neighbordist = 50;
  var sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < particles.length; i++) {
    var d = p5.Vector.dist(this.position, particles[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(particles[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}
