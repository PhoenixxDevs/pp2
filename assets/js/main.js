const mainMenu = document.getElementById("main-menu");
const gameOverMenu = document.getElementById("game-over");
const startButton = document
  .getElementById("start-button")
  .getBoundingClientRect();
const times = document.getElementById("times");
const newRecord = document.getElementById("new-record");
const nav = document.getElementById("nav");
const timeTracker = document.getElementById("time-tracker");
const scoreboard = document.getElementById("hi-score");
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
  gameStart,
  emptyTargets,
  timer,
  timerStarted,
  delta;
// PRESETTING SIZE OF ARRAY HELPS WITH PERFORMANCE - NO GARBAGE COLLECTION NECESSARY
let targets = new Array(15);
let hiScore = localStorage.getItem("hiScore") || 10000;

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
function toSeconds(milliseconds){
  return Math.floor(milliseconds) / 1000;
}
function gameOver(gameOver) {
  gameStart = false;
  gameOverMenu.classList.remove("hide");
  timeTracker.classList.add("hide");
  times.classList.add("hide");
  score.innerText = `${toSeconds(delta)} SECONDS!`;
  if (gameOver) {
    if (
      !localStorage.getItem("hiScore") ||
      localStorage.getItem("hiScore") > delta
    ) {
      localStorage.setItem("hiScore", delta);
      hiScore = localStorage.getItem("hiScore");
      scoreboard.innerText = `Best Time: ${toSeconds(hiScore)} Seconds`;
      newRecord.classList.remove("hide");
    }
  }
}
function mouseInit(moveMouse) {
  mouse.fire = false;
  mouse.firstClick = false;
  if (moveMouse) {
    mouse.pos = {
      x: startButton.x + startButton.width / 2,
      y: startButton.y + startButton.height / 2,
    };
  }
}
function timeInit() {
  timeTracker.classList.remove("hide");
  scoreboard.classList.remove("hide");
  scoreboard.innerText = `Best: ${toSeconds(hiScore)} Seconds`;
  timer = 0;
  timerStarted = false;
  delta = 0;
  timeTracker.innerText = 0;
}
function handleTargets() {
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
function goHome() {
  gameOver(0);
  mouseInit(0);
  timeInit();
  timeTracker.innerText = 0;
  nav.classList.add("hide");
  mainMenu.classList.remove("hide");
  gameOverMenu.classList.add("hide");
  newRecord.classList.add("hide");
}

///// MAIN PROGRAMME

function main(moveMouse) {
  resize();
  mouseInit(moveMouse);
  timeInit();
  times.classList.remove("hide");
  nav.classList.remove("hide");
  newRecord.classList.add("hide");
  emptyTargets = 0;
  createTarget(targets.length, "default");
  mainMenu.classList.add("hide");
  gameOverMenu.classList.add("hide");
  if (!songPlaying){
    playSong();
  }
  if (!gameStart) {
    animate();
    gameStart = true;
  }
}

function animate(timestamp) {
  if (gameStart) {
    ctx.fillStyle = "rgba(35, 7, 10, 0.05)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    delta = timestamp - timer;
    if (timerStarted) {
      timeTracker.innerText = `${toSeconds(delta)}`;
    }
    // GAME LOOP
    if (emptyTargets > targets.length) {
      emptyTargets = 0;
      gameOver(1);
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
addEventListener("keydown", (e)=>{
  if(e.repeat){return;}
  switch(e.key){
    case 'r': case 'R':
      main();
    break;
  }
});
window.addEventListener('resize', goHome);