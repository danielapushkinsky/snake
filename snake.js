var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var direction = 0;
var snakeSize = Math.ceil(Math.min(canvas.width,canvas.height)/15);
var x = snakeSize;
var y = snakeSize;
var vx = 0;
var vy = 0;
var velocity = snakeSize;
var length = 1;
var snakeArray = [];
var applex;
var appley;
var isApple = false;

var frequency = 100; // frequency

var interval = setInterval(snake, frequency);

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37: // left
        if (direction != 3){
            direction = 1;
        }
        break;
        case 38: // up
        if (direction != 4){
            direction = 2;
        }
        break;
        case 39: // right
        if (direction != 1){
            direction = 3;
        }
        break;
        case 40: // down
        if (direction != 2){
            direction = 4;
        }
        break;
    }
}

function snake() {
    // Checks all directions
    switch(direction){
        case 0: // not moving
        vx = 0;
        vy = 0;
        break; // left
        case 1:
        vx = -velocity;
        vy = 0;
        break;
        case 2: // up
        vx = 0;
        vy = -velocity;
        break; // right
        case 3:
        vx = velocity;
        vy = 0;
        break; // down
        case 4:
        vx = 0;
        vy = velocity;
        break;
    }

    // Sets correct velocity depending on direction
    x += vx;
    y += vy;

    // Adds tail
    if (length > 1){
        snakeArray.unshift([y]);
        snakeArray[0].unshift([x]);
        snakeArray.splice(length,1)
    }

    // If no apple, spawn one
    if (isApple == false){
        spawnApple();
    }

    // Collision with apple
    hitApple();

    // Draw everything
    draw();

    // Checks if out of bounds
    exitMap();

    // Checks if hit own tail
    hitTail();
}

function draw(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.shadowBlur=8;
    ctx.font = "18px Arial";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor="red"
    ctx.fillStyle = "red";
    ctx.fillRect(applex,appley,snakeSize,snakeSize);
    ctx.shadowColor="green";
    ctx.fillStyle = "green";        
    ctx.fillRect(x,y,snakeSize,snakeSize);
    for (var i = 1; i < length; i++) {
        ctx.fillRect(snakeArray[i][0],snakeArray[i][1],snakeSize,snakeSize);
    }
    ctx.fillText("Length: " + length, 10, canvas.height - 19);
}

// This method spawns an apple
function spawnApple(){
    applex = (Math.floor(Math.random() * (canvas.width/snakeSize-1 - 0)) + 0) * snakeSize;
    appley = (Math.floor(Math.random() * (canvas.height/snakeSize-1 - 0)) + 0) * snakeSize;
    isApple = true;
}

// This checks if an apple was hit
function hitApple(){
    if (applex == x && appley == y){
        length += 3;
        isApple = false;
    }
}

// This method checks if snake is out of bounds
function exitMap(){
    if (x < -1 || y < -1 || x > canvas.width - snakeSize + 1 || y > canvas.height - snakeSize + 1){
        gameOver();
    }  

}

// This method checks if snake hit its own tail
function hitTail(){
    //ctx.fillText(x == snakeArray[2][0] && y == snakeArray[2][1], 20, 20);
    for (var i = 2; i < length; i++) {
        if (x == snakeArray[i][0] && y == snakeArray[i][1]){
            gameOver();
        }
    }
}

// This method ends the game
function gameOver(){
    alert('Game Over! Final Length: ' + length);
    x = snakeSize;
    y = snakeSize;
    direction = 0;
    isApple = false;
    length = 1;
    snakeArray.splice(0,snakeArray.length)
}

