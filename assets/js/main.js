const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const mouse = {
  pos: { x: undefined, y: undefined },
  size: 1
}

let WIDTH, HEIGHT;
let targets = new Array(50);



function resize(){
  WIDTH = canvas.width = window.innerWidth - 4;
  HEIGHT = canvas.height = window.innerHeight - 4;
}

function main(){
  resize();
  animate();
}

function animate(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // GAME LOOP


  requestAnimationFrame(animate);
}

addEventListener('mousemove', (e) => {
  mouse.pos.x = e.pageX;
  mouse.pos.y = e.pageY;
})