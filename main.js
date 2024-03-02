// Definitional code

// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function() {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function() {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
    speed: 256, // movement in pixels per second
    x: 0, 
    y: 0
};

var monster = {
    x: 0,
    y: 0
};

var monstersCaught = 0;

// Start of code that actually runs ======================================

// Handle keyboard controls
var keysDown = {}; 

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);

// Update game objects
var update = function(modifier) {
    if(38 in keysDown && hero.y > 32+0) { // Up
        hero.y -= hero.speed * modifier;
    }
    if(40 in keysDown && hero.y < canvas.height - (64+0)) { // Down
        hero.y += hero.speed * modifier;
    }
    if(37 in keysDown && hero.x > 32+0) { // Left
        hero.x -= hero.speed * modifier;
    }
    if(39 in keysDown && hero.x < canvas.width - (64+0)) { // Right
        hero.x += hero.speed * modifier;
    }

    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught; // Keeps track of score
        reset();
    }
};

// Draw everything in the main render function
var render = function() {
    if(bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if(heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    
    if(monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    ctx.fillSytle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function() { 
    var now = Date.now();
    var delta = now - then;
    update(delta/1000);
    render();
    then = now;
    requestAnimationFrame(main);
};

var reset = function() {
    hero.x = (canvas.width / 2) - 16;
    hero.y = (canvas.height / 2) - 16;

    monster.x = 32 + (Math.random() * (canvas.width - 96));
    monster.y = 32 + (Math.random() * (canvas.height - 96));
};

var then = Date.now();
reset();
main(); 