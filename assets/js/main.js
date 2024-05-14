const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  pos: { x: undefined, y: undefined },
  size: 1,
  fire: false
};
let WIDTH, HEIGHT, targetDefinitions;
let targets = new Array(50);

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

function main() {
  resize();
  createTarget(10, 'default');
  console.log(targets);
  animate();
}

function animate() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // GAME LOOP
  for (let i = 0; i < targets.length; i++) {
    if (!targets[i]) {
      continue;
    }
    else { targets[i].update(); }
  }

  mouse.fire = false;
  requestAnimationFrame(animate);
}

addEventListener("mousemove", (e) => {
  mouse.pos.x = e.pageX;
  mouse.pos.y = e.pageY;
});
addEventListener('mousedown', (e) => {
  if(e.repeat){
    return;
  }
  mouse.fire = true;
});
addEventListener('mouseup', () => {
  mouse.fire = false;
})

main();
