class Poop {
  constructor(fishX, fishY) {
    // movement information
    this.x = fishX;
    this.y = fishY;
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
    this.ax = 0;
    this.ay = 0;
    this.acceleration = 3.5;
    // size information
    this.size = 2;
    // poop brown color
    this.fill = {
      r: 102,
      g: 75,
      b: 0,
    };
  }

  // display poop pebble as circles
  show() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // poop flows upwards --> it knows how to fly!
  move() {
    // set acceleration
    this.ay = -this.acceleration;
    // set velocity
    this.vx = this.speed;
    this.vy = this.speed;
    // set position
    this.x +=  this.vx + this.ax;
    this.y +=  this.vy + this.ay;
  }
}
