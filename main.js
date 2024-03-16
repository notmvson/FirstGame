// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);
counter = 0;
gameOverFlag = false;

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

// Person image
let personReady = false;
let personImage = new Image();
personImage.onload = function() {
    personReady = true;
};
personImage.src = "images/person.png";

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
    speed: 150,
    x: 0,
    y: 0
};

var meat = {
    x: 0,
    y: 0
};

var person = {
    x: 62,
    y: 300,
    direction: 1
};

var hole1 = {
    x: 0,
    y: 0
};

var hole2 = {
    x: 0,
    y: 0
};

var hole3 = {
    x: 0,
    y: 0
};

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

// Dog animation variables
var rows = 4;
var cols = 8;
var trackDown = 0;
var trackRight = 2;
var trackUp = 3;
var trackLeft = 1;
var spriteWidth = 512;
var spriteHeight = 246;
var width = spriteWidth / cols;
var height = spriteHeight / rows;
var curXFrame = 0;
var frameCount = 8;
var srcX = 0;
var srcY = 0;
var left = false;
var right = false;
var up = false;
var down = false;

// Person animation variables
var pRows = 4;
var pCols = 8;
var pTrackRight = 2;
var pTrackLeft = 3;
var pSpriteWidth = 256;
var pSpriteHeight = 256;
var pWidth = pSpriteWidth / pCols;
var pHeight = pSpriteHeight / pRows;
var pcurXFrame = 0;
var pFrameCount = 8;
var pSrcX = 0;
var pSrcY = 0;

dog.x = (canvas.width / 2) - 16;
dog.y = (canvas.height / 2) - 16;

// Update game objects
var update = function(modifier) {
    if (!gameOverFlag)
    {
        //ctx.clearRect(dog.x, dog.y, width, height);
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
    
        person.x = person.x + (1 * person.direction);
        if (person.x > 910) {
            person.direction = -1;
            pSrcY = pTrackLeft * pHeight;
        }
        if (person.x < 64) {
            person.direction = 1;
            pSrcY = pTrackRight * pHeight;
        }
        

        if (
            dog.x <= (meat.x + 20) // left of dog, right of meat
            && meat.x <= (dog.x + 50) // right of dog, left of meat
            && dog.y <= (meat.y + 10) // top of dog, bottom of meat
            && meat.y <= (dog.y + 45) // bottom of dog, top of meat
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
            && hole1.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole1.y + 20) // top of dog, bottom of hole
            && hole1.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole2.x + 25) // left of dog, right of hole
            && hole2.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole2.y + 20) // top of dog, bottom of hole
            && hole2.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole3.x + 25) // left of dog, right of hole
            && hole3.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole3.y + 20) // top of dog, bottom of hole
            && hole3.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (person.x + 20) // left of dog, right of person
            && person.x <= (dog.x + 45) // right of dog, left of person
            && dog.y <= (person.y + 32) // top of dog, bottom of person
            && person.y <= (dog.y + 32) // bottom of dog, top of person
        ) {
            pGameOver();
        }

        // Updates frame count for animation
        if (counter == 8) {
            curXFrame = ++curXFrame % frameCount;
            pcurXFrame = ++pcurXFrame % pFrameCount;
            counter = 0;
        } else {
            counter++;
        }
        srcX = curXFrame * width;
        pSrcX = pcurXFrame * pWidth;

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
    }
};

let hGameOver = function() {
    gameOverFlag = true;
    alert("You fell into a hole, game over")
    died = true;
    reset();
}

let pGameOver = function() {
    gameOverFlag = true;
    alert("You ran into a person, game over")
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

    if (personReady) {
        ctx.drawImage(personImage, pSrcX, pSrcY, pWidth, pHeight, person.x, person.y, pWidth, pHeight);
    }

    if (dogReady) {
        ctx.drawImage(dogImage, srcX, srcY, width, height, dog.x, dog.y, width, height);
    }

    if (meatReady) {
        ctx.drawImage(meatImage, meat.x, meat.y);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "28px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Meat Count: " + meatCaught, 70, 70);
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
    person.direction = 1;

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
            gameOverFlag = true;
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
