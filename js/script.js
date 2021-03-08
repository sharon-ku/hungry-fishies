/**************************************************
Project 2: Hungry Fishies
Sharon Ku


INTRO state & INSTRUCTIONS state:
- Four fish (1 firefish, 1 goby, 2 clownfish named Nene and Momo) are swimming around the tank.
- Click on any creature in the tank and it will emit a sound.
- Click the "Start" button to see the instructions.

INSTRUCTIONS state:
- A short tutorial that shows the basic actions of the game.
- Click "Ready!" to start the game state.

GAME state:
- Click the "More Food" button to add food to the tank.
- Bring the finger/user circle close enough to the fish for it to notice it.
- Try to get the fish to eat the food by guiding it with the finger.
- Change the current direction by using the left and right arrow keys.
- The clownfish like to feed the anemone sometimes instead of eating the food :)
- When all fish are full, the simulation ends (cue ending state).

ENDING state:
- A poem is featured as the tank plunges into darkness.
- The fish release a little surprise from their behind.

***
Btw I realized that the plural of fish is fish and not fishes.
It's too late now.
***

Background music from Mixkit.co: Smooth Like Jazz by Ajhay Stelino
**************************************************/

"use strict"; // because strict is good

// State of program
let state = `intro`; // all possible states: intro, instructions, game, ending

// Substates of instructions: (instructions0 count up to instructions3)
let instructionsState = `instructions0`;

// Variables related to fishFood (used in game state)
let fishFoods = []; // fishFoods array that contains food objects
let numFishFoods = 10; // number of fish food in the tank at once
let totalFood = 10; // total amount of food that each fish needs to consume

// Variables related to demoFood (used in instructions state)
let demoFoods = []; // fishFoods array that contains food objects
let numDemoFoods = 5; // number of demo food in the tank at once


// SOUND-RELATED VARIABLES -------------------
// Background music and volume
let backgroundMusic = undefined;
let backgroundMusicVolume = {
  current: 0.3,
  min: 0.2,
  max: 0.5,
};

// synthesizer
let synth;
// volume of synthesizer
let synthVolume = 0.3;
// delay in seconds at which to play synthesizer
let synthDelay = 0;
// time to hold note of synthesizer
let synthSustainTime = 1;

// tracks the interval that plays note
let interval;

// stores notes
let notes = [`C5`, `E4`, `G5`, `E4`, `D5`, `F4`, `A5`, `C4`];

// time between each note
let noteDuration = 500;

// --------------------------------------------

// Fonts used for title and body text
let titleFont;
let bodyTextFont;

// Title text
let title;

// Start button circle and text inside it
let startButtonCircle;
let startButtonText;

// Food tracker array
let foodTrackers = [];

// Fishes array
let fishes = [];

// Stores the names of all my fishies
let allFishNames = [`firefish`, `goby`, `nene`, `momo`];

// Stores all fish names as properties, with img1,img2,and foodTrackerImg as subproperties
let fishImages = {

};

// Creatures (non-fish) array
let creatures = [];
let numSnails = 2; // number of snails in tank

// Anemone
let anemone;

// User circle
let finger;

// Background color and elements (rocks and sand)
let bg = {
  fill: { // sky blue
    r: 117,
    g: 184,
    b: 213,
  },
  rocks: {
    img: undefined,
    length: 1247,
    height: 400,
  },
  sand: {
    img: undefined,
    length: 1300,
    height: 247,
  },
};

// Fish tank's border
let fishTank = {
  border: 100,
};

// Rounded rectangle displayed behind the instructions
let rulesRect;

// Instructions' current step number
let step = {
  currentNumber: 0,
  // appearance information
  textFill: 255,
  textSize: 40,
  textAlign: `LEFT`,
  // position information
  x: 100,
  y: 100,
};

// Instructions' text for each step
let instructionsText = [
  `Bring your finger near the fish
to get its attention.`,
  `Guide fish to scrumptious food.`,
  `*Tip* Hold down the left and right arrow keys to
change the water flow direction.`,
  `When all your food trackers are full,
mission accomplished!`
];

// Stores demo fish and food tracker
let demoFish;
let demoFoodTracker;

// Stores demo left and right arrow keys
let demoArrowKeys = [];

// Stores images for demo fish and food tracker
let demoFishImg1;
let demoFishImg2;
let demoFoodTrackerImg;

// Ready button circle and text inside it
let readyButtonCircle;
let readyButtonText;

// More Food button
let moreFoodButton;
let moreFoodButtonImg;

// End poem
let yLocationOfFirstLine = 210;
let poem;

// Nighttime shade rectangle
let nightFilter;

// Array containing poop pebbles
let poops = [];
// Total number of poop that the fish can release in a single swimming
let totalNumPoops = 50;



// preload() -----------------------------------------------------------------------
//
// Preload all images, music, and fonts
// --------------------------------------------------------------------------------

function preload() {
  // Load all fish images and food tracker images
  for (let i = 0; i < allFishNames.length; i++) {
    let fish = allFishNames[i];

    // Allow fishImages.fish to have its own subproperties (which will be img1, img2, and foodTrackerImg)
    fishImages[`${fish}`] = {};

    // load image 1 and 2 for each fish
    fishImages[`${fish}`].img1 = loadImage(`assets/images/${fish}1.png`);
    fishImages[`${fish}`].img2 = loadImage(`assets/images/${fish}2.png`);

    // load food tracker image for each fish
    fishImages[`${fish}`].foodTrackerImg = loadImage(`assets/images/${fish}FoodTracker.png`);
  }

  // Load demoFish images
  demoFishImg1 = loadImage(`assets/images/demoFish1.png`);
  demoFishImg2 = loadImage(`assets/images/demoFish2.png`);

  // Load demoFoodTracker image
  demoFoodTrackerImg = loadImage(`assets/images/demoFoodTracker.png`);

  // Load More Food button image
  moreFoodButtonImg = loadImage(`assets/images/moreFood.png`);

  // Load background rocks and sand images
  bg.rocks.img = loadImage(`assets/images/rocks.png`);
  bg.sand.img = loadImage(`assets/images/sand.png`);

  // Load title font and body text font
  titleFont = loadFont(`assets/fonts/Slackey-Regular.ttf`);
  bodyTextFont = loadFont(`assets/fonts/Grandstander-Regular.ttf`);

  // Load background music
  backgroundMusic = loadSound(`assets/sounds/backgroundMusic.mp3`);
}

// setup() -----------------------------------------------------------------------
//
// Set up canvas, hide cursor, hide all strokes, prep audio, and create all objects from classes
// --------------------------------------------------------------------------------

function setup() {
  createCanvas(1280, 720);
  noCursor();
  noStroke();
  userStartAudio();

  // create a new synthesizer
  synth = new p5.PolySynth;

  // Create a new finger
  finger = new Finger();

  // -----
  // Create 4 fishes and push to fishes array:
  // 1- Create a new firefish
  let firefish = new Firefish(fishImages.firefish.img1, fishImages.firefish.img2);
  fishes.push(firefish);

  // 2- Create a new goby
  let goby = new Goby(fishImages.goby.img1, fishImages.goby.img2);
  fishes.push(goby);

  // 3- Create a new nene (aka big clownfish)
  let nene = new Nene(fishImages.nene.img1, fishImages.nene.img2);
  fishes.push(nene);

  // 4- Create a new momo (aka small clownfish)
  let momo = new Momo(fishImages.momo.img1, fishImages.momo.img2);
  fishes.push(momo);
  // -----

  // Create a new anemone
  let anemoneX = 500;
  let anemoneY = 510;
  anemone = new Anemone(anemoneX, anemoneY);

  // Create the right number of snails to put into creatures array
  for (let i = 0; i < numSnails; i++) {
    let snailX = random(0, width);
    let snailY = random(height * 3 / 4, height - 100);
    let snail = new Snail(snailX, snailY);
    creatures.push(snail);
  }

  // Create a new title "Hungry Fishies"
  title = new Title();

  // Setting x and y positions for start button
  let startButtonX = width * 0.2;
  let startButtonY = height * 0.8;
  // Create a new start button + text inside start button
  startButtonCircle = new StartButtonCircle(startButtonX, startButtonY);
  startButtonText = new StartButtonText(startButtonX, startButtonY, bodyTextFont);

  // Create a new demo fish
  demoFish = new DemoFish(demoFishImg1, demoFishImg2);

  // Create array for demoFoods (only used in Instructions state)
  for (let i = 0; i < numDemoFoods; i++) {
    let demoFood = demoFoods[i];
    demoFood = new DemoFood(fishTank.border);
  }

  // Create a new demo food tracker
  demoFoodTracker = new DemoFoodTracker(demoFoodTrackerImg);

  // Create new demo left and right arrow keys and push to demoArrowKeys array
  let demoLeftArrowKey = new DemoLeftArrowKey();
  let demoRightArrowKey = new DemoRightArrowKey();
  demoArrowKeys.push(demoLeftArrowKey, demoRightArrowKey);

  // Setting x and y positions for ready button
  let readyButtonX = width * 0.9;
  let readyButtonY = height * 0.8;
  // Create a new ready button + text inside ready button
  readyButtonCircle = new ReadyButtonCircle(readyButtonX, readyButtonY);
  readyButtonText = new ReadyButtonText(readyButtonX, readyButtonY, bodyTextFont);

  // Create new rectangle that goes behind the instructions
  rulesRect = new RulesRect();

  // Create array for fishFoods
  for (let i = 0; i < numFishFoods; i++) {
    let fishFood = fishFoods[i];
    fishFood = new FishFood(fishTank.border);
  }

  // Create a new More Food button
  moreFoodButton = new MoreFoodButton(moreFoodButtonImg);

  // Create a new food tracker for each fish and push the food trackers into foodTrackers array
  let foodTrackerForFirefish = new FoodTrackerForFirefish(fishImages.firefish.foodTrackerImg);
  foodTrackers.push(foodTrackerForFirefish);
  let foodTrackerForGoby = new FoodTrackerForGoby(fishImages.goby.foodTrackerImg);
  foodTrackers.push(foodTrackerForGoby);
  let foodTrackerForNene = new FoodTrackerForNene(fishImages.nene.foodTrackerImg);
  foodTrackers.push(foodTrackerForNene);
  let foodTrackerForMomo = new FoodTrackerForMomo(fishImages.momo.foodTrackerImg);
  foodTrackers.push(foodTrackerForMomo);

  // Create a new night filter
  nightFilter = new NightFilter();

  // Create a new end poem
  let poemLineX = width / 2;
  let poemLineY = yLocationOfFirstLine;
  poem = new Poem(bodyTextFont, poemLineX, poemLineY);

  // Create array for poop
  for (let i = 0; i < totalNumPoops; i++) {
    poops[i] = new Poop();
  }
}



// draw() -----------------------------------------------------------------------
//
// Set up background music, background color, background rocks and sand, and states
// --------------------------------------------------------------------------------

function draw() {
  // Set volume of background music to current (this volume will be adjusted later on)
  backgroundMusic.setVolume(backgroundMusicVolume.current);

  // Set up background color, rocks, and sand
  setBackground();

  // Setting up states: intro, instructions, game, ending
  if (state === `intro`) {
    intro();
  } else if (state === `instructions`) {
    instructions();
  } else if (state === `game`) {
    game();
  } else if (state === `ending`) {
    ending();
  }
}

// Set up background color, rocks, and sand
function setBackground() {
  background(bg.fill.r, bg.fill.g, bg.fill.b);
  push();
  imageMode(CENTER);
  image(bg.sand.img, width / 2, height - bg.sand.height / 2, bg.sand.length, bg.sand.height);
  image(bg.rocks.img, width / 2, height * 2 / 3, bg.rocks.length, bg.rocks.height);
  pop();
}

// intro() -----------------------------------------------------------------------
//
// INTRO STATE:
// Display title, start button, finger, casually swimming fish, snails, and anemone
// If any creature in the tank is clicked, it emits a sound
// --------------------------------------------------------------------------------

function intro() {
  // Set background music volume to minimum so we can hear the notes emitted by living beings
  backgroundMusicVolume.current = backgroundMusicVolume.min;

  // Draw all animated sprites (snails and anemone)
  drawSprites();

  // Display the title
  title.display(titleFont);

  // Create a "start" button
  // Button is made up of a shape and a text inside it
  generateButton(startButtonCircle, startButtonText);

  // Display fishes casually swimming
  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    fish.casualSwimming(fishTank);
    displayAnimatedFish(fish);
  }

  // Display user circle and move with finger
  moveAndDisplayFinger();
}

// Create a button that is displayed, has a hover behavior (size changes when hovering over it), and that moves randomly
function generateButton(buttonShape, buttonText) {
  // If finger is in button, make button's size increase and decrease
  if (mouseIsInButton(buttonShape)) {
    buttonShape.hover();
    buttonText.hover();
  } else { // set the button to its normal size
    buttonShape.setNormalSize();
    buttonText.setNormalSize();
  }

  // Move the button
  buttonShape.move();
  buttonText.move(buttonShape); // text has same position as button shape
  stayInTank(buttonShape); // ensure that button does not leave the tank

  // Display the button shape with text inside it
  buttonShape.display();
  buttonText.display();
}

// Display a fish and switch its images
function displayAnimatedFish(fishName) {
  fishName.switchImages();
  fishName.display();
}

// Moves and displays finger (user circle)
function moveAndDisplayFinger() {
  finger.move();
  finger.display();
}

// Constrain object/animal's position to the inside of the tank
function stayInTank(subject) {
  subject.x = constrain(subject.x, fishTank.border, width - fishTank.border);
  subject.y = constrain(subject.y, fishTank.border, height - fishTank.border);
}

// If mouse is pressed:
function mousePressed() {
  // If it's the intro state
  if (state === `intro`) {
    // Play note if user clicks on a living being
    playNote();

    // Play background music and loop it
    tryMusic();
  }
}

// Play the note if finger overlaps with a living being (fish or creature or anemone)
function playNote() {
  // if finger overlaps with fish, play two notes overlapped with each other
  for (let i = 0; i < fishes.length; i++) {
    let fishName = fishes[i];

    // The pair of notes that will be played correspond to the fish's index in the fishes array
    // For example, for firefish that occupies index 0 in the fishes array, have it play the first two notes in notes array
    // Next, for goby that has index 1 in fishes array, have it play the next two notes in the notes array
    // And so on for the rest of the fishes...
    if (fishName.overlapsWith(finger)) {
      // play note from notes array
      synth.play(notes[i * 2], synthVolume, synthDelay, synthSustainTime);
      // along with the note that follows right after
      synth.play(notes[(i * 2) + 1], synthVolume, synthDelay, synthSustainTime);
    }
  }

  // For each snail that is stored in the creatures array, play a note if it overlaps with finger
  for (let i = 0; i < creatures.length; i++) {
    let creature = creatures[i];

    // Note that is played from notes array shares same index as snail's index in creatures array
    if (creature.overlapsWith(finger)) {
      synth.play(notes[i], synthVolume, synthDelay, synthSustainTime);
    }
  }

  // If anemone overlaps with array, have it play the third note in notes array
  if (anemone.overlapsWith(finger)) {
    synth.play(notes[4], synthVolume, synthDelay, synthSustainTime);
  }
}

// Play background music and loop it
function tryMusic() {
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.loop();
  }
}

// Changes states when mouse clicks on Start or Ready button
function mouseClicked() {
  // If finger clicks on Start button, cue `instructions` state
  if (state === `intro`) {
    if (mouseIsInButton(startButtonCircle)) {
      state = `instructions`;
    }
  }

  // If finger clicks on Ready button, cue `game` state
  if (state === `instructions`) {
    if (mouseIsInButton(readyButtonCircle)) {
      state = `game`;
    }
  }
}

// Returns true if finger's position is inside a button
function mouseIsInButton(buttonName) {
  if (mouseX < buttonName.x + (buttonName.size / 2) &&
    mouseX > buttonName.x - (buttonName.size / 2) &&
    mouseY < buttonName.y + (buttonName.size / 2) &&
    mouseY > buttonName.y - (buttonName.size / 2)) {
    return true;
  } else {
    return false;
  }
}

// instructions() ----------------------------------------------------------------------
//
// INSTRUCTIONS STATE:
// There are 4 substates for instructions: instructions0 all the way to instructions3.
// The substates explain the actions that the user can perform.
// Player starts the game by clicking "Ready!" button.
// --------------------------------------------------------------------------------

function instructions() {
  // Set background music volume to max
  backgroundMusicVolume.current = backgroundMusicVolume.max;

  // Display rounded rectangle behind the instructions
  rulesRect.display();

  // Display the written instructions on top left corner of canvas
  displayInstructionsStep();

  // Setting up 4 substates for instructions state - start counting from 0 (reason is so that it matches the index of the instructionsText array)
  if (instructionsState === `instructions0`) {
    instructions0();
  } else if (instructionsState === `instructions1`) {
    instructions1();
  } else if (instructionsState === `instructions2`) {
    instructions2();
  } else if (instructionsState === `instructions3`) {
    instructions3();
  }

  // Display and move finger
  moveAndDisplayFinger();
}

// Display the written instructions on top left corner of canvas
function displayInstructionsStep() {
  push();
  textAlign(step.textAlign);
  fill(step.textFill);
  textFont(bodyTextFont, step.textSize);

  text(instructionsText[step.currentNumber], step.x, step.y);
  pop();
}

// DemoFish appears from left side of screen, ring expands around fish, and then fish moves with finger when finger is close to it.
// When finger overlaps with fish, switch to instructions1 substate
function instructions0() {
  // Show a hoop around the fish that expands to show area close to fish
  demoFish.increaseRingSize();
  demoFish.changeRingAlpha();
  demoFish.displayRing();

  // Display and move the demoFish by guiding it with finger
  displayAndMoveDemoFish();
}

// Display and move the demoFish by guiding it with finger
function displayAndMoveDemoFish() {
  demoFish.move();
  demoFish.onTheLookoutForFinger(finger); // fish follows finger
  demoFish.display();
}

// DemoFood is released from top of tank; user must guide fish to food with finger
function instructions1() {
  // Set instructions to step number 1
  step.currentNumber = 1;

  // Create demoFoods when there aren't any in demoFoods array
  refillDemoFoods();

  // Display and move the demoFish by guiding it with finger
  displayAndMoveDemoFish();

  // Display food, move it, change current, update number of food fish ate, and remove food if eaten or off screen
  releaseDemoFood(demoFish);

  // If fish eats 7 pieces of food, move to next instruction
  if (demoFish.numFoodEaten >= 7) {
    instructionsState = `instructions2`;
  }
}

// Create demoFoods when there aren't any
function refillDemoFoods() {
  if (demoFoods.length === 0) {
    // Create new fishFoods in array
    for (let i = 0; i < numDemoFoods; i++) {
      demoFoods[i] = new DemoFood(fishTank.border);
    }
  }
}

// Display food, move it, change current, and update number of food fish ate
function releaseDemoFood(demoFish) {

  for (let i = demoFoods.length - 1; i >= 0; i--) {
    let demoFood = demoFoods[i];
    demoFood.move();
    demoFood.changeCurrent(); // let user change current with arrow keys
    demoFood.display();

    // Update how many pieces of food fish has eaten
    demoFish.updateNumFoodEaten(demoFood);

    // If fish eats food by touching it, or if food goes off canvas, then remove food from fishFoods array
    if (demoFish.overlapsWith(demoFood) || demoFood.offScreen()) {
      demoFoods.splice(i, 1);
    }
  }
}

// Show tip: user can use left and right arrow keys to change current direction
// Display arrow keys that "light up" if user clicks on that key on their keyboard to represent current flow
// User still needs to guide fish to food
function instructions2() {
  // set Instructions text to step number 2
  step.currentNumber = 2;

  // display left and right arrow keys and change their alpha if key is held down
  for (let i = 0; i < demoArrowKeys.length; i++) {
    let demoArrowKey = demoArrowKeys[i];
    demoArrowKey.changeAlpha();
    demoArrowKey.display();
  }

  // Create demoFoods when there aren't any in demoFoods array
  refillDemoFoods();

  // Display and move the demoFish by guiding it with finger
  displayAndMoveDemoFish();

  // Display food, move it, change current, update number of food fish ate, and remove food if eaten or off screen
  releaseDemoFood(demoFish);

  // If 15 pieces of food have been eaten in total, switch to next instructions state
  if (demoFish.numFoodEaten >= 15) {
    instructionsState = `instructions3`;
  }
}

// Show food tracker that fills up, and when it does, demoFish says "I'm Full!"
// Use clicks on "ready" button to move to game state
function instructions3() {
  // Set Instructions text to step number 3
  step.currentNumber = 3;

  // Display and move the demoFish by guiding it with finger
  displayAndMoveDemoFish();

  // Display "I'm Full" on top of demoFish
  if (demoFoodTracker.isAlmostFull()) {
    demoFish.displayImFullText(bodyTextFont);
  }

  // Show a food tracker that constantly fills up
  demoFoodTracker.increaseBar();
  demoFoodTracker.display();

  // Create a "ready" button that is displayed, has a hover behavior (size changes when hovering over it), and that moves randomly
  // Button is made up of a shape and a text inside it
  generateButton(readyButtonCircle, readyButtonText);
}


// game() -----------------------------------------------------------------------
//
// GAME STATE:
// Finger, fish, food tracker, and MoreFoodButton are displayed.
// Finger moves with mouse.
// Fish move randomly (Perlin noise) until they spot the finger then follow it.
// If the fish is close enough to food, it will eat it and the tracker updates.
// Clownfish have a unique behavior: they sometimes feed the anemone! (symbiosis is beautiful)
// --------------------------------------------------------------------------------

function game() {
  // Draw all sprites
  drawSprites();

  // Move non-fish creatures
  for (let i = 0; i < creatures.length; i++) {
    let creature = creatures[i];
    creature.move();
  }

  // Stores all the methods to make More Food button work
  useMoreFoodButton();

  // Display food trackers and update food tracker bar every time fish eats scrumptious food
  for (let i = 0; i < foodTrackers.length; i++) {
    for (let i = 0; i < fishes.length; i++) {
      let fish = fishes[i];
      let foodTracker = foodTrackers[i];
      foodTracker.updateBar(fish, totalFood);
      foodTracker.display();
    }
  }

  // Food is released and fish are displayed; fish interact with food by eitehr eating it or feeding it to the anemone
  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    // Release fish food if the More Food Button is clicked and it is active
    if (moreFoodButton.showFood) {
      releaseFishFood(fish);
    }

    // Define what happens if fish has food stored in mouth (meaning it intends to feed anemone)
    fishHasFoodStoredInMouth(fish);

    // Define the fish's movement: either the fish follows finger, casually swims, or swims to the anemone
    defineFishMovement(fish);

    // Display animated fish
    displayAnimatedFish(fish);
  }

  // Display and move finger
  moveAndDisplayFinger();

  // Cue ending if all fish have eaten the total number of food
  fishAreFull();
}

// Stores all the methods to make More Food button work
function useMoreFoodButton() {
  // Display More Food Button
  moreFoodButton.display();
  // Change More Food Button's opacity if it is active or inactive
  moreFoodButton.changeOpacity();
  // Enlarge More Food Button if user hovers over it
  moreFoodButton.hover(finger);
  // If user clicks on More Food Button while it's active, release food
  moreFoodButton.clicked(finger);
  // Reactivate More Food Button when there is no more food on the canvas
  moreFoodButton.reactivate(fishFoods, numFishFoods);
}

// Releases pieces of food
function releaseFishFood(fishName) {

  for (let i = fishFoods.length - 1; i >= 0; i--) {
    let fishFood = fishFoods[i];
    // move fish food
    fishFood.move();
    // let user change current with arrow keys
    fishFood.changeCurrent();
    // display fish food
    fishFood.display();

    // If fish interacts with food by touching it, or if food goes off canvas, then remove food from fishFoods array
    if (fishName.interactsWithFood(fishFood, anemone, fishName) || fishFood.offScreen()) {
      fishFoods.splice(i, 1);
    }
  }
}

// If fish has food stored in mouth (meaning it intends to feed anemone), display a special food in fish's mouth that will be carried to anemone, and once fish is done feeding anemone, reset variables related to feeding fish
function fishHasFoodStoredInMouth(fish) {
  if (fish.foodInMouth) {
    // fish draws a special food where its mouth is, displays it, and moves this special food to bring to anemone
    fish.moveSpecialFood();
    fish.displaySpecialFood();

    // if food is close enough to anemone, reset fish's variables related to feeding the anemone
    if (fish.specialFoodCloseToAnemone(anemone)) {
      // set timeToFeedAnemone to false for this turn
      fish.timeToFeedAnemone = false;
      // food no longer in fish's mouth
      fish.foodInMouth = false;
      // decide if on next turn, fish needs to feed anemone
      fish.decideIfTimeToFeedAnemone();
      console.log(fish.timeToFeedAnemone);
    }
  }
}

// Define the fish's movement: either the fish follows finger, casually swims, or feeds the anemone
function defineFishMovement(fish) {
  // If the fish has no food stored inside its mouth,
  if (!fish.foodInMouth) {
    // then fish either follows finger if the fish senses the finger
    if (fish.sensesFinger(finger)) {
      fish.followsFinger(finger);
    }
    // or else fish swims casually around the tank
    else {
      fish.casualSwimming(fishTank);
    }
  }
  // Else if fish has food stored in mouth, bring food to feed anemone
  else if (fish.foodInMouth) {
    fish.feedAnemone(anemone);
  }
}

// Cue ending if all fishies have eaten the total number of food
function fishAreFull() {
  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    // if there is a fish that isn't full, stop the for-loop
    if (!fish.isFull) {
      return;
    }
  }
  // if all fish are full, cue ending state
  state = `ending`;
}

// ending() -----------------------------------------------------------------------
//
// ENDING STATE:
// Display end poem.
// Fishes poop.
// Night filter slowly appears and gives the tank an ominous feeling.
// --------------------------------------------------------------------------------

function ending() {
  // Draw all sprites
  drawSprites();

  // Make fishes poop and display fishes casually swimming
  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    fish.pooping(poops, totalNumPoops);

    fish.casualSwimming(fishTank);
    displayAnimatedFish(fish);
  }

  // Display filter that plunges tank into darkness
  nightFilter.display();

  // Display end poem
  poem.display();

  // Display and move finger based on user's mouse position
  moveAndDisplayFinger();
}
