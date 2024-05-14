const mainMenu = document.getElementById("main-menu");
const gameOverMenu = document.getElementById("game-over");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mouse = new Circle({
  size: 5,
  pos: {
    x: undefined,
    y: undefined
  },
  vel: {x: 0, y: 0},
  color: 'yellow',
  strokeBool: true
});
mouse.fire = false;
mouse.firstClick = false;
let WIDTH, HEIGHT, targetDefinitions;
// PRESETTING SIZE OF ARRAY HELPS WITH PERFORMANCE - NO GARBAGE COLLECTION NECESSARY
let targets = new Array(10);
let gameStart = false;
let emptyTargets = 0;

function resize() {
  WIDTH = canvas.width = window.innerWidth - 4;
  HEIGHT = canvas.height = window.innerHeight - 4;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createTarget(amount, type) {
  for (let i = 0; i < amount; i++) {
    targets[i] = new Target(type, i);
  }
}
function gameOver() {
  gameOverMenu.classList.remove("hide");
}

function main() {
  resize();
  mouse.pos = { 
    x: Math.floor(WIDTH / 2),
    y: Math.floor(HEIGHT / 2)
  }
  createTarget(10, "default");
  mainMenu.classList.add("hide");
  gameOverMenu.classList.add("hide");
  if(!gameStart){
    animate();
    gameStart = true;
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // GAME LOOP
  if(emptyTargets > targets.length){
    emptyTargets = 0;
    gameOver();
  };

  for (let i = 0; i < targets.length; i++) {
    if (!targets[i]) {
      emptyTargets++;
      continue;
    }
    else { 
      targets[i].update(); 
      emptyTargets = 0;
    }
  }
  mouse.color = `hsl(${Math.floor(mouse.pos.y + 1 / 2)} 97% 75%)`;
  mouse.draw();
  if(!mouse.firstClick && mouse.fire){
    mouse.firstClick = true;
    // start timer here
  }
  mouse.fire = false;
  requestAnimationFrame(animate);
}

addEventListener("mousemove", (e) => {
  mouse.pos.x = e.pageX;
  mouse.pos.y = e.pageY;
});
addEventListener("mousedown", (e) => {
  if(e.repeat){
    return;
  }
  mouse.fire = true;
});
addEventListener("mouseup", () => {
  mouse.fire = false;
});
