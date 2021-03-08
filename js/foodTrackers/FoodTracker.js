class FoodTracker {
  constructor(foodTrackerImg) {
    // movement information for rectangular tracker
    this.x = width - 200;
    this.y = undefined;
    // size information for rectangular tracker
    this.length = 0;
    this.totalLength = 124.8;
    this.height = 10.4;
    this.radius = 15; //radius of edge of rounded rectangle
    // color information for rectangular tracker
    this.fill = { // lime green
      r: 219,
      g: 220,
      b: 100,
    };

    // this image surrounds the tracker
    this.containerImage = {
      img: foodTrackerImg,
      xOffset: -54, // horizontal offset from rectangular tracker's x position
      yOffset: -24, // vertical offset from rectangular tracker's y position
      length: 188.8,
      height: 59.2,
    };
  }

  // display the food tracker
  display() {
    push();
    // display food tracker image
    image(this.containerImage.img, this.x+this.containerImage.xOffset, this.y+this.containerImage.yOffset, this.containerImage.length, this.containerImage.height);

    // display rectangular bar that updates when fish eats food
    fill(this.fill.r, this.fill.g, this.fill.b);
    rect(this.x, this.y, this.length, this.height, this.radius);
    pop();
  }

  // Update food tracker every time food is eaten by fish
  updateBar(fish, totalFood) {
    this.length = map(fish.numFoodEaten, 0, totalFood, 0, this.totalLength);

    // ensure that bar does not exceed its total length
    if (fish.numFoodEaten >= totalFood) {
      this.length = this.totalLength;
    }
  }

}
