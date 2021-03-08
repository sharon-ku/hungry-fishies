class MoreFoodButton {
  constructor(moreFoodButtonImg) {
    // Appearance information
    this.img = moreFoodButtonImg;
    this.size = {
      current: 120,
      bigger: 130,
      smaller: 120,
    };
    this.tint = {
      gray: 255,
      alpha: 255,
    };

    // Position information
    this.distFromEdge = 100;
    this.x = width - this.distFromEdge;
    this.y = height - this.distFromEdge;

    // Properties relating to food
    this.timeForFood = true; // when no more food in tank, it is time for food
    this.showFood = false; // when user clicks More Food button, show food
  }

  // Display More Food Button
  display() {
    push();
    imageMode(CENTER);
    // Display button
    tint(this.tint.gray, this.tint.alpha);
    image(this.img, this.x, this.y, this.size.current, this.size.current);
    pop();
  }

  // If it's time for food, More Food Button is active (fully opaque), or else, it's inactive (more transparent)
  changeOpacity() {
    if (this.timeForFood) {
      this.tint.alpha = 255; // fully opaque
    } else {
      this.tint.alpha = 90; // more transparent
    }
  }

  // Checks if finger is hovering on More Food Button
  fingerIsOnMoreFoodButton(finger) {
    if (finger.x < this.x + (this.size.current / 2) &&
      finger.x > this.x - (this.size.current / 2) &&
      finger.y < this.y + (this.size.current / 2) &&
      finger.y > this.y - (this.size.current / 2)) {
      return true;
    } else {
      return false;
    }
  }

  // More Food Button enlarges if finger hovers over it
  hover(finger) {
    if (this.fingerIsOnMoreFoodButton(finger)) {
      this.size.current = this.size.bigger;
    } else {
      this.size.current = this.size.smaller;
    }
  }

  // If finger clicks on More Food Button while it's active, release food
  clicked(finger) {
    if (mouseIsPressed &&
      this.fingerIsOnMoreFoodButton(finger) &&
      this.tint.alpha === 255) {
      this.showFood = true; // release food
      this.timeForFood = false; // since food has been released, it's no longer time for food
    }
  }

  // Once all fishFoods are gone (off the canvas or eaten), reactivate the MoreFoodButton and create new fishFoods
  reactivate(fishFoods, numFishFoods) {
    if (fishFoods.length === 0) {
      this.timeForFood = true;
      this.showFood = false;

      // Create new fishFoods in array
      for (let i = 0; i < numFishFoods; i++) {
        fishFoods[i] = new FishFood(fishTank.border);
      }
    }
  }

}
