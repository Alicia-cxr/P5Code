const binCount = 1024
const frameCount = 1024
let particles = new Array(binCount)
let fft
let song

let Particle = function(position) {
  this.position = position
  this.speed = createVector(0, 1)
  this.color = [random(0, 255), random(0,255), random(0,255)]
  
  this.draw = function() {
    fill(this.color)
    //ellipse(this.position.x, this.position.y, this.diameter, this.diameter)//圆形
    star(this.position.x, this.position.y, sin((200 /  this.diameter) / 10) * 10 + 12, sin((200 /  this.diameter) / 10) * 5 + 7, 5);//心形
  }
  
  this.update = function(level) {
    this.position.y += this.speed.y * level * 10
    
    if (this.position.y > height) {
      this.position.y = 0
    }
    
    this.diameter = random(5,7) + (level * 100)
  }
}

function preload() {
  // body language, everything i wanted, its you, the good side, & the yaer of the monkey work best
  song = loadSound('Fushuinanshou.mp3')
  fft = new p5.FFT()
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  song.setVolume(0.5);
  song.loop();  

  positionParticleWave(particles)
}

function draw() {
  background(0, 0, 0, 100)

  // returns an array with [binCount] amplitude readings from lowest to highest frequencies
  let spectrum = fft.analyze()
  updateParticles(spectrum)
}
function star(x, y, radius1, radius2, npoints) {
    var angle = TWO_PI / npoints;
    var halfAngle = angle / 2.0;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius2;
        var sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume()
  }
}