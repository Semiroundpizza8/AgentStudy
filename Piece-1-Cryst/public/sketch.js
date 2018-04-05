// ----------------------------
var flock;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB);
  background(255)
  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 100; i++) {
    flock.addParticle(new Particle(random(innerWidth), random(innerHeight)));
  }
}

function draw() {
  // background(51);
  flock.run();
}

// Add a new boid into the System
function mouseClicked() {
  saveCanvas('cryst', 'jpeg')
}

function mouseDragged() {
  flock.addParticle(new Particle(mouseX,mouseY));
}
