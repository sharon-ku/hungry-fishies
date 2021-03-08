class Snail extends Creature {
  constructor(x, y) {
    super(x, y);
    // movement information
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = 0.5;
    // size information
    this.length = 73;
    this.width = 83;
    // animation information
    this.movingAnimation = loadAnimation('assets/images/creatures/snail1.png', 'assets/images/creatures/snail2.png');
    this.movingAnimation.frameDelay = 70;
    this.sprite.addAnimation('moving', this.movingAnimation);
  }

  // Move snail towards right
  move() {
    super.move();
    this.vx = this.speed;
    this.sprite.position.x += this.vx;
  }


}
