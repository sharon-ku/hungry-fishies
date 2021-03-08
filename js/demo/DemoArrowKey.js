class DemoArrowKey {
  constructor() {
    // position information
    this.x = undefined;
    this.y = height/2;
    // appearance information for the square that arrow key will be inside
    this.size = 100;
    this.cornerRadius = 10;
    this.fill = 0;
    // vertices of triangle that form the arrow
    this.triangle = {
      x1: undefined,
      y1: undefined,
      x2: undefined,
      y2: undefined,
      x3: undefined,
      y3: undefined,
      fill: undefined,
    };
    // alpha for both the square and triangle
    this.alpha = {
      current: 255,
      min: 80,
      max: 255,
    };
    // arrow key that needs to be pressed
    this.arrowKey = undefined;
  }

  // Display arrow key
  display() {
    // display the square that represents the button that arrow key is inside
    push();
    rectMode(CENTER);
    fill(this.fill, this.fill, this.fill, this.alpha.current);
    square(this.x, this.y, this.size, this.cornerRadius);
    pop();

    // display the triangle that represents the arrow key
    push();
    translate(this.x, this.y);
    fill(this.triangle.fill, this.triangle.fill, this.triangle.fill, this.alpha.current);
    // triangle made of up 3 vertices
    triangle(this.triangle.x1, this.triangle.y1,
      this.triangle.x2, this.triangle.y2,
      this.triangle.x3, this.triangle.y3);
    pop();
  }

  // Change alpha if user holds down on the arrow key
  changeAlpha() {
    // if arrow key pressed, set displayed button's alpha to max
    if (keyIsDown(this.arrowKey)) {
      this.alpha.current = this.alpha.max;
    }
    // else if not pressed, set displayed button's alpha to min
    else {
      this.alpha.current = this.alpha.min;
    }
  }

}
