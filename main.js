// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);
counter = 0;
gameOverFlag = false;
let remainingTime = 20;

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

// Orange car image
let carReady = false;
let carImage = new Image();
carImage.onload = function() {
    carReady = true;
};
carImage.src = "images/car.png";

// Blue car image
let carReady2 = false;
let carImage2 = new Image();
carImage2.onload = function() {
    carReady2 = true;
};
carImage2.src = "images/car2.png";

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

var car = {
    x: 0,
    y: 0,
    direction: 1
};

var car2 = {
    x: 0,
    y: 936,
    direction: 1
};

var person1 = {
    x: 62,
    y: 300,
    direction: -1
};

var person2 = {
    x: 910,
    y: 650,
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

var hole4 = {
    x: 0,
    y: 0
};

var hole5 = {
    x: 0,
    y: 0
};

var hole6 = {
    x: 0,
    y: 0
};

var hole7 = {
    x: 0,
    y: 0
};

var hole8 = {
    x: 0,
    y: 0
};

var hole9 = {
    x: 0,
    y: 0
};

var hole10 = {
    x: 0,
    y: 0
};

var hole11 = {
    x: 0,
    y: 0
};

var hole12 = {
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
var pTrackRight2 = 2;
var pTrackLeft = 3;
var pTrackLeft2 = 3;
var pSpriteWidth = 256;
var pSpriteHeight = 256;
var pWidth = pSpriteWidth / pCols;
var pHeight = pSpriteHeight / pRows;
var pcurXFrame = 0;
var pFrameCount = 8;
var pSrcX = 0;
var pSrcX2 = 0;
var pSrcY = 0;
var pSrcY2 = 0;

dog.x = (canvas.width / 2) - 16;
dog.y = (canvas.height / 2) - 16;

// Update game objects
var update = function(modifier) {
    if (!gameOverFlag)
    {
        if (car.x > canvas.width) {
            car.x = -carImage.width;
        }
        if (car2.x > canvas.width) {
            car2.x = -carImage2.width;
        }

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
    
        person1.x = person1.x + (3 * person1.direction);
        if (person1.x > 910) {
            person1.direction = -1;
            pSrcY = pTrackLeft * pHeight;
        }
        if (person1.x < 64) {
            person1.direction = 1;
            pSrcY = pTrackRight * pHeight;
        }

        person2.x = person2.x + (2 * person2.direction);
        if (person2.x > 910) {
            person2.direction = -1;
            pSrcY2 = pTrackLeft2 * pHeight;
        }
        if (person2.x < 64) {
            person2.direction = 1;
            pSrcY2 = pTrackRight2 * pHeight;
        }

        car.x = car.x + (4 * car.direction);
        car2.x = car2.x + (5 * car2.direction);


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
            dog.x <= (hole4.x + 25) // left of dog, right of hole
            && hole4.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole4.y + 20) // top of dog, bottom of hole
            && hole4.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole5.x + 25) // left of dog, right of hole
            && hole5.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole5.y + 20) // top of dog, bottom of hole
            && hole5.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole6.x + 25) // left of dog, right of hole
            && hole6.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole6.y + 20) // top of dog, bottom of hole
            && hole6.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole7.x + 25) // left of dog, right of hole
            && hole7.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole7.y + 20) // top of dog, bottom of hole
            && hole7.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole8.x + 25) // left of dog, right of hole
            && hole8.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole8.y + 20) // top of dog, bottom of hole
            && hole8.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole9.x + 25) // left of dog, right of hole
            && hole9.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole9.y + 20) // top of dog, bottom of hole
            && hole9.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole10.x + 25) // left of dog, right of hole
            && hole10.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole10.y + 20) // top of dog, bottom of hole
            && hole10.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole11.x + 25) // left of dog, right of hole
            && hole11.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole11.y + 20) // top of dog, bottom of hole
            && hole11.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (hole12.x + 25) // left of dog, right of hole
            && hole12.x <= (dog.x + 20) // right of dog, left of hole
            && dog.y <= (hole12.y + 20) // top of dog, bottom of hole
            && hole12.y <= (dog.y + 25) // bottom of dog, top of hole
        ) {
            hGameOver();
        }

        if (
            dog.x <= (person1.x + 20) // left of dog, right of person
            && person1.x <= (dog.x + 45) // right of dog, left of person
            && dog.y <= (person1.y + 32) // top of dog, bottom of person
            && person1.y <= (dog.y + 32) // bottom of dog, top of person
        ) {
            pGameOver();
        }

        if (
            dog.x <= (person2.x + 20) // left of dog, right of person
            && person2.x <= (dog.x + 45) // right of dog, left of person
            && dog.y <= (person2.y + 32) // top of dog, bottom of person
            && person2.y <= (dog.y + 32) // bottom of dog, top of person
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
        pSrcX2 = pcurXFrame * pWidth;


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

        remainingTime -= modifier;

        if (remainingTime <= 0) {
            alert ("Times up! Game over");
            died = true;
            remainingTime = 0;
            gameOverFlag = true;
            reset();
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

    if (carReady) {
        ctx.drawImage(carImage, car.x, car.y);
    }

    if (carReady2) {
        ctx.drawImage(carImage2, car2.x, car2.y);
    }

    if (holeReady) {
        ctx.drawImage(holeImage, hole1.x, hole1.y);
        ctx.drawImage(holeImage, hole2.x, hole2.y);
        ctx.drawImage(holeImage, hole3.x, hole3.y);
        ctx.drawImage(holeImage, hole4.x, hole4.y);
        ctx.drawImage(holeImage, hole5.x, hole5.y);
        ctx.drawImage(holeImage, hole6.x, hole6.y);
        ctx.drawImage(holeImage, hole7.x, hole7.y);
        ctx.drawImage(holeImage, hole8.x, hole8.y);
        ctx.drawImage(holeImage, hole9.x, hole9.y);
        ctx.drawImage(holeImage, hole10.x, hole10.y);
        ctx.drawImage(holeImage, hole11.x, hole11.y);
        ctx.drawImage(holeImage, hole12.x, hole12.y);
    }

    if (personReady) {
        ctx.drawImage(personImage, pSrcX, pSrcY, pWidth, pHeight, person1.x, person1.y, pWidth, pHeight);
        ctx.drawImage(personImage, pSrcX2, pSrcY2, pWidth, pHeight, person2.x, person2.y, pWidth, pHeight);
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
    ctx.fillText("Time Left: " + Math.ceil(remainingTime), 770, 70);
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
    if (!gameOverFlag) {
        bgMusic.loop = true; // Set the music to loop
        bgMusic.play();
        bgMusic.volume = 0.1;
    } else {
        bgMusic.pause();
        bgMusic.volume = 0;
    }
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
        placeItem(hole4);
        placeItem(hole5);
        placeItem(hole6);
        placeItem(hole7);
        placeItem(hole8);
        placeItem(hole9);
        placeItem(hole10);
        placeItem(hole11);
        placeItem(hole12);

        if (meatCaught === 5) {
            alert("Game over, you won!");
            soundEfx.src = gameWin;
            soundEfx.play();
            soundEfx.volume = 1;
            gameOverFlag = true;
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

        if (chessBoard[X][Y] === 'x'
            && (X !== Math.floor(person1.x / 100) || Y !== Math.floor(person1.y / 100))
            && (X !== Math.floor(person2.x / 100) || Y !== Math.floor(person2.y / 100))
        ) {
            success = true;
        }
    }
    chessBoard[X][Y] = 'o'; // Marks taken square
    character.x = (X * 100) + 64; // Allow for border
    character.y = (Y * 100) + 64;
};

// Initialization
var then = Date.now();
reset();
main();
