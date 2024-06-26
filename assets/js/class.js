class Circle {
  constructor(config) {
    this.size = config.size;
    this.pos = config.pos;
    this.vel = config.vel;
    this.color = config.color;
    this.strokeBool = config.strokeBool;
    this.firstUpdate = true;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    if(this.strokeBool){
      ctx.strokeStyle = 'red';
      ctx.strokeWidth = 2;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}

function getTargetSize(){
  let result = 10;
    if(WIDTH > 700){
    result = getRandomInt(20, 55);
  }
  else if(WIDTH <= 700 && WIDTH > 400){
    result = getRandomInt(12, 30);
  }
  else {
    result = getRandomInt(8, 22);
  }
  return result;
}

class Target extends Circle {
  constructor(type, id) {
    let config;
    switch (type) {
      case "default":
      default:
        let size = getTargetSize();
        let posX = getRandomInt(size, WIDTH - size);
        let posY = getRandomInt(size, HEIGHT * 0.7 - size) + HEIGHT * 0.1;
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
        };
        break;
    }
    super(config);
    this.id = id;
  }
  // if spawning over another cirlce, relocate (WORKS 99% OF TIME)
  randomisePos(i) {
    if(this.checkContact(targets[i])){
      this.pos = {
        x: getRandomInt(this.size, WIDTH - this.size),
        y: getRandomInt(this.size, HEIGHT * 0.7 - this.size) + HEIGHT * 0.1
      };
      this.randomisePos(i);
    }
    else return;
  }
  checkContact(circle) {
    let dx = this.pos.x - circle.pos.x;
    let dy = this.pos.y - circle.pos.y;
    if (
      // DISTANCE LESS THAN HYPOTENUSE USING PYTHAG MEANS TOUCHING
      Math.sqrt(dx * dx + dy * dy) <
      this.size + circle.size
    ) {
      return true;
    }
  }
  update() {
    // CLEAR ON CLICK
    if(this.firstUpdate){
      for(let i = 0; i < targets.length; i++) {
        if(targets[i].id === this.id){
          continue;
        }
        this.randomisePos(i);
      }
    }
    if(mouse.fire){
      if(this.checkContact(mouse)){
        targets[this.id] = null;
      }
    }
    if (this.vel.x > 0 || this.vel.y > 0) {
      this.move();
    }
      this.draw();
      this.firstUpdate = false;
  }
}
