/******************************************************************************\
 * gaia_enemies.js                                                            *
 * -------------------------------------------------------------------------- *
 * moveEnemies                                                                *
 * drawEnemies                                                                *
\******************************************************************************/

//=======================================\\
// moveEnemies                           \\
//=======================================\\
function moveEnemies(){
    var temp_enemy_length = enemies.length;

    for(var i=0; i<temp_enemy_length; i++){
        if(enemies[i][0] > 0){
            enemies[i][0] -= enemies[i][4];
        }else if(enemies[i][0] <= 0){
            enemies[i][0] = 599; 
        }
    }
}

//=======================================\\
// drawEnemies                           \\
//=======================================\\
function drawEnemies(){
    var temp_enemy_length = enemies.length;

    for(var i=0; i<temp_enemy_length; i++){
        // Image, X coord, Y Coord
        ctx.drawImage(enemy, enemies[i][0], enemies[i][1]);
    }
}
