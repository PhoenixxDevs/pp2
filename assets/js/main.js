const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const mouse = {
  pos: { x: undefined, y: undefined },
  size: 1
}
const getRandomInt = function (min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let targetConfigs = {
  screenDimensions: { width: undefined, height: undefined },
  default: { 
    screen: this.screenDimensions,
    size: getRandomInt(10, 25),
    pos: { 
      x: getRandomInt(this.size, this.screen.width - this.size),
      y: getRandomInt(this.screen.height - this.size)
    },
    vel: {
      x: 0, y: 0
    },
    color: `hsl(${getRandomInt(200,250)}, 80%, 92%)`
  }
}
let WIDTH, HEIGHT;
let targets = new Array(50);

function resize(){
  WIDTH = canvas.width = targetConfigs.width = window.innerWidth - 4;
  HEIGHT = canvas.height = targetConfigs.height = window.innerHeight - 4;

}

function createTarget(config){
  for(let i = 0; i < config.amount; i++) {
    targets[i] = (new Target(config));
  }
}

function main(){
  resize();
  createTarget(targetConfigs.default);
  console.log(targets)
  animate();
}

function animate(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // GAME LOOP
  for(let i = 0; i < targets.length; i++) {
    targets[i].update();
  }

  requestAnimationFrame(animate);
}

addEventListener('mousemove', (e) => {
  mouse.pos.x = e.pageX;
  mouse.pos.y = e.pageY;
})

main();