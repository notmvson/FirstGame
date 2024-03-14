// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "images/background.jpeg";

// Horizontal border image
let edgeReady = false;
let edgeImage = new Image();
edgeImage.onload = function() {
    edgeReady = true;
};
edgeImage.src = "images/edge1.jpeg";

// Vertical border image
let edgeReady2 = false;
let edgeImage2 = new Image();
edgeImage2.onload = function() {
    edgeReady2 = true;
};
edgeImage2.src = "images/edge2.jpeg";

// Meat image
let meatReady = false;
let meatImage = new Image();
meatImage.onload = function() {
    meatReady = true;
};
meatImage.src = "images/meat.png";

// Dog image
let dogReady = false;
let dogImage = new Image();
dogImage.onload = function() {
    dogReady = true;
};
dogImage.src = "images/dog.png";

// Background music
let bgMusic = new Audio("sounds/background.mp3");

// Bite sound
let eatSound = "sounds/bite.mp3";

// Gameover sound
let gameOver = "sounds/gameover.wav";

let soundEfx = document.getElementById("soundEfx");

// Game objects
var dog = {
    speed: 256,
    x: 0,
    y: 0
};

var meat = {
    x: 0,
    y: 0
};

var meatCaught = 0;

// Keyboard controls
var keysDown = {};

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);

// Animation variables
var trackDown = 0;
var trackRight = 2;
var trackUp = 3;
var trackLeft = 1;
var rows = 4;
var cols = 8;
var spriteWidth = 512;
var spriteHeight = 246;
var width = spriteWidth / cols;
var height = spriteHeight / rows;
var curXFrame = 0;
var frameCount = 1;
var srcX = 0;
var srcY = 0;
var left = false;
var right = false;
var up = false;
var down = false;
dog.x = (canvas.width / 2) - 16;
dog.y = (canvas.height / 2) - 16;

// Update game objects
var update = function(modifier) {
    ctx.clearRect(dog.x, dog.y, width, height);
    left = false;
    right = false;
    up = false;
    down = false;

    if (37 in keysDown && dog.x > (50)) { // Left key
        dog.x -= dog.speed * modifier;
        left = true;
    }

    if (39 in keysDown && dog.x < canvas.width - (114)) { // Right key
        dog.x += dog.speed * modifier;
        right = true;
    }

    if (38 in keysDown && dog.y > (50)) { // Up key
        dog.y -= dog.speed * modifier;
        up = true;
    }

    if (40 in keysDown && dog.y < canvas.height - (114)) { // Down key
        dog.y += dog.speed * modifier;
        down = true;

        if (
            dog.x <= (meat.x + 32)
            && meat.x <= (dog.x + 32)
            && dog.y <= (meat.y + 32)
            && meat.y <= (dog.y + 32)
            ) {
            ++meatCaught; // Keeps track of score

            // Plays eating sound
            soundEfx.src = eatSound;
            soundEfx.play();
            soundEfx.volume = 1;
            
            if (meatCaught < 3)
            {
                reset();
            }
            else
            {
                /*
                soundEfx.addEventListener("ended", function() {
                    alert("Game over, you won!")
                });
                */
                bgMusic.loop = false;
                soundEfx.src = gameOver;
                soundEfx.play();
                soundEfx.volume = 1;
                alert("Game over, you won!");
            }
        }
    }

    // Determines appropriate row for animation
    if (left) {
        srcY = trackLeft * height;
    } else if (right) {
        srcY = trackRight * height;
    } else if (up) {
        srcY = trackUp * height;
    } else if (down) {
        srcY = trackDown * height;
    }

    // Updates frame count for animation
    curXFrame = ++curXFrame % frameCount;
    srcX = curXFrame * width;
};

// Render function
var render = function() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (edgeReady) {
        ctx.drawImage(edgeImage, 0, 0);
        ctx.drawImage(edgeImage, 0, 936);
    }

    if (edgeReady2) {
        ctx.drawImage(edgeImage2, 0, 0);
        ctx.drawImage(edgeImage2, 936, 0);
    }

    if (dogReady) {
        ctx.drawImage(dogImage, srcX, srcY, width, height, dog.x, dog.y, width, height);
    }

    if (meatReady) {
        ctx.drawImage(meatImage, meat.x, meat.y);
    }
    
    ctx.fillSytle = "rgb(250, 250, 250)";
    ctx.font = "28px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Meat Count: " + meatCaught, 32, 32);
};

// Main game loop
var main = function() {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(main);

    // Play the background music
    bgMusic.loop = true; // Set the music to loop
    bgMusic.play();
    bgMusic.volume = 0.1;
};

var reset = function() {
    //dog.x = (canvas.width / 2) - 16;
    //dog.y = (canvas.height / 2) - 16;

    meat.x = 32 + (Math.random() * (canvas.width - 96));
    meat.y = 32 + (Math.random() * (canvas.height - 96));
};

// Initialization
var then = Date.now();
reset();
main();
