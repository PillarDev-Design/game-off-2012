/******************************************************************************\
 * gaia_util.js                                                               *
 * -------------------------------------------------------------------------- *
 * global variable delcarations                                               *
 * clearCanvas                                                                *
 * centralInit                                                                *
 * gameStart                                                                  *
 * gameLoop                                                                   *
\******************************************************************************/

//=======================================\\
// Global Variable Declarations          \\
//=======================================\\
var canvas,
    ctx,
    width = 1200,
    height = 800;

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
    ship_w = 50,
    ship_h = 57;

var lasers = [],
    laserTotal = 2;

var enemy,
    enemyTotal = 5,
    enemies = [],
    enemy_x = 50,
    enemy_y = -45,
    enemy_w = 50,
    enemy_h = 38,
    enemy_speed = 3;

for(var i=0; i<enemyTotal; i=i+1){
    enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, enemy_speed]);
    enemy_x += enemy_w + 60;
}

var starField,
    star_X = 0,
    star_Y = 0,
    star_Y2 = -600;

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
    canvas = document.getElementById('play_area');
    ctx = canvas.getContext('2d');

    // Ship
    ship = new Image();
    ship.src = '../img/ship.png';

    // Enemy
    enemy = new Image();
    enemy.src = '../img/8bit_enemy.png';

    // StarField
    starfield = new Image();
    starfield.src = '../img/starfield.jpg';

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
