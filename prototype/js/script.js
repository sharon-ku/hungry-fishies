/**************************************************
Project 2: Prototype
Sharon Ku

The user controls the frog's movement using arrow keys. Click on the canvas to slap tongue down. The flies fly everywhere randomly. If the fly is close to the tongue when it is slapping, then the fly gets consumed (becomes invisible for now, but I will later work out a way to remove it from the array). Temporarily, I enabled a barking sound effect when the tongue slaps down (just to see what it's like), though that sound effect will change for sure.

What I focused on for this prototype: getting an animation to work.
**************************************************/

"use strict";

let barkSFX; // bark sound effect

// frog controlled by user
let frog;

// using an array to store all images
let frogImages = [];
// this variable stores the number of images
let numFrogImages = 7;


// array that stores fly variables
let flies = [];

// number of flies in array
let numFlies = 10;

// distance between frog and bug needed to slap the bug
let slappingDistance = 80;



// preload()
//
// loads all images + sound effects
function preload() {
  for (let i=0; i<numFrogImages; i++) {
    let loadedImage = loadImage(`assets/images/frog-drawings/frog-${i}.png`);
    frogImages.push(loadedImage);
  }

  barkSFX = loadSound(`assets/sounds/bark.wav`);
}



// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(800,800);

  // create a new frog
  frog = new Frog();

  // create flies by counting up to the number of flies
  for (let i=0; i<numFlies; i++) {
    // create a new fly
    let fly = new Fly();
    // add the fly to the array of flies
    flies.push(fly);
  }


}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  // loop through all the flies in the array and display them, allow them to get slapped by the frog, and move them randomly
  for (let i=0; i<flies.length; i++) {
    let fly = flies[i];
    fly.move(frog);
    fly.getSlappedByFrog(frog);
    fly.display();
  }

  // display my frog, move it, and let it slap its tongue down
  frog.move();
  frog.display();
  frog.slapTongueDown();
}

// when mouse is clicked, call the mousePressed method in Frog.js
function mousePressed() {
  frog.mousePressed();
}


// function keyPressed() {
//   frog.keyPressed();
//
//
// }
