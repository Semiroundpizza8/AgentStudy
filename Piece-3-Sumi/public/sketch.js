// ----------------------------
var particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  background(255)
  // Add an initial set of boids into the system
  for (var i = 0; i < 125; i++) {
    particles.push(new Particle(random(innerWidth), random(innerHeight)));
  }
}

function draw() {
  // background(51);
  for (var i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.run();
  }
}

function mouseClicked() {
  saveCanvas('Sumi', 'jpeg')
}

// Add a new boid into the System
function mouseDragged() {
  particles.push(new Particle(mouseX, mouseY));
}
