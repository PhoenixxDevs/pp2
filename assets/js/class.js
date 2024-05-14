class Circle {
  constructor(config) {
    this.size = config.size;
    this.pos = config.pos;
    this.vel = config.vel;
    this.color = config.color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}

class Target extends Circle {
  constructor(type, id) {
    let config;
    switch (type) {
      case "default":
      default:
        let size = getRandomInt(10, 25);
        let posX = getRandomInt(size, WIDTH - size);
        let posY = getRandomInt(size, HEIGHT - size);
        config = {
          size:size,
          pos: {
            x: posX,
            y: posY,
          },
          vel: {
            x: 0,
            y: 0,
          },
          color: `hsl(${getRandomInt(100, 350)} 90% 92%)`,
        }
        break;
    }
    super(config);
    this.id = id;
  }
  checkContactMouse() {
    let dx = this.pos.x - mouse.pos.x;
    let dy = this.pos.y - mouse.pos.y;
    if (
      // DISTANCE LESS THAN HYPOTENUSE USING PYTHAG MEANS TOUCHING
      Math.sqrt(dx * dx + dy * dy) <
      this.size + mouse.size
    ) {
      return true;
    }
  }
  update() {
    if(this.checkContactMouse() && mouse.fire){
      targets[this.id] = null;
    }
    if (this.vel.x > 0 || this.vel.y > 0) {
      this.move();
    }
      this.draw();
  }
}
