var canvas = document.querySelector('canvas');

var drawBoardMaxWid = window.innerWidth - 5;
var drawBoardMaxHei = window.innerHeight - 8;
canvas.width = drawBoardMaxWid;
canvas.height = drawBoardMaxHei;

var c = canvas.getContext('2d');
console.log(window.innerWidth);
console.log(innerWidth);
console.log(window.innerHeight);
console.log(innerHeight);



//VARIABLES
var mouse = {
  x: undefined,
  y: undefined
}

colorArray = [
  '#BF0B3B',
  '#4A44F2',
  '#F2E635',
  '#F2BE22',
  '#F20505'
]

var maxCircles = 1000;



//EVENT LISTENERS
window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  }
);

window.addEventListener('resize',
  function() {
    drawBoardMaxWid = window.innerWidth - 5;
    drawBoardMaxHei = window.innerHeight - 8;
    canvas.width = drawBoardMaxWid;
    canvas.height = drawBoardMaxHei;

    init();
  }
);



//UTIL
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(color){
  return color[Math.floor(Math.random() * color.length)];
}



function Circle(x, y, dx, dy, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.minR = r;
  this.maxR = r * 4;
  //Random Color
  this.color = colorArray[Math.floor(Math.random() * colorArray.length + 1)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.r + this.dx > drawBoardMaxWid || this.x - this.r + this.dx < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r + this.dy > drawBoardMaxHei || this.y - this.r + this.dy < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interaction
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.r < this.maxR) {
        if (this.x + this.r < drawBoardMaxWid - 1 && this.x - this.r > 1) {
          if (this.y + this.r < drawBoardMaxHei - 1 && this.y - this.r > 1) {
            this.r += 1;
          }
        }
      }
    } else if (this.r > this.minR) {
      this.r -= 1;
    }

    this.draw();
  }
}

function init() {
  circlesArray = [];
  for (var i = 0; i < maxCircles; i++) {
    var r = getRandom(3, 6);
    var x = getRandom(r, drawBoardMaxWid - r);
    var y = getRandom(r, drawBoardMaxHei - r);
    var dx = (Math.random() - 0.5) * 1.5;
    var dy = (Math.random() - 0.5) * 1.5;
    circlesArray.push(new Circle(x, y, dx, dy, r));
  }
}

function animate() {
  c.clearRect(0, 0, drawBoardMaxWid, drawBoardMaxHei);
  for (var i = 0; i < maxCircles; i++) {
    circlesArray[i].update();
  }
  requestAnimationFrame(animate);
}

init();
animate();
