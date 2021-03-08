class DemoFood {
  constructor(border) {
    // movement info
    this.x = random(border, width - border);
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speedMax = 1.5;
    this.speed = random(0, this.speedMax);
    this.ax = 0;
    this.ay = 0;
    this.accelerationMax = 2;
    this.accelerationX = random(-this.accelerationMax, this.accelerationMax);
    this.accelerationY = 0.3;
    // appearance info
    this.size = random(20,30);
    this.fillR = 255;
    this.fillG = random(165, 221);
    this.fillB = random(82, 185);
  }

  // Display fish food as a circle
  display() {
    push();
    fill(this.fillR, this.fillG, this.fillB);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // Move fish food with velocity and acceleration
  move() {
    // set the acceleration
    this.ax = this.accelerationX;
    this.ay = this.accelerationY;

    this.accelerationX = constrain(this.accelerationX, -this.accelerationMax, this.accelerationMax);

    // chance of changing direction of food
    let chance = random();
    // Set the velocity
    if (chance < 0.05) {
      this.vx = random(-this.speed, this.speed);
    }

    this.vy = this.speed;

    // Add velocity and acceleration to position
    this.x += this.vx + this.ax;
    this.y += this.vy + this.ay;

  }

  // Change current direction if user clicks left or right arrow key
  changeCurrent() {
    if (keyIsDown(LEFT_ARROW)) {
      this.accelerationX -= 0.05;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.accelerationX += 0.05;
    }
  }

  // Returns true if food is off screen
  offScreen() {
    if (this.y > height || this.x < 0 || this.x > width) {
      return true;
    } else {
      return false;
    }
  }

}
