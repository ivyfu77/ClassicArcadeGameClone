// Define enemy player should stay away
var Enemy = function(url, x, y, rand) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.rand = rand;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = url;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    // Set base distance to get the scale: dt/base
    let base = 0.016;
    this.x = (this.x > c.width + 50) ? -50 : Math.floor(this.x + dt/base * this.rand);
};

// Render the enemies on canvas
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.render = function() {
    var imgSource = Resources.get(this.sprite);
    if (imgSource) {
        ctx.drawImage(imgSource, this.x, this.y);
    }
};

Player.prototype.handleInput = function(key) {
    console.log("handleInput()- play & isWin:", play, isWin);
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

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
const rowUnit = 101,
      colUnit = 75;
var rand = Math.floor((Math.random() * 10) + 1);
var enemy1 = new Enemy('images/enemy-bug2.png', 0, 1 * colUnit, rand);

rand = Math.floor((Math.random() * 10) + 1);
var enemy2 = new Enemy('images/enemy-bug1.png', 0, 2 * colUnit, rand);

rand = Math.floor((Math.random() * 10) + 1);
var enemy3 = new Enemy('images/enemy-bug.png', 0, 3 * colUnit, rand);

var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(2 * rowUnit, 5 * colUnit);

var star1 = new Star(1 * rowUnit, 2 * colUnit);
var star2 = new Star(3 * rowUnit + 40, 1 * colUnit - 10);
var star3 = new Star(4 * rowUnit - 40, 4 * colUnit + 15);
var star4 = new Star(0 + 40, 4 * colUnit + 15);
var star5 = new Star(-5, 10);
var allStars = [star1, star2, star3, star4, star5];

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
