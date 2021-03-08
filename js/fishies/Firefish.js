class Firefish extends Fish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2);
    // size information
    this.length = 160;
    this.width = 66;

    // movement information
    this.speed = {
      casualSwimming: 5,
      followingFinger: 1.5,
    };
    this.buffer = 10; // stop moving fish when it is within a certain buffer of the finger

    // variables used for perlin noise
    this.tx = 0;
    this.ty = 10;
    this.txChange = 0.025;
    this.tyChange = 0.025;

    // radius around fish where it can spot finger
    this.fieldOfVision = 350;

    // vertical distance between fish's center and fish's butt
    this.vertDistBtwFishAndCloaca = 10;

    // is true if fish is keeping food inside its mouth
    this.foodInMouth = false;
  }


}
