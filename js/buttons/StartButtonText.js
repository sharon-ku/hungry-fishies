class StartButtonText extends ButtonText {
  constructor(x, y, typeface) {
    super(x, y, typeface);
    this.string = `START`;
    this.typeface = typeface;
    this.size = 30;
    this.sizeBigger = 40;
    this.sizeSmaller = 30;
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
  }

}
