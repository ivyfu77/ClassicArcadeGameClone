"use strict";

/** Game Enemy class
 * Define the moving bugs
 * @param url, indicate Enemy's showing img
 * @param x, indicate Enemy's X position
 * @param y, indicate Enemy's Y position
 * @param rand, a random number for calculating Enemy's speed 
 */
var Enemy = function(url, x, y, rand) {
    // Enemy's location (x, y)
    this.x = x;
    this.y = y;

    // Use a random value to controll moving speed
    this.rand = rand;

    // Enemy's img file
    this.sprite = url;
};

// Define this function to update enemies' locations
// parameters: dt (Time distance between two updates, make sure the same moving speed on different computers)
Enemy.prototype.update = function(dt) {
    // Set base distance to get the scale: dt/base
    let base = 0.016;
    this.x = (this.x > c.width + 50) ? -50 : Math.floor(this.x + dt/base * this.rand);
};

// Render the enemies on canvas
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define Player class
var Player = function(x, y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
};

// Define Player's render function (Showing player img on canvas)
Player.prototype.render = function() {
    var imgSource = Resources.get(this.sprite);
    if (imgSource) {
        ctx.drawImage(imgSource, this.x, this.y);
    }
};

// Response the keyup event except Game Over
Player.prototype.handleInput = function(key) {
    //console.log("handleInput()- play & isWin:", play, isWin);

    // Game Over: will not response the keyup event
    // Win the Game: still can use direction keys to controll the player
    if (play === true || isWin === true) {
        switch (key) {
            case "left":
                this.x = (this.x == 0) ? this.x : this.x - rowUnit;
                break;
            case "up":
                this.y = (this.y == 0) ? this.y : this.y - colUnit;
                break;
            case "right":
                this.x = (this.x / rowUnit == 4) ? this.x : this.x + rowUnit;
                break;
            case "down":
                this.y  = (this.y / colUnit == 5) ? this.y : this.y + colUnit;
                break;
        }
    }
};

//Define a star class, for showing win-animation
var Star = function(x, y) {
    this.sprite = "images/Star.png";
    this.x = x;
    this.y = y;
};

Star.prototype.render = function() {
    var imgSource = Resources.get(this.sprite);
    if (imgSource) {
        ctx.drawImage(imgSource, this.x, this.y);
    }
};

var play = true, //store the flag of pause/play switch
    isWin = false; //store the flag if the player has won

// Define unit consts for calculating (x, y) easily
const rowUnit = 101,
      colUnit = 75;

// Define Enemies' instances, use random value setting different speeds
var rand = Math.floor((Math.random() * 10) + 1); // Get a random number between 1 - 10
var enemy1 = new Enemy('images/enemy-bug2.png', 0, 1 * colUnit, rand);

rand = Math.floor((Math.random() * 10) + 1); // Get a new random number between 1 - 10
var enemy2 = new Enemy('images/enemy-bug1.png', 0, 2 * colUnit, rand);

rand = Math.floor((Math.random() * 10) + 1); // Get a new random number between 1 - 10
var enemy3 = new Enemy('images/enemy-bug.png', 0, 3 * colUnit, rand);

// Put all enemies in allEnemies array
var allEnemies = [enemy1, enemy2, enemy3];

// Defien a Player instance
var player = new Player(2 * rowUnit, 5 * colUnit);

var star1 = new Star(1 * rowUnit, 2 * colUnit);
var star2 = new Star(3 * rowUnit + 40, 1 * colUnit - 10);
var star3 = new Star(4 * rowUnit - 40, 4 * colUnit + 15);
var star4 = new Star(0 + 40, 4 * colUnit + 15);
var star5 = new Star(-5, 10);
var allStars = [star1, star2, star3, star4, star5];

// Add a listener function to response direction-keys-click event
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
