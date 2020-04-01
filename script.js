var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

let screenWidth = 1000;
let screenHeight = 500;
let width = 50;

var moveDirection;

class GameCharacter {
    constructor(x, y, width, height, color, speed)  {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.maxSpeed = 4;
    }
   


    playerAction() {
        // horizontally when "1"
        if (this.x >= screenWidth - this.width) {
            this.x = screenWidth - this.width;
        } else if (this.x <= 0) {
            this.x = 0;
        }
        if (moveDirection == 1 && this.x <= screenWidth) {
            this.x += this.speed;
            this.y = this.y
        } 
        // vertically when "2"
        if (this.y >= screenHeight - this.height) {
            this.y = screenHeight - this.height;
        } else if (this.y <= 0) {
            this.y = 0;
        }    
        if (moveDirection == 2) {
            this.y += this.speed;
            this.x = this.x
        };
        
    }
    moveVertically() {
        if (this.y > screenHeight - 100) {
            this.speed = -this.speed;
            
        } 
        if (this.y < 50) {
            this.speed = -this.speed;
        }
            this.y += this.speed;
    }
    
};


var enemies = [
      new GameCharacter(200, 225, width, width, "rgb(0, 0, 200)", 2),
      new GameCharacter(450, 400, width, width, "rgb(0, 0, 200)", 4),
      new GameCharacter(700, 400, width/2, 2*width, "rgb(0, 0, 200)", 6),
    ]; 

var player = new GameCharacter(50, screenHeight/2, 50, 50, "rgb(255, 255, 0", 0);    

var goal = new GameCharacter(screenWidth - 100, screenHeight - 100, 100, 100, "rgb(0, 255, 0,", 0);

document.onkeydown = function(event) {
    let keyPressed = event.keyCode;
    // tu sie ruszamy w prawo
    if (keyPressed == 39) {
        player.speed = player.maxSpeed;
        moveDirection = 1;
    } 
    // tu sie ruszamy w gore
    if (keyPressed == 38) {
        player.speed = -player.maxSpeed;
        moveDirection = 2;
    }
    // tu sie ruszamy w lewo
    if (keyPressed == 37) {
        player.speed = -player.maxSpeed;
        moveDirection = 1;
    }
    // tu sie ruszamy w dol
    if (keyPressed == 40) {
        player.speed = player.maxSpeed;
        moveDirection = 2;
    }
};

document.onkeyup = function(event) {
    player.speed = 0;
}

var checkCollisions = function(rect1, rect2) {
    var xOverlap = Math.abs(rect1.x - rect2.x) <= Math.min(rect1.width, rect2.width);
    var yOverlap = Math.abs(rect1.y - rect2.y) <= Math.min(rect1.height, rect2.height);
    return xOverlap && yOverlap;
}

var draw = function() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

    enemies.forEach(function(element) {
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
    });
}  
var update = function() {
    player.playerAction();
    enemies.forEach(function(element) {
        if (checkCollisions(player, element)) {
            alert("collision detected");
            } else if (checkCollisions(player, goal)) {
            alert("You win! lol")    
            }
        element.moveVertically();
    });
}


var step = function() {
    update();
    draw();

    window.requestAnimationFrame(step);
}

step();