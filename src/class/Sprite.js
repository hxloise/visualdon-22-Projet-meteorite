export default class Sprite {

  constructor({ x = 0, y = 0, src = '../../img/mete.png', width = 25, height = 25, velX = 0, velY = 0 } = {}) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.src = src;
    this.img = new Image();
    this.img.src = this.src;
    this.velX = velX;
    this.velY = velY;
  }

  draw(ctx) {
    // draw image
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // set composite mode

  }

  setColor(color) {
    this.color = color;
  }

  move(dt) {
    this.x += this.velX * dt;
    this.y += this.velY * dt;
  }
  bounceOffTheWalls(ctx) {
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;

    if (this.x + this.width > width) {
      this.velX = -Math.abs(this.velX);
      this.x = width - this.width;
    }

    if (this.x < 0) {
      this.velX = +Math.abs(this.velX);
      this.x = 0;
    }

    if (this.y + this.height > height) {
      this.velY = -Math.abs(this.velY);
      this.y = height - this.height;
    }

    if (this.y < 0) {
      this.velY = +Math.abs(this.velY);
      this.y = 0;
    }
  }
  changeVelocite(angle) {
    let speed = Math.sqrt(this.velX ** 2 + this.velY ** 2); //trouver l'hypothénuse
    this.velX = Math.cos(angle) * speed;
    this.velY = Math.sin(angle) * speed;
  }

  isInHitbox(x, y, width, height) {
    return this.x >= x - width / 2 &&
      this.x <= x + width / 2 &&
      this.y >= y - height / 2 &&
      this.y <= y + height / 2
      ? true
      : false;

  }
}