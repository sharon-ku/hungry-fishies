class ButtonShape extends Button {
  constructor(x,y) {
    super(x,y);
    // movement information
    this.vx = 0.5;
    this.vy = 0.5;
    this.speed = 2;
    this.chanceOfChangingDirections = 0;
    // size information
    this.size = undefined;
    this.sizeBigger = undefined;
    this.sizeSmaller = undefined;
    // color information
    this.fill = {
      r: undefined,
      g: undefined,
      b: undefined,
      alpha: undefined,
    };
  }

  // display the button
  display() {
    super.display();

    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // move the button randomly
  move() {
    super.move();
    // generates a random number between 0 and 1
    this.chanceOfChangingDirections = random();
    // change direction only a certain percentage of the time
    if (this.chanceOfChangingDirections < 0.005) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }
    this.x += this.vx;
    this.y += this.vy;
  }
}
