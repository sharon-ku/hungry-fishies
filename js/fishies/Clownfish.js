class Clownfish extends Fish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2);
    // size information
    this.length = undefined;
    this.width = undefined;

    // movement information
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

    // vertical distance between fish's center and fish's butt
    this.vertDistBtwFishAndCloaca = undefined;

    // stores whether it is time to feed anemone or not
    this.timeToFeedAnemone = undefined;

    // minimum distance needed between fish and anemone for fish to release food securely to anemone
    this.distBufferToAnemone = {
      x: undefined, // minimum horizontal distance
      y: undefined, // minimum vertical distance
    };

    // is true if fish is keeping food inside its mouth
    this.foodInMouth = undefined;

    // ---
    // Acknowledgment!
    // I dedicate this part of the code to Pippin for helping me work through the logic
    // He recommended I make a "special" food separate from the fishFoods array to feed the anemone


    // Information on special food that clownfish draws and carries to anemone when time to feed anemone
    this.specialFood = {
      // position information
      x: undefined,
      y: undefined,
      // appearance information
      size: undefined,
      fillR: undefined,
      fillG: undefined,
      fillB: undefined,
      fillAlpha: undefined,
      // acceptable distance from anemone to consider that food is overlapping with it
      distForAnemoneToAccept: undefined,
    };
    // ---

  }

  // Decide if it is time for the clownfish to feed the anemone
  decideIfTimeToFeedAnemone() {
    super.decideIfTimeToFeedAnemone();
    // It is time to feed anemone 50% of the time
    if (random() < 0.5) {
      this.timeToFeedAnemone = true;
    } else {
      this.timeToFeedAnemone = false;
    }
  }

  // Fish swims to the anemone
  feedAnemone(anemone) {
    // Make sure fish stays inside the tank
    this.stayInTank();

    // Update x velocity:
    // if fish is to the left of anemone
    if (this.x < anemone.sprite.position.x - this.distBufferToAnemone.x) {
      this.vx = this.speed.swimmingToAnemone; // swim right
    }
    // else if fish is to right of anemone
    else if (this.x > anemone.sprite.position.x + this.distBufferToAnemone.x) {
      this.vx = -this.speed.swimmingToAnemone; // swim left
    }
    // else if fish is neither to left or right of anemone
    else {
      this.vx = 0; // keep x position
    }

    // Update y velocity:
    // if fish is on top of anemone
    if (this.y < anemone.sprite.position.y - this.distBufferToAnemone.y) {
      this.vy = this.speed.swimmingToAnemone; // swim down
    }
    // else if fish is under anemone
    else if (this.y > anemone.sprite.position.y + this.distBufferToAnemone.y) {
      this.vy = -this.speed.swimmingToAnemone; // swim up
    }
    // else if fish is neither over nor under anemone
    else {
      this.vy = 0; // keep y position
    }

    // Update x and y position with velocity values
    this.x += this.vx;
    this.y += this.vy;
  }

  // Return true if fish interacted with food, either by storing it in its mouth or eating it
  // Override interactsWithFood method from Fish.js
  interactsWithFood(fishFood, anemone, fishName) {
    // If food overlaps with fish's body
    if (this.overlapsWith(fishFood)) {
      // If it's time to feed anemone and the fish does not already have a food in its mouth AND the food overlaps with the fish's body
      if (this.timeToFeedAnemone && !this.foodInMouth) {
        // then now the fish has a food in its mouth
        this.foodInMouth = true;
      }

      // If it's not time to feed anemone and the food overlaps with the fish's body
      else if (!this.timeToFeedAnemone) {
        // update numFoodEaten counter
        this.numFoodEaten++;
        // check if fish is full
        if (this.numFoodEaten === totalFood) {
          this.isFull = true;
        }
        // and decide if the next food it receives will be fed to the anemone
        this.decideIfTimeToFeedAnemone();
      }
      // return true since fish interacted with food when food overlapped with fish (by either storing it in its mouth or eating it)
      return true;
    }

    // if none of the above conditions were met, it means that fish did not interact with food: return false
    return false;

  }

  // Display a special fish food as a round circle; this food will be fed to the anemone
  displaySpecialFood() {
    push();
    fill(this.specialFood.fillR, this.specialFood.fillG, this.specialFood.fillB, this.specialFood.fillAlpha);
    ellipse(this.specialFood.x, this.specialFood.y, this.specialFood.size);
    pop();
  }

  // If food is close enough to be eaten by anemone, return true
  specialFoodCloseToAnemone(anemone) {
    if (this.specialFood.x < (anemone.sprite.position.x + this.specialFood.distForAnemoneToAccept) &&
      this.specialFood.x > (anemone.sprite.position.x - this.specialFood.distForAnemoneToAccept) &&
      this.specialFood.y < (anemone.sprite.position.y + this.specialFood.distForAnemoneToAccept) &&
      this.specialFood.y > (anemone.sprite.position.y - this.specialFood.distForAnemoneToAccept)) {
      // console.log(`yes, food close to anemone`);
      return true;

    } else {
      // console.log(`NOPE, food not close to anemone`);
      return false;

    }
  }

  // Set fish food to fish's mouth position and move food with fish
  moveSpecialFood() {
    // Set y value to same y value as fish plus any offset to make sure food position matches mouth position of fish image
    this.specialFood.y = this.y + this.specialFood.yOffset;

    // Set x value to fish's mouth's x position
    if (this.scale.x > 0) { // if fish facing right
      this.specialFood.x = this.x + this.length / 2; // food on right side of body
    } else { // else if fish facing left
      this.specialFood.x = this.x - this.length / 2; // food on left side of body
    }
  }



}
