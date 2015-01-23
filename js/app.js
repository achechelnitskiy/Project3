//set the base coordinates for the enemy
var enemyXCoordinates = [-150];
var enemyYCoordinates = [70, 160, 250];
var enemySpeeds = [200, 300, 400];

//image size for bugs
var enemyImageWidth = 100;
var enemyImageHeight = 150;

//set the base coordinates for the player
var playerOriginalX = 220;
var playerOriginalY = 350;

//image size for player
var playerImageWidth = 80;
var playerImageHeight = 150;

var moveStep = 50;


// Enemies our player must avoid
var Enemy = function() {     
     this.setCoordinates();
     this.sprite = 'images/enemy-bug.png';
}

//grabs random values from corresponding arrays defined above
Enemy.prototype.setCoordinates = function() {
    this.x = enemyXCoordinates[Math.floor(Math.random()*enemyXCoordinates.length)];
    this.y = enemyYCoordinates[Math.floor(Math.random()*enemyYCoordinates.length)];
    this.speed = enemySpeeds[Math.floor(Math.random()*enemySpeeds.length)];
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) { 
    this.x += this.speed * dt;
      //when moving off the screen, trigger coordinates reset.  canvas width set up at 505, thus comparing x-coordinate to 505
      if (this.x > 505) {
        this.setCoordinates();
      };

 }


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, enemyImageWidth, enemyImageHeight);
}

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


var Player = function() { 
    this.setPlayerCoordinates();
    this.sprite = 'images/char-boy.png';
}

Player.prototype.setPlayerCoordinates = function() {
  this.x = playerOriginalX;
  this.y = playerOriginalY;
}

Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;

    this.checkCollisions();
}
Player.prototype.render = function(){
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y,playerImageWidth,playerImageHeight);
}

//catch key press and make sure player doesn't fall off the screen by 
//checking x/y coordinates 
Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 48) {
        this.x -= moveStep;
    }else if (key == 'right' && this.x < 400) {
        this.x += moveStep;
    }else if (key == 'up' &&  this.y > 48) {
        this.y -= moveStep;
    }else if (key == 'down' && this.y < 400) {
        this.y += moveStep;
    }
  
}
var player = new Player();



Player.prototype.checkCollisions = function() {  
    //water is reached, reset
    if (this.y < 40) {
        player.setPlayerCoordinates();
    }


    //in the danger zone
    if (this.y >= 50 && this.y <= 300) {


        allEnemies.forEach(function(enemy) {
            if (player.x < enemy.x + 80 && player.x + 80> enemy.x &&
                player.y < enemy.y + 50 && player.y + 50 > enemy.y ){
                     player.setPlayerCoordinates();
                }
        });

     
    }
}

//Disable arrow keys from scrolling window in game.
document.addEventListener("keydown", function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false)


/*
statusBanner = function (show) {
 
  // draw the text
    if(show == true){
       
        ctx.fillText("YOU DID IT!", 222, 40);
         ctx.font = "bold 16px Arial";
        ctx.fillStyle = "blue";
    }else{
         //changing to white gives an effect of hiding the text
        // ctx.fillStyle = "white";
        console.log('clearing');
        // ctx.clearRect(222, 40, 100, 100);
         
        ctx.fillText("almost", 222, 40);
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "blue";
    }  
        
  

}*/

