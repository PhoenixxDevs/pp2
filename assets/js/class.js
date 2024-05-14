class Circle {
  constructor(config) {
    this.size = config.size;
    this.pos = config.pos;
    this.vel = config.vel;
    this.color = config.color;
  }
  draw(){
    ctx.fillStyle = config.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  move(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  update() {
    this.draw();
  }
}