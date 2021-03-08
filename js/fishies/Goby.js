class Goby extends Fish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2);
    // size information
    this.length = 108.3;
    this.width = 32.5;

    // movement information
    this.speed = {
      casualSwimming: 6,
      followingFinger: 2.5,
    };
    this.buffer = 30; // stop moving fish when it is within a certain buffer of the finger

    // variables used for perlin noise
    this.tx = 50;
    this.ty = 100;
    this.txChange = 0.01;
    this.tyChange = 0.05;

    // radius around fish where it can spot finger
    this.fieldOfVision = 350;

    // vertical distance between fish's center and fish's butt
    this.vertDistBtwFishAndCloaca = 3;

    // is true if fish is keeping food inside its mouth
    this.foodInMouth = false;
  }

}
