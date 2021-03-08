class DemoFish {
  constructor(fishImg1, fishImg2) {
    // image information
    this.img1 = fishImg1;
    this.img2 = fishImg2;
    this.currentImage = fishImg1; // Set fish's current image to first image
    this.framesElapsed = 0; // tracks frames that have passed between each image
    this.framesBtwEachImage = 50; // frames needed to switch between each image

    // size information
    this.length = 320;
    this.height = 131;
    this.heightOffset = 50; // to account for firefish's dorsal (top) fin
    this.scale = {
      x: 1,
      y: 1,
    };

    // movement information
    this.x = -200;
    this.y = height-250;
    this.xDestination = -50;
    this.vx = 0;
    this.vy = 0;
    this.speed = {
      casualSwimming: 3,
      followingFinger: 1.8,
    };
    // stop moving fish when it is within a certain buffer of the finger
    this.buffer = {
      x: 50,
      y: 0.005,
    };

    // radius around fish where it can spot finger
    this.fieldOfVision = 450;

    // circle that expands around demoFish
    this.ring = {
      // stroke information
      strokeWeight: 5,
      strokeFill: {
        r: 255,
        g: 255,
        b: 255,
      },
      // alpha information (for stroke fill)
      alpha: {
        current: 0,
        min: 0,
        max: 100,
      },
      // size information
      size: {
        current: -50,
        min: -50,
        max: 700,
        increaseRate: 8,
      },
    };

    // set to true if it's time for fish to sense finger
    this.timeToSenseFinger = false;

    // tracks how many food the fish has eaten
    this.numFoodEaten = 0;

    // "I'm Full" text information
    this.imFullText = {
      text: "I'm full!",
      size: 20,
      fill: 255,
    };
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

  // Display demoFish
  display() {
    this.switchImages();
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.x, this.scale.y);
    image(this.currentImage, 0, 0, this.length, this.height);
    pop();
  }

  // Display circle that expands around demoFish
  displayRing() {
    push();
    noFill();
    strokeWeight(this.ring.strokeWeight);
    stroke(this.ring.strokeFill.r, this.ring.strokeFill.g, this.ring.strokeFill.b, this.ring.alpha.current);
    ellipse(this.x, this.y, this.ring.size.current);
    pop();
  }

  // Increase the ring size attached to demoFish
  increaseRingSize() {
    // increase the ring's size until it reaches max size
    if (this.ring.size.current < this.ring.size.max) {
      this.ring.size.current += this.ring.size.increaseRate;
    }
    // if ring reaches max size, set it back to min size
    else if (this.ring.size.current >= this.ring.size.max) {
      this.ring.size.current = this.ring.size.min;
    }
  }

  // Change the alpha of the ring, mapped to its size
  // As ring expands, its alpha decreases
  changeRingAlpha() {
    this.ring.alpha.current = map(this.ring.size.current, this.ring.size.min, this.ring.size.max, this.ring.alpha.max, this.ring.alpha.min);
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
    // Calculating distance from fish to finger
    let distX = this.x - finger.x;
    let distY = this.y - finger.y;

    // Fish's velocity changes depending on where the finger is with respect to its body
    if (distX < -this.buffer.x) {
      this.vx = this.speed.followingFinger;
    } else if (distX > this.buffer.x) {
      this.vx = -this.speed.followingFinger;
    } else {
      this.vx = 0; // Stop moving if the fish is within buffer of the finger
    }
    if (distY < -this.buffer.y) {
      this.vy = this.speed.followingFinger;
    } else if (distY > this.buffer.y) {
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

  // If fish senses a finger near it, then it follows it
  onTheLookoutForFinger(finger) {
    if (this.timeToSenseFinger) {
      if (this.sensesFinger(finger)) {
        this.followsFinger(finger);

        if (instructionsState === `instructions0`) {
          if (this.overlapsWith(finger)) {
            instructionsState = `instructions1`;
          }
        }
      }
    }
  }

  // Move demo fish
  move() {
    if (!this.timeToSenseFinger) {
      // Update fish's x and y positions
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < this.xDestination) {
        this.vx = this.speed.casualSwimming;
      }
      // when fish reaches its destination, it senses for the finger
      else {
        this.vx = 0;
        this.timeToSenseFinger = true;
      }
    }
  }

  // Returns true if the subject overlaps with fish's body
  overlapsWith(subject) {
    if ((subject.x < this.x + this.length / 2) &&
      (subject.x > this.x - this.length / 2) &&
      (subject.y < this.y + this.height / 2) &&
      (subject.y > this.y - this.height / 2 + this.heightOffset)) {
      return true;
    } else {
      return false;
    }
  }

  updateNumFoodEaten(demoFood) {
    if (this.overlapsWith(demoFood)) {
      this.numFoodEaten += 1;
    }
  }

  displayImFullText(font) {
    push();
    translate(this.x, this.y);
    textAlign(CENTER);
    textFont(font, this.imFullText.size);
    fill(this.imFullText.fill);
    text(this.imFullText.text, 0, -this.height/2);
    pop();
  }

}
