/******************************************************************************\
 * gaia_util.js                                                               *
 * -------------------------------------------------------------------------- *
 * global variable delcarations                                               *
 * clearCanvas                                                                *
 * centralInit                                                                *
 * gameStart                                                                  *
 * gameLoop                                                                   *
 * checkLives                                                                 *
 * reset                                                                      *
 * continueButton(e)                                                          *
 * cursorPosition(x,y)                                                        *
 * getCursorPos(e)                                                            *
 * scoreTotal                                                                 *
\******************************************************************************/

/******************************************************************************\
 *                           FUNCTION DIRECTORY                               *
 * -------------------------------------------------------------------------- *
 * File Name       | Contents                                                 *
 * ---------------------------------------------------------------------------*
 * gaia_background | drawStarfield                                            *
 * ---------------------------------------------------------------------------*
 * gaia_collision  | hitTest, shipCollision                                   *
 * ---------------------------------------------------------------------------*
 * gaia_enemies    | moveEnemies, drawEnemies                                 *
 * ---------------------------------------------------------------------------*
 * gaia_player     | moveLaser, drawShip, drawLaser, keyDown(e), keyUp(e)     *
 * ---------------------------------------------------------------------------*
 * gaia_util       | Global Variable Declarations, clearCanvas, centralInit,  *
 *                 | gameStart, gameLoop, checkLives, reset,                  *
 *                 | continueButton(e), cursorPosition(x,y), getCursorPos(e), *
 *                 | scoreTotal                                               *
\******************************************************************************/

//=======================================\\
// Global Variable Declarations          \\
//=======================================\\
var canvas,
    ctx,
    width = 600,
    height = 600;

var rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false;

var score = 0,
    alive = true,
    lives = 3,
    gameStarted = false;

var ship,
    ship_x = ((width / 2) - 25),
    ship_y = (height - 75),
    ship_w = 57,
    ship_h = 29;

var lasers = [],
    laserTotal = 2;

var enemy,
    enemyTotal = 5,
    enemies = [],
    enemy_x = 599,
    enemy_y = 50,
    enemy_w = 29,
    enemy_h = 37,
    enemy_speed = 3;

for(var i=0; i<enemyTotal; i=i+1){
    enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, enemy_speed]);
    enemy_y += enemy_h + 60;
}

var starField,
    star_X = 0,
    star_X2 = -600,
    star_Y = 0;

//=======================================\\
// clearCanvas                           \\
//=======================================\\
function clearCanvas(){
    ctx.clearRect(0, 0, width, height);
}

//=======================================\\
// centralInit                           \\
//=======================================\\
function centralInit(){

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Ship
    ship = new Image();
    ship.src = 'static/img/Fighter3.png';

    // Enemy
    enemy = new Image();
    enemy.src = 'static/img/enemy_fighter1.png';

    // StarField
    starfield = new Image();
    starfield.src = 'static/img/starfield.jpg';

    // Event Listeners
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    canvas.addEventListener('click', gameStart, false);

    gameLoop();
}

//=======================================\\
// gameStart                             \\
//=======================================\\
function gameStart(){
    gameStarted = true;
    canvas.removeEventListener('click', gameStart, false);
}

//=======================================\\
// gameLoop                              \\
//=======================================\\
function gameLoop(){
    clearCanvas();
    drawStarfield();

    if(alive && gameStarted && lives > 0){
        hitTest();
        shipCollision();
        moveLaser();
        moveEnemies();
        drawEnemies();
        drawShip();
        drawLaser();
    }
    
    scoreTotal();

    game = setTimeout(gameLoop, 1000/30);
}

//=======================================\\
// checkLives                            \\
//=======================================\\
function checkLives(){
    lives -= 1;
    if(lives > 0){
        reset();
    }else if(lives === 0){
        alive = false;
    }
}

//=======================================\\
// reset                                 \\
//=======================================\\
function reset(){
    var enemy_reset_x = 50;
    ship_x = (width/2) - 25, ship_y = height - 75, ship_w = 50, ship_h = 57;
    
    var temp_enemy_length = enemies.length;
    for(var i=0; i < temp_enemy_length; i++){
        enemies[i][0] = enemy_reset_x;
        enemies[i][1] = -45;
        enemy_reset_x = enemy_reset_x + enemy_w + 60;
    }
}

//=======================================\\
// continueButton(e)                     \\
//=======================================\\
function continueButton(e){
    var cursorPos = getCursorPos(e);

    if((cursorPos.x > (width/2) - 53) &&
        (cursorPos.x < (width/2) + 47) &&
        (cursorPos.y > (height/2) + 10) &&
        (cursorPos.y < (height/2) + 50)){
        alive = true;
        lives = 3;
        reset();
        canvas.removeEventListener('click', continueButton, false);
    }
}

//=======================================\\
// cursorPosition(x,y)                   \\
//=======================================\\
function cursorPosition(x,y){
    this.x = x;
    this.y = y;
}

//=======================================\\
// getCursorPos(e)                       \\
//=======================================\\
function getCursorPos(e){
    var x, y;

    if(e.pageX || e.pageY){
        x = e.pageX;
        y = e.pageY;
    }else{
        x = (e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft);
        y = (e.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop);
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    var cursorPos = new cursorPosition(x, y);

    return cursorPos;
}

//=======================================\\
// scoreTotal                            \\
//=======================================\\
function scoreTotal(){
    ctx.font = 'bold 20px VT323';
    ctx.fillStyle = '#fff';

    ctx.fillText('Score: ', 10, 55);
    ctx.fillText(score, 70, 55);

    ctx.fillText('Lives:', 10, 30);
    ctx.fillText(lives, 68, 30);

    ctx.fillText('P-X: ', 10, 70);
    ctx.fillText(ship_x, 70, 70);

    ctx.fillText('P-Y: ', 10, 85);
    ctx.fillText(ship_y, 70, 85);

    if(!gameStarted){
        ctx.font = 'bold 50px VT323';
        ctx.fillText('Gaia', ((width/2) - 150), (height/2));

        ctx.font = 'bold 20px VT323';
        ctx.fillText('Click to Play', ((width/2) - 56), ((height/2) + 30));

        ctx.fillText('User arrow keys to move', ((width/2) - 100), ((height/2) + 60));
        ctx.fillText('Use the x key to shoot', ((width/2) - 100), ((height/2) + 90));
    }

    if(!alive){
        ctx.fillText('Game Over!', 245, (height/2));
        ctx.fillRect(((width/2) - 60), ((height/2) + 10), 100, 40);
        ctx.fillStyle = '#000';
        ctx.fillText('Continue?', 250, ((height/2) + 35));
        canvas.addEventListener('click', continueButton, false);
    }
}
