class Creature {
  constructor(x, y) {
    // movement information
    this.x = x;
    this.y = y;
    this.vx = undefined;
    this.vy = undefined;
    this.speed = undefined;
    // size information
    this.length = undefined;
    this.width = undefined;
    // animation information
    this.sprite = createSprite(this.x, this.y, this.length, this.width);
    this.movingAnimation = loadAnimation(undefined, undefined);
    this.movingAnimation.frameDelay = undefined; // delay between each frame
    this.sprite.addAnimation('moving', this.movingAnimation); // adding animation to the sprite
  }

  // Move creature
  move() {

  }

  // Returns true if the subject overlaps with creature's body
  overlapsWith(subject) {
    if ((subject.x < this.x + this.length / 2) &&
      (subject.x > this.x - this.length / 2) &&
      (subject.y < this.y + this.width / 2) &&
      (subject.y > this.y - this.width / 2)) {
      return true;
    } else {
      return false;
    }
  }


}
