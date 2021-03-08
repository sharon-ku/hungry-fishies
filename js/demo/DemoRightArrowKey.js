class DemoRightArrowKey extends DemoArrowKey {
  constructor() {
    super();
    // x position of arrow key
    this.x = width-150;
    // vertices of triangle that form the arrow
    this.triangle = {
      x1: -this.size/5,
      y1: this.size/4,
      x2: this.size/4,
      y2: 0,
      x3: -this.size/5,
      y3: -this.size/4,
      fill: 255,
    };
    // arrow key that needs to be pressed
    this.arrowKey = RIGHT_ARROW;
  }

}
