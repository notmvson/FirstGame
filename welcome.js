// Container for canvas + button
let container = document.createElement("div");
container.style.position = "relative";
container.style.width = "1000px";
container.style.height = "1000px";
document.body.appendChild(container);

// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
container.appendChild(canvas);

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

// Person object
var person1 = {
    x: 450,
    y: 277,
    direction: -1
};

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

var update = function(modifier) {
    person1.x = person1.x + (3 * person1.direction);
    if (person1.x > 910) {
        person1.direction = -1;
        pSrcY = pTrackLeft * pHeight;
    }
    if (person1.x < 64) {
        person1.direction = 1;
        pSrcY = pTrackRight * pHeight;
    }
}
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
        ctx.drawImage(holeImage, 360, 277);
    }

    if (personReady) {
        ctx.drawImage(personImage, pSrcX, pSrcY, pWidth, pHeight, person1.x, person1.y, pWidth, pHeight);
    }

    if (meatReady) {
        ctx.drawImage(meatImage, 640, 240);
    }

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "28px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Welcome to...", 70, 70);
    ctx.fillText("the game", 770, 138);
    ctx.fillText("Win condition: Collect 5 treats in 20 seconds", 70, 240);
    ctx.fillText("Avoid: Holes & People", 70, 300);
    ctx.fillText("Controls: Arrow keys", 70, 390);
    
    ctx.font = "50px Helvetica";
    ctx.fillText("EXTREME DOG PARK", 240, 120);
    ctx.fillText("----------------------------------------------------", 67, 180);
    ctx.fillText("----------------------------------------------------", 67, 330);

}

var main = function() {
    var then = Date.now();
    var renderInterval = setInterval(function() {
        var now = Date.now();
        var delta = now - then;
        render();
        then = now;
    }, 1000/60);
};

function loadScript(url) {
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    container.appendChild(startButton);

    startButton.style.position = "absolute";
    startButton.style.top = "50%";
    startButton.style.left = "50%";
    startButton.style.transform = "translate(-50%, -50%)";

    startButton.addEventListener("click", function() {
        window.location.href = "index2.html";
    });
});


main();