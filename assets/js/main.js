const mainMenu = document.getElementById("main-menu");
const gameOverMenu = document.getElementById("game-over");
const startButton = document
  .getElementById("start-button")
  .getBoundingClientRect();
const timeTracker = document.getElementById("time-tracker");
const ui = document.getElementById("ui");
const score = document.getElementById("end-time");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mouse = new Circle({
  size: 5,
  pos: {
    x: undefined,
    y: undefined,
  },
  vel: { x: 0, y: 0 },
  color: "yellow",
  strokeBool: true,
});

let WIDTH,
  HEIGHT,
  targetDefinitions,
  gameStart,
  emptyTargets,
  timer,
  timerStarted,
  delta;
// PRESETTING SIZE OF ARRAY HELPS WITH PERFORMANCE - NO GARBAGE COLLECTION NECESSARY
let targets = new Array(15);
let hiScore = 100000 || localStorage.getItem("hiScore");

/////// UTILITY FUNCTIONS

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
  gameStart = false;
  gameOverMenu.classList.remove("hide");
  timeTracker.classList.add("hide");
  ui.classList.add("hide");
  score.innerText = `${Math.floor(delta) / 1000} SECONDS!`;
  if(!localStorage.getItem("hiScore") || localStorage.getItem("hiScore") < delta){
    localStorage.setItem("hiScore", delta);
  }
}
function mouseInit() {
  mouse.fire = false;
  mouse.firstClick = false;
  mouse.pos = {
    x: startButton.x + startButton.width / 2,
    y: startButton.y + startButton.height / 2,
  };
}
function timeInit() {
  timeTracker.classList.remove("hide");
  timer = 0;
  timerStarted = false;
  delta = 0;
}
function handleTargets(){
  for (let i = 0; i < targets.length; i++) {
    if (!targets[i]) {
      emptyTargets++;
      continue;
    } else {
      targets[i].update();
      emptyTargets = 0;
    }
  }
}

///// MAIN PROGRAMME

function main() {
  resize();
  mouseInit();
  timeInit();
  ui.classList.remove("hide");
  emptyTargets = 0;
  createTarget(targets.length, "default");
  mainMenu.classList.add("hide");
  gameOverMenu.classList.add("hide");
  if (!gameStart) {
    animate();
    gameStart = true;
  }
}

function animate(timestamp) {
  if (gameStart) {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
    delta = timestamp - timer;
    if (timerStarted) {
      timeTracker.innerText = `${Math.floor(delta) / 1000}`;
    }
    // GAME LOOP
    if (emptyTargets > targets.length) {
      emptyTargets = 0;
      gameOver();
    }

    handleTargets();

    mouse.color = `hsl(${Math.floor(mouse.pos.y + 1 / 2)} 97% 75%)`;
    mouse.draw();
    if (!mouse.firstClick && mouse.fire) {
      mouse.firstClick = true;
      timerStarted = true;
      timer = timestamp;
    }
    mouse.fire = false;
  }
    requestAnimationFrame(animate);
}

addEventListener("mousemove", (e) => {
  mouse.pos.x = e.pageX;
  mouse.pos.y = e.pageY;
});
addEventListener("mousedown", (e) => {
  if (e.repeat) {
    return;
  }
  mouse.fire = true;
});
addEventListener("mouseup", () => {
  mouse.fire = false;
});
