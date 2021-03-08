class Fish {
  constructor(fishImg1, fishImg2) {
    // image information
    this.img1 = fishImg1;
    this.img2 = fishImg2;
    this.currentImage = fishImg1; // Set fish's current image to first image
    this.framesElapsed = 0;
    this.framesBtwEachImage = 50;

    // size information
    this.length = undefined;
    this.width = undefined;
    this.scale = {
      x: 1,
      y: 1,
    };

    // movement information
    this.x = random(0, width);
    this.y = random(0, height);
    this.vx = 0;
    this.vy = 0;
    this.speed = {
      casualSwimming: undefined,
      followingFinger: undefined,
      swimmingToAnemone: undefined,
    };
    this.buffer = undefined; // stop moving fish when it is within a certain buffer of the finger

    // variables used for perlin noise
    this.tx = undefined;
    this.ty = undefined;
    this.txChange = undefined;
    this.tyChange = undefined;

    // radius around fish where it can spot finger
    this.fieldOfVision = undefined;

    // tracks how many pieces of food fish has eaten
    this.numFoodEaten = 0;

    // tracks if fish is full
    this.isFull = false;

    // position of cloaca (aka orifice from which fish releases the poop)
    this.cloacaX = 0;
    this.cloacaY = 0;
    this.vertDistBtwFishAndCloaca = undefined;

    // stores whether it is time to feed anemone or not
    this.timeToFeedAnemone = false;

    // is true if fish is keeping food inside its mouth
    this.foodInMouth = undefined;
  }

  // Fish faces direction it is swimming
  setDirection() {
    push();
    translate(this.x, this.y);
    if (this.vx > 0) {
      this.scale.x = 1; // face right
    } else {
      this.scale.x = -1; // face left
    }
    pop();
  }

  // Display fish
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.x, this.scale.y);
    this.setDirection(); // Fish faces the direction it is swimming
    image(this.currentImage, 0, 0, this.length, this.width);
    pop();
  }

  // Fish switches between image 1 and image 2
  switchImages() {
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.currentImage === this.img1) {
        this.currentImage = this.img2;
      } else {
        this.currentImage = this.img1;
      }
      this.framesElapsed = 0;
    }
  }

  // Ensure that fish stays in tank
  stayInTank() {
    this.x = constrain(this.x, fishTank.border, width - fishTank.border);
    this.y = constrain(this.y, fishTank.border, height - fishTank.border);
  }

  // Fish swims randomly using Perlin noise
  casualSwimming(fishTank) {
    // Make sure fish stays inside the tank
    this.stayInTank();

    this.tx += this.txChange;
    this.ty += this.tyChange;

    let noiseX = noise(this.tx);
    let noiseY = noise(this.ty);

    let chanceOfChangingDirections = random();

    if (chanceOfChangingDirections < 0.05) {
      this.vx = map(noiseX, 0, 1, -this.speed.casualSwimming, this.speed.casualSwimming);
      this.vy = map(noiseY, 0, 1, -this.speed.casualSwimming, this.speed.casualSwimming);
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  // Returns true if finger is within the fish's field of vision
  sensesFinger(finger) {
    if (dist(this.x, this.y, finger.x, finger.y) < this.fieldOfVision) {
      return true;
    } else {
      return false;
    }
  }

  // The fish follows the finger
  followsFinger(finger) {
    // Make sure fish stays inside the tank
    this.stayInTank();

    // Calculating distance from fish to finger
    let distX = this.x - finger.x;
    let distY = this.y - finger.y;

    // Fish's velocity changes depending on where the finger is with respect to its body
    if (distX < -this.buffer) {
      this.vx = this.speed.followingFinger;
    } else if (distX > this.buffer) {
      this.vx = -this.speed.followingFinger;
    } else {
      this.vx = 0; // Stop moving if the fish is within buffer of the finger
    }
    if (distY < 0) {
      this.vy = this.speed.followingFinger;
    } else if (distY > 0) {
      this.vy = -this.speed.followingFinger;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Setting the fish's direction (facing left or facing right)
    if (this.vx > 0) {
      this.scale.x = 1; // face right
    } else if (this.vx < 0 || this.vx === 0) {
      this.scale.x = -1; // face left
    }
  }

  // Returns true if the subject overlaps with fish's body
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

  // Decide if it is time for the clownfish to feed the anemone
  decideIfTimeToFeedAnemone() {}

  // If food overlaps with fish's body, add to numFoodEaten counter of fish, check if fish is full, and return true
  // Note: if fish is clownfish, this method is overriden by its specific interactsWithFood method
  interactsWithFood(fishFood, anemone, fishName) {
    // If fish overlaps with food, update numFoodEaten counter
    if (this.overlapsWith(fishFood)) {
      this.numFoodEaten++;
      // check if fish is full
      if (this.numFoodEaten === totalFood) {
        this.isFull = true;
      }
      return true;
    }
    return false;
  }

  // Calculating position of fish's cloaca
  determineCloacaLocation() {
    // Calculating x position of cloaca
    if (this.scale.x < 0) { // fish is facing left
      this.cloacaX = this.x + this.length / 2;
    } else { // fish is facing right
      this.cloacaX = this.x - this.length / 2;
    }

    // Calculating y position of cloaca
    this.cloacaY = this.y + this.vertDistBtwFishAndCloaca;
  }


  // Display and move poop; the poop comes out of the fish's cloaca
  displayAndMovePoop(poops) {
    for (let i = poops.length - 1; i >= 0; i--) {
      poops[i].show(this.cloacaX, this.cloacaY);
      poops[i].move();
    }
  }

  // Release a line of poop by adding more poop pebbles to the poops array
  releasePoopLine(poops) {
    let addPoop = new Poop(this.cloacaX, this.cloacaY);
    poops.push(addPoop);
  }

  // To ensure that poop does not get too long, remove first poop from array after a certain amount of poop pebbles have been released
  removePoop(poops, totalNumPoops) {
    if (poops.length > totalNumPoops) {
      poops.shift();
    }
  }

  // Display, move, and release poopline behind fish
  pooping(poops, totalNumPoops) {
    // Determine the location of fish's cloaca (where poop comes out)
    this.determineCloacaLocation();
    // Display and move poop
    this.displayAndMovePoop(poops);
    // Release a line of poop
    this.releasePoopLine(poops);
    // Remove poop when there are too many to handle
    this.removePoop(poops, totalNumPoops);
  }

}
