import imgStony from '../../public/img/meteYellow.png';
import imgIron from '../../public/img/meteGreen.png';
import imgStonyIron from '../../public/img/metePink.png';
export default class Imgs {

  constructor({ x = 0, y = 0, type = ' ', src = imgStony, width = 25, height = 25, velX = 0, velY = 0 } = {}) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.type = type;
    this.src = src;
    this.image = new Image();
    this.image.src = this.src;
    this.velX = this.width / 1500;
    this.velY = this.height / 1500;

  }

  draw(ctx) {
    // draw image
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

  }

  conpareSize(b) {
    return this.height - b.height;
  }

  move(dt) {
    this.x -= this.velX * dt;
    this.y += this.velY * dt;
  }

  changeVelocite(angle) {
    let speed = Math.sqrt(this.velX ** 2 + this.velY ** 2); //trouver l'hypothénuse
    this.velX = Math.cos(angle) * speed;
    this.velY = Math.sin(angle) * speed;
  }

  setSrc(type) {
    switch (type) {
      case 'Stony':
        this.src = imgStony
        break
      case 'Iron':
        this.src = imgIron
        break
      case 'StoneyIron':
        this.src = imgStonyIron
        break
    }
    this.image.src = this.src
  }
}