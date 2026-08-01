/* 
Meteor Catcher Game 
Sample Project
By GWC Curriculum Team

Move your mouse over a falling meteor to catch it! Try to catch as many meteors as you can during the shower.

*/

/* GLOBAL VARIABLES */
let meteorX = 100; // Store X position of meteor
let meteorY = 0; // Store Y position of meteor

let meteorDiameter = 10; // Store diameter of meteor
let catcherDiameter = 40; // Store diameter of catcher

let distance; // Store distance between the meteor and catcher
let speed = 0.5; // Store speed of the meteor

// Only runs once
function setup() {
  createCanvas(400, 400); 
  bgImage = loadImage('1652436412785_filtered.JPG') 
  starImage = loadImage('moko sit side.png')
  
  resetMeteor();
  
}

// Runs over and over in a loop
function draw() {
  // Set background and remove outlines 
imageMode(CORNER);
background(bgImage); 
noStroke();
  
  // Draw the meteor 
  image(starImage, meteorX, meteorY, meteorDiameter, meteorDiameter); 
  
  // Make the meteor fall
  meteorY = meteorY + speed; 
  
  // Draw the catcher to follow the mouse
  fill(255, 255, 255, 100); 
  ellipse(mouseX, mouseY, catcherDiameter, catcherDiameter); 
  
  // Determine the distance between meteor and the catcher
  distance = dist(meteorX, meteorY, mouseX, mouseY);
  
  // Print the value of distance
  print('Distance = ' + distance); 
  
  // Test to see if meteor and catcher have intersected 
  if (distance < meteorDiameter/2) { 
    // Redraw  meteor to top of screen at a random location on x-axis
    meteorY = 0; 
    meteorX = random(width); 
      
    // Set new meteor speed to random number between 1 and 4
    speed = random(1,4); 
    
    // Set new meteor diameter to random number between 10 and 30
    meteorDiameter = random(50,300); 
  } 
  
  // Test to see if meteor has intersected with bottom wall
  if(meteorY > height) {
    resetMeteor();    
  }
}
 
// Helper function to reset the meteor (placed outside draw)
function resetMeteor() {
  meteorY = 0;
  meteorX = random(0, width);
  speed = random(0.5, 4);
  meteorDiameter = random(10, 30);
}