var flock;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // colorMode(HSB);
  background(0)
  flock = new Flock();
  // Add an initial set of particles into the system
  for (var i = 0; i < 10; i++) {
    flock.addParticle(new Particle(random(innerWidth), random(innerHeight)))
  }
}

function draw() {
  // background(51);
  flock.run();
}

// Add a new boid into the System
function mouseClicked() {
  // saveCanvas('web', 'jpeg')
}

// Add a new boid into the System
function mouseDragged() {
  flock.addParticle(new Particle(mouseX,mouseY));
}
