const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let WIDTH, HEIGHT;

function resize(){
  WIDTH = canvas.width = window.innerWidth - 4;
  HEIGHT = canvas.height = window.innerHeight - 4;
}

resize();

function animate(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // GAME LOOP


  requestAnimationFrame(animate);
}