class ButtonText extends Button {
  constructor(x, y, typeface) {
    super(x, y, typeface);
    // information for text inside button
    this.string = undefined;
    this.typeface = undefined;
    this.size = undefined;
    this.sizeBigger = undefined;
    this.sizeSmaller = undefined;
    this.fill = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
  }

  // display the text
  display() {
    super.display();

    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    textFont(this.typeface);
    text(this.string, this.x, this.y);
    pop();
  }

  // set the text to move with the button shape's position
  move(buttonShape) {
    super.move();

    this.x = buttonShape.x;
    this.y = buttonShape.y;
  }
}
