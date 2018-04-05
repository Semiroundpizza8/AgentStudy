// ----------------------------
var particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  background(0);
  // greeting = createElement('h1', 'Benjamin Odisho');
  // Projects = createElement('button', 'Projects');
  // About = createElement('button', 'About Me');
  // Gallery = createElement('button', 'Gallery');
  // greeting.position(window.innerWidth/12, window.innerHeight/6);
  // Projects.position(window.innerWidth/12, window.innerHeight/3 + window.innerHeight/20);
  // About.position(window.innerWidth/12 + 40, window.innerHeight/3 + window.innerHeight/20);
  // Gallery.position(window.innerWidth/12 + 40, window.innerHeight/3 + window.innerHeight/20);
  // flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 100; i++) {
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

function mouseClicked() {
  saveCanvas('Blob', 'jpeg')
}

// Add a new boid into the System
function mouseDragged() {
  particles.shift()
  particles.push(new Particle(mouseX, mouseY));
}
