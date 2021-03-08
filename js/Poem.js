class Poem {
  constructor(poemFont, x, y) {
    // string information
    this.poemLines = `All the fishies are now well fed,
      Watch them go, off to bed...
      They suddenly feel something moving in their bellies,
      Looks like they gave birth to adorable food babies!`;
    this.font = poemFont;
    // position information
    this.x = x;
    this.y = y;
    // appearance information
    this.size = 30;
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
  }

  // Display lines of poem
  display() {
    push();
    textAlign(CENTER);
    fill(this.fill.r, this.fill.g, this.fill.b);
    textFont(this.font, this.size);
    text(this.poemLines, this.x, this.y);
    pop();
  }
}
