/** Engine.js
 * This file realize this game's playing functions (Update & Render)
 */
"use strict";

var Engine = (function(global) {
    /** Define all the variables
     * Create canvas element, get the 2D context
     * Set canvas' width & height then add it to DOM
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        sparkleNum = 0,
        showNum = 0,
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /** Main entrance of the game, call update / render function when necessary */
    function main() {
        /* Get the time distance as a parameter when call update()
         * Help enemies moving at the same speed in different computers
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        /* Set lastTime to get the dt at next call of main() */
        lastTime = now;

        /* Using requestAnimationFrame() realize calling main() in loop
         */
        win.requestAnimationFrame(main);

    }

    /* Initialize the game enviroment, set lastTime
     * Only need to call once at the begining
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* Define how to update the playing canvas during the game
     * 1. Update all the game entities
     * 2. Check if player meet any of the enemies
     * 3. Check if player reach the bottom line (Win)
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        checkWin();
    }
    
    // Check if player meet any of the enemies, if yes stop the game and show "Play Again" button
    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            //Check if player and one of the enemies at the same position
            if (Math.floor(enemy.x / rowUnit) == Math.floor(player.x / rowUnit) && 
                Math.floor(enemy.y / colUnit) == Math.floor(player.y / colUnit)) {
                
                play = false;

                // Show "Play Again" button
                var btn = doc.getElementById("play");
                btn.style.display = "block";
                return;
            }
        });
        return;
    }

    // Check if player win the game, if yes stop the game and set isWin flag as true
    function checkWin() {
        if (Math.floor(player.y / colUnit) == 0) {
            play = false;
            isWin = true;
            // Show "Play Again" button
            var btn = doc.getElementById("play");
            btn.style.display = "block";
        }

    }

    // Define the function when click the 'Play Again' button
    function startPlay() {
        play = true;
        isWin = false;

        // Loop all enemy instances to reset the rand prop (Realize random speed when resart the game)
        allEnemies.forEach(function(enemy) {
            enemy.rand = getRandomNum(1, 10);
        });
        reset();

        //Hide the "Play Again" button
        var btn = doc.getElementById("play");
        btn.style.display = "none";
    }

    function getRandomNum(min, max) {
        return Math.floor((Math.random() * max) + min);
    }

    /* Loop allEnemies array, update all enemies' location props
     */
    function updateEntities(dt) {
        if (play) {
            allEnemies.forEach(function(enemy) {
                enemy.update(dt);
            });
        }
    }

    /* Render game interface, will be called during each loop
     * 1. Render the game background
     * 2. Render all game entites
     * 3. Render different msg when "Game Over" & "Win the Game"
     */
    function render() {
        /* Define background img source */
        var rowImages = [
                'images/water-block.png',   // First line of river
                'images/stone-block.png',   // First line of stone
                'images/stone-block.png',   // Second line of stone
                'images/stone-block.png',   // Third line of stone
                'images/grass-block.png',   // First line of grass
                'images/grass-block.png'    // Second line of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Use row, col and rowImages, rendering the right imgs */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
        ctx.fillStyle = "rgba(255, 152, 0, 0.85)";
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        if (!play && !isWin) {
            // Show "Game Over" on canvas
            ctx.font = "60px Impact";
            ctx.fillText("Game Over", canvas.width/2, 200);
            ctx.strokeText("Game Over", canvas.width/2, 200);
        } else if (isWin) {
            // Show "Well Done, You Win!" on canvas
            ctx.font = "50px Impact";
            ctx.fillText("Well Done, You Win!", canvas.width/2, 200);
            ctx.strokeText("Well Done, You Win!", canvas.width/2, 200);
        }
    }

    /** Render all enemies and player
     * - Will be called during each main() loop
     */
    function renderEntities() {
        if (play) {
            /* 遍历在 allEnemies 数组中存放的作于对象然后调用你事先定义的 render 函数 */
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
            player.render();
        }

        /*----Render the sparkling stars--------------*/
        //sparkleNum: controll the period not showing the stars
        //showNum: controll the period showing the stars
        if (isWin) {
            if (sparkleNum < 20) {

                sparkleNum ++;
            } else {
                if (showNum < 20) {
                    showNum ++;
                    allStars.forEach(function(star) {
                        star.render();
                    });
                } else {
                    showNum = 0;
                    sparkleNum = 0;
                }
            }
            player.render();
        }
        /*--------------------------------------------*/

    }

    // Set enemies and player go back start position
    function reset() {
        play = true;
        allEnemies.forEach(function(enemy) {
            enemy.x = -101;
        });
        player.x = 2 * rowUnit;
        player.y = 5 * colUnit;
    }

    /* Preload all necessary imgs, set init() as callback function
     * When finish loading all imgs game will begin
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/enemy-bug1.png',
        'images/enemy-bug2.png',
        'images/char-boy.png',
        'images/char-horn-girl.png',
        'images/Star.png'
    ]);
    Resources.onReady(init);

    /* Set canvas context (ctx), canvas, startPlay() as global variable
     * We can use them in app.js directly
     */
    global.ctx = ctx;
    global.c = canvas;
    global.startPlay = startPlay;

})(this);
