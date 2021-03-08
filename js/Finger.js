class Finger {
  constructor() {
    // position information
    this.x= 100;
    this.y= 100;
    // appearance Information
    this.size= 40;
    this.fill= { // light cyan
      r: 220,
      g: 255,
      b: 250,
      alpha: 180,
    };
  }

  // Display finger (user circle)
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // Finger follows mouse position
  move() {
    this.x = mouseX;
    this.y = mouseY;
  }
}
