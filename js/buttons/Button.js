class Button {
  constructor(x, y, typeface) {
    // movement information
    this.x = x;
    this.y = y;
    this.vx = undefined;
    this.vy = undefined;
    this.speed = undefined;
    this.chanceOfChangingDirections = undefined;
    // size information
    this.size = undefined;
    this.sizeBigger = undefined;
    this.sizeSmaller = undefined;
    this.sizeChangeRate = 0.4;
    this.grow = true;
    // fill information
    this.fill = {
      r: undefined,
      g: undefined,
      b: undefined,
      alpha: undefined,
    };
    // information for text inside the button
    this.string = undefined;
    this.typeface = undefined;
  }

  // display the button
  display() {

  }

  // move the button
  move() {

  }

  // button changes sizes when mouse hovers over it
  hover() {
    if (this.grow) {
      this.size += this.sizeChangeRate;
      if (this.size >= this.sizeBigger) {
        this.grow = false;
      }
    } else {
      this.size -= this.sizeChangeRate;
      if (this.size <= this.sizeSmaller) {
        this.grow = true;
      }
    }
  }

  // button keeps small size when mouse is not hovering over it
  setNormalSize() {
    this.size = this.sizeSmaller;
  }
}
