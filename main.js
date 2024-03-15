// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

let chessBoard = [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'o', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
];

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

// Hole image
let holeReady = false;
let holeImage = new Image();
holeImage.onload = function() {
    holeReady = true;
};
holeImage.src = "images/hole.png";

// Background music
let bgMusic = new Audio("sounds/background.mp3");

// Bite sound
let eatSound = "sounds/bite.mp3";

// Gameover win sound
let gameWin = "sounds/win.wav";

// Gameover lose sound
let gameLose = "sounds/lose.wav";

let soundEfx = document.getElementById("soundEfx");

// Game objects
var dog = {
    //speed: 256,
    speed: 150,
    x: 0,
    y: 0
};

var meat = {
    x: 0,
    y: 0
};

var hole1 = {
    x: 0,
    y: 0
}

var hole2 = {
    x: 0,
    y: 0
}

var hole3 = {
    x: 0,
    y: 0
}

var meatCaught = 0;
var died = false;

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
    

    if (38 in keysDown) { // Up key
        dog.y -= dog.speed * modifier;
        if (dog.y < (50)) {
            dog.y = 50;
        }
        up = true;
    }

    if (40 in keysDown) { // Down key
        dog.y += dog.speed * modifier;
        if (dog.y > (1000 - 114)) {
            dog.y = 1000 - 114;
        }
       down = true;
    }

    if (37 in keysDown) { // Left key
        dog.x -= dog.speed * modifier;
        if (dog.x < (50)) {
            dog.x = 50;
        }
        left = true;
    }

    if (39 in keysDown) { // Right key
        dog.x += dog.speed * modifier;
        if (dog.x > (1000 - 114)) {
            dog.x = 1000 - 114
        }
        right = true;
    }

    if (
        dog.x <= (meat.x + 20)
        && meat.x <= (dog.x + 50)
        && dog.y <= (meat.y + 10)
        && meat.y <= (dog.y + 45)
    ) {
        // Plays eating sound
        soundEfx.src = eatSound;
        soundEfx.play();
        soundEfx.volume = 1;
        ++meatCaught; // Keeps track of score
        reset();
    }

    if (
        dog.x <= (hole1.x + 25) // left of dog, right of hole
        && hole1.x <= (dog.x + 20)
        && dog.y <= (hole1.y + 20) // top of dog, bottom of hole
        && hole1.y <= (dog.y + 25) // bottom of dog, top of hole
    ) {
        gameOver();
    }

    if (
        dog.x <= (hole2.x + 25) // left of dog, right of hole
        && hole2.x <= (dog.x + 20)
        && dog.y <= (hole2.y + 20) // top of dog, bottom of hole
        && hole2.y <= (dog.y + 25) // bottom of dog, top of hole
    ) {
        gameOver();
    }

    if (
        dog.x <= (hole3.x + 25) // left of dog, right of hole
        && hole3.x <= (dog.x + 20)
        && dog.y <= (hole3.y + 20) // top of dog, bottom of hole
        && hole3.y <= (dog.y + 25) // bottom of dog, top of hole
    ) {
        gameOver();
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

let gameOver = function() {
    alert("You fell into a hole, game over")
    died = true;
    reset();
}

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

    if (holeReady) {
        ctx.drawImage(holeImage, hole1.x, hole1.y);
        ctx.drawImage(holeImage, hole2.x, hole2.y);
        ctx.drawImage(holeImage, hole3.x, hole3.y);
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
    if (died == true) {
        soundEfx.src = gameLose;
        soundEfx.play();
        soundEfx.volume = 1;
    }
    else {
        placeItem(meat);
        placeItem(hole1);
        placeItem(hole2);
        placeItem(hole3);

        if (meatCaught === 5) {
            alert("Game over, you won!");
            soundEfx.src = gameWin;
            soundEfx.play();
            soundEfx.volume = 1;
        }
    }
};

let placeItem = function(character)
 {
    let X = 5;
    let Y = 6;
    let success = false;
    while (!success) {
        X = Math.floor(Math.random() * 9); // Returns 0-8
        Y = Math.floor(Math.random() * 9); 

        if(chessBoard[X][Y] === 'x') {
            success = true;
        }
    }
    chessBoard[X][Y] = 'o'; // Marks taken square
    character.x = (X * 100) + 64; // Allow for border
    character.y = (Y * 100) + 64;
 }
// Initialization
var then = Date.now();
reset();
main();
