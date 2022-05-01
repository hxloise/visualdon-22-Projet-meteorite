import img from '../../img/mete.png';
export default class Sprite {

  constructor({ x = 0, y = 0, src = img, width = 25, height = 25, velX = 0, velY = 0 } = {}) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.src = src;
    this.image = new Image();
    this.image.src = this.src;
    this.velX = velX;
    this.velY = velY;
  }

  draw(ctx) {
    // draw image
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

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
}