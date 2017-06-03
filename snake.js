function snake(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
    var direction = 0;
    var x = 20;
    var y = 20;
    var vx = 0;
    var vy = 0;
    var velocity = 20;
    var frequency = 75; // frequency

    var length = 1;
    var snakeSize = 20;
    var snakeArray = [
    [x,y],
    ]

    var applex;
    var appley;
    var isApple = false;

    var interval = setInterval(game, frequency);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function game() {
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

        x += vx;
        y += vy;

        snakeArray.unshift([y]);
        snakeArray[0].unshift([x]);
        snakeArray.splice(length,1)

        if (isApple == false){
            applex = (Math.floor(Math.random() * (canvas.width/20 - 0)) + 0) * 20;
            appley = (Math.floor(Math.random() * (canvas.height/20 - 0)) + 0) * 20;
            isApple = true;
        }

        // Collision
        if (applex == x && appley == y){
            length += 3;
            isApple = false;
            //snakeArray.push([x-20]);
            //snakeArray[1].push([y]);
        }

        if (x < -1 || y < -1 || x > canvas.width - snakeSize + 1 || y > canvas.height - snakeSize + 1){
            alert('Game Over! Final Length: ' + length + ' Array length: '+ snakeArray.length);
            x = 20;
            y = 20;
            direction = 0;
            isApple = false;
            length = 1;
            snakeArray.splice(0,snakeArray.length-1)
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.shadowBlur=8;
        ctx.shadowColor="green";
        ctx.fillStyle = "green";
        ctx.font = "18px Arial";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        ctx.fillText("Length: " + length, 10, canvas.height - 19);


        for (var i = 0; i < length; i++) {
            ctx.fillRect(snakeArray[i][0],snakeArray[i][1],snakeSize,snakeSize);
        }
        ctx.shadowColor="red"
        ctx.fillStyle = "red";
        ctx.fillRect(applex,appley,snakeSize,snakeSize);
    }


    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37: // left
            direction = 1;
            break;
            case 38: // up
            direction = 2;
            break;
            case 39: // right
            direction = 3;
            break;
            case 40: // down
            direction = 4;
            break;
        }
    }

}