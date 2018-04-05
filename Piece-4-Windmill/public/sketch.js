// ----------------------------
var particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  createP("Drag the mouse to generate new boids.");
  colorMode(HSB);
  angleMode(DEGREES);
  // flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 150; i++) {
    particles.push(new Particle(random(innerWidth), random(innerHeight)));
  }
}

function draw() {
  // background(51);
  push();
  fill(255, 0, 0)
  textSize(32);
  pop();
  for (var i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.run();
  }
}

// Add a new boid into the System
function mouseDragged() {
  particles.shift()
  particles.push(new Particle(mouseX, mouseY));
}
