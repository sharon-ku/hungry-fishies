class Anemone extends Creature {
  constructor(x, y) {
    super(x, y);
    // position information
    this.x = x;
    this.y = y;
    // size information
    this.length = 202;
    this.width = 101;
    // animation information
    this.movingAnimation = loadAnimation('assets/images/creatures/anemone1.png', 'assets/images/creatures/anemone2.png');
    this.movingAnimation.frameDelay = 70; // number of frames between each frame
    this.sprite.addAnimation('moving', this.movingAnimation); // adding animation to the sprite
  }

}
