import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#0FC2C0','#0CABA8', '#008F8C', '#015958', '#023535']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * 2 * Math.PI;
    this.originalX = x;
    this.originalY = y;
    this.velocity = 0.05 * Math.random() + 0.01;
    this.randomLocationFromCenter = randomIntFromRange(70, 210);
    this.previousMouse = {
      x: x,
      y: y
    }
  }

  update() {
    let previousPoint = {
      x: this.x,
      y: this.y
    }
    this.radians += this.velocity;
    
    // drag effect of mouse
    this.previousMouse = {
      x: this.previousMouse.x + (mouse.x - this.previousMouse.x) * 0.05,
      y: this.previousMouse.y + (mouse.y - this.previousMouse.y) * 0.05
    }
    // ciricular motion
    this.x = this.previousMouse.x + Math.cos(this.radians) * this.randomLocationFromCenter;
    this.y = this.previousMouse.y + Math.sin(this.radians) * this.randomLocationFromCenter;
    this.draw(previousPoint);
  }

  draw(previousPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(previousPoint.x, previousPoint.y);
    c.lineTo(this.x, this.y);
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.fillStyle = this.color
    // c.fill()
    c.stroke();
    c.closePath()
  }

}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 150; i++) {
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = Math.random() * 100 + 15;
    let color = randomColor(colors);
    particles.push(new Particle(x, y, radius, color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  // You may consider to  only remove the clearRect function to create
  // a round Image with beautiful mix of colors
  c.fillStyle = "rgba(255, 255, 255, 0.08)"
  c.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach(object => {
   object.update()
  })
}

init()
animate()
