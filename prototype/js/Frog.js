class Frog {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.width = 212.5; // original width: 250
    this.height = 170; //original height: 200
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;

    this.currentImage = 0; // sets the frog image
    this.framesElapsed = {
      forTongueSwing: 0,
      forTongueSlap: 0,
    };
    // this.framesElapsedForTongueSlap = 0;
    this.framesBtwEachImage = 7;
    this.framesBtwEachImageForSwing = 5;
    this.framesBtwEachImageForFinalSlap = 20;

    this.stopSlap = true;

    // scale affects direction that frog is facing
    this.scale = {
      x: 1, // facing right
      y: 1,
    };
  }

  // displays frog image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.x, this.scale.y);
    image(frogImages[this.currentImage], 0, 0, this.width, this.height);
    pop();
  }

  // move frog by holding down on right, left, up, down arrow keys
  move() {
    // constrain movement of frog to inside of canvas
    this.x = constrain(this.x, this.height / 2, width - this.height / 2);
    this.y = constrain(this.y, this.width / 2, height - this.width / 2);


    // frog moves in direction of the arrow key that is pressed
    // for right and left movement, frog faces the direction it is moving
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
      this.scale.x = 1; // face right
    } else if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
      this.scale.x = -1; // face left
    } else if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }

    // console.log(this.stopSlap);

  }

  // frog slaps its tongue down in the direction it is facing
  // the slapping effect is done by switching between images
  // TEMPORARY: plays a bark sound when it slaps its tongue
  slapTongueDown() {
    console.log(this.currentImage);
    if (!this.stopSlap) {
          this.framesElapsed.forTongueSwing++;
          if (this.framesElapsed.forTongueSwing === this.framesBtwEachImage) {
            if (this.currentImage === 0) {
              this.currentImage = 4;
              barkSFX.play();
            } else if (this.currentImage === 4) {
              this.currentImage = 5;

            } else if (this.currentImage === 5) {
              this.currentImage = 6;
              this.framesBtwEachImage = this.framesBtwEachImageForFinalSlap;
            } else if (this.currentImage === 6) {
              this.stopSlap = true;
              this.currentImage = 0;
              this.framesBtwEachImage = this.framesBtwEachImageForSwing;
            }
            this.framesElapsed.forTongueSwing = 0;
          }
      }
    }

    // if mouse's left button is clicked, cue tongue slapping animation
    mousePressed() {
      if (mouseButton === LEFT) {
        this.stopSlap = false;
        this.slapTongueDown();
      }
    }





}
