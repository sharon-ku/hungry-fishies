class ReadyButtonText extends ButtonText {
  constructor(x, y, typeface) {
    super(x, y, typeface);
    this.string = `READY!`;
    this.typeface = typeface;
    this.size = 40;
    this.sizeBigger = 50;
    this.sizeSmaller = 40;
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
  }

}
