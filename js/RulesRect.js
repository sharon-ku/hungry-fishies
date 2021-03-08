class RulesRect {
  constructor() {
    // position information
    this.x = width/2;
    this.y = height/2;
    // distance to edge of tank
    this.distToEdge = 50;
    // size information
    this.length = width - this.distToEdge;
    this.height = height - this.distToEdge;
    this.cornerRadius = 50;
    // color information
    this.fill = {
      r: 4,
      g: 81,
      b: 101,
      alpha: 220,
    };
  }

  // display the rounded rectangle behind the instructions
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    rectMode(CENTER);
    rect(this.x, this.y, this.length, this.height, this.cornerRadius);
    pop();
  }

}
