class Momo extends Clownfish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2);
    // size information
    this.length = 97;
    this.width = 50;

    // movement information
    this.speed = {
      casualSwimming: 4,
      followingFinger: 2,
      swimmingToAnemone: 2.5,
    };
    this.buffer = 10; // stop moving fish when it is within a certain buffer of the finger

    // variables used for perlin noise
    this.tx = 50;
    this.ty = 20;
    this.txChange = 0.006;
    this.tyChange = 0.050;

    // radius around fish where it can spot finger
    this.fieldOfVision = 350;

    // vertical distance between fish's center and fish's butt
    this.vertDistBtwFishAndCloaca = 0;

    // stores whether it is time to feed anemone or not
    this.timeToFeedAnemone = true;

    // minimum distance needed between fish and anemone for fish to release food securely to anemone
    this.distBufferToAnemone = {
      x: 20, // minimum horizontal distance
      y: 20, // minimum vertical distance
    }

    // is true if fish is keeping food inside its mouth
    this.foodInMouth = false;

    // Information on special food that clownfish draws and carries to anemone when time to feed anemone
    this.specialFood = {
      // position information
      x: 0,
      y: 0,
      yOffset: 0, // y distance offset from fish image's mouth position
      // appearance information
      size: 15,
      fillR: 255,
      fillG: 221,
      fillB: 185,
      fillAlpha: 255,
      // acceptable distance from anemone to consider that food is overlapping with it
      distForAnemoneToAccept: 70,
    };
  }


}
