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

var maxBalls = 100;

var gravity = 1;

var Yfriction = 0.70;

var Xfriction = 0.85;

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

window.addEventListener('click',
  function() {
    init()
  }
);



//UTIL
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(color){
  return color[Math.floor(Math.random() * color.length)];
}



function Ball(x, y, r, dx, dy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.color = randomColor(colorArray);

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = this.color;
    c.stroke();
  }

  this.update = function() {
    if (this.y + this.r + this.dy > drawBoardMaxHei) {
      this.dy = -this.dy * Yfriction;
      this.dx = this.dx * Xfriction;
    }
    else {
      this.dy += gravity;
    }
    if (this.x + this.r + this.dx > drawBoardMaxWid || this.x - this.r <= 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

function init() {
  ballArray = [];
  for (var i = 0; i < maxBalls; i++) {
    var r = getRandom(10, 30);
    var x = getRandom(r, drawBoardMaxWid - r);
    var y = getRandom(-r*10, drawBoardMaxHei - r*40);
    var dx = (Math.random() - 0.5) * 20;
    var dy = 1;
    ballArray.push(new Ball(x, y, r, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, drawBoardMaxWid, drawBoardMaxHei);
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

init();
animate();
