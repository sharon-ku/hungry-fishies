class DemoFoodTracker {
  constructor(foodTrackerImg) {
    // size information
    this.length = 312;
    this.lengthIncreaseSpeed = 2;
    this.lengthIncreaseAcceleration = {
      current: 1,
      min: 1,
      max: -1.2,
    }
    this.totalLength = 312;
    this.height = 26;
    this.radius = 15; //radius of edge of rounded rectangle

    // position information
    this.x = width/2 - this.length/2;
    this.y = height/2+70 - this.height/2;

    // color information
    this.fill = { // lime green
      r: 219,
      g: 220,
      b: 100,
    };

    // this image surrounds the green tracker bar
    this.containerImage = {
      img: foodTrackerImg,
      xOffset: -132,
      yOffset: -62,
      length: 471,
      height: 152,
    };
  }

  // Display the food tracker
  display() {
    push();
    // display food tracker image
    image(this.containerImage.img, this.x+this.containerImage.xOffset, this.y+this.containerImage.yOffset, this.containerImage.length, this.containerImage.height);

    // display bar that updates when fish eats food
    fill(this.fill.r, this.fill.g, this.fill.b);
    rect(this.x, this.y, this.length, this.height, this.radius);
    pop();
  }

  // Food tracker fills up, then empties and refills
  increaseBar() {
    // Increase the food tracker bar until it is full
    if (this.length < this.totalLength) {
      this.length += this.lengthIncreaseSpeed + this.lengthIncreaseAcceleration.current;

      // Food tracker's length change rate deccelrates as it gets more full (this is just a nice effect)
      this.lengthIncreaseAcceleration.current = map(this.length, 0, this.totalLength, this.lengthIncreaseAcceleration.min, this.lengthIncreaseAcceleration.max);
    }

    // If food tracker is full, reset it to zero
    else if (this.length >= this.totalLength) {
      this.length = 0;
    }
  }

  // Returns true if bar is almost full
  isAlmostFull() {
    if (this.length > this.totalLength * 9/10) {
      return true;
    }
    else {
      return false;
    }
  }


}
