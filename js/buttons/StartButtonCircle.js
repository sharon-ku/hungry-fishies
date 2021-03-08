class StartButtonCircle extends ButtonShape {
  constructor(x,y) {
    super(x,y);

    this.size = 130;
    this.sizeBigger = 150;
    this.sizeSmaller = 130;
    this.fill = {
      // vivid sky blue
      r: 10,
      g: 205,
      b: 255,
      alpha: 220,
    };
  }
}
