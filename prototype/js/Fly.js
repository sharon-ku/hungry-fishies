class Fly {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    this.fill = 255;
    this.alpha = 255;
    this.size = 15;
  }

  // display a fly
  display() {
    push();
    noStroke();
    fill(this.fill, this.fill, this.fill, this.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // move fly randomly
  move(frog) {
    // constraining the fly's movement to the inside of the canvas
    this.x = constrain(this.x, frog.width / 2, width - frog.width / 2);
    this.y = constrain(this.y, frog.height / 2, height - frog.height / 2);

    // change allows me to adjust the jitteriness of the fly's movement
    let change = random();

    // change direction 1% of the time
    if (change < 0.01) {
      // choose random velocity within the speed limit
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // adding velocity to fly's position
    this.x += this.vx;
    this.y += this.vy;
  }

  // computes distance between one end of the frog to the fly
  calculatedDistanceBtwFlyAndFrog(frog) {
    // distance between fly and frog
    let distBtwFlyAndFrog;

    // calculating distance between frog and bug depending on direction that frog is facing
    if (frog.scale.x > 0) { // if frog is facing right side
      // calculate distance from right end of frog to fly's center
      distBtwFlyAndFrog = dist(frog.x, frog.y, this.x, this.y);
    } else { // if frog is facing left side
      // calculate distance from left end of frog to fly's center
      distBtwFlyAndFrog = dist(frog.x, frog.y, this.x, this.y);
    }

    // return calculated distance value
    return distBtwFlyAndFrog;
  }

  // returns true if frog is within slapping range of the frog
  isWithinSlappingRange(frog) {
    if (this.calculatedDistanceBtwFlyAndFrog(frog) < slappingDistance) {
      return true;
    } else {
      return false;
    }
  }

  // if the distance between the fly and the frog is within slapping distance, cue frog's method slapTongueDown()
  getSlappedByFrog(frog) {
    // IF FLY IS WITHIN RANGE PLUS GETS SLAPPED - NEED TO CALCULATE OVERLAP - THEN REMOVE FROM ARRAY (to work on later)
    if (this.isWithinSlappingRange(frog) && !frog.stopSlap) {
      this.alpha=0;
      // frog.slapTongueDown();
      // I NEED TO REMOVE FLY FROM ARRAY HERE
    }
  }

}
