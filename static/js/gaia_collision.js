/******************************************************************************\
 * gaia_collision.js                                                          *
 * -------------------------------------------------------------------------- *
 * hitTest                                                                    *
 * shipCollision                                                              *
\******************************************************************************/

//=======================================\\
// hitTest                               \\
//=======================================\\
function hitTest(){
    var remove = false,
        temp_laser_length = lasers.length,
        temp_enemy_length = enemies.length;
    
    console.log('laser_length: ' + temp_laser_length);

    for(var i=0; i<temp_laser_length; i++){
        for(var j=0; j<temp_enemy_length; j++){
            console.log('lasers[i][1]: ' + lasers[i][1]);
            if((lasers[i][1] <= (enemies[j][1] + enemies[j][3])) &&
                (lasers[i][0] >= enemies[j][0]) &&
                (lasers[i][0] <= (enemies[j][0] + enemies[j][2]))){
                remove = true;
                // Remove Enemy
                enemies.splice(j, 1);
                // Add Score
                score += 10;
                // Spawn New Enemy
                enemies.push([(Math.random() * 500) + 50, -45, enemy_w, enemy_h, enemy_speed]);
            }
        }
        if(remove === true){
            lasers.splice(i, 1);
            remove = false;
        }
    }
}

//=======================================\\
// shipCollision                         \\
//=======================================\\
function shipCollision(){
    var ship_xw = (ship_x + ship_w);
    var ship_yh = (ship_y + ship_h);
    var temp_enemy_length = enemies.length;

    for(var i=0; i<temp_enemy_length; i++){
        if((ship_x > enemies[i][0]) &&
           (ship_x < (enemies[i][0] + enemy_w)) &&
           (ship_y > enemies[i][1]) &&
           (ship_y < (enemies[i][1] + enemy_h))){
            checkLives();
        }
        if((ship_xw < (enemies[i][0] + enemy_w)) &&
           (ship_xw > enemies[i][0]) &&
           (ship_y > enemies[i][1]) &&
           (ship_y < (enemies[i][1] + enemy_h))){
            checkLives();     
        }
        if((ship_yh > enemies[i][1]) &&
           (ship_yh < (enemies[i][1] + enemy_h)) &&
           (ship_x > enemies[i][0]) &&
           (ship_x < (enemies[i][0] + enemy_w))){
            checkLives();
        }
        if((ship_yh > enemies[i][1]) &&
           (ship_yh < (enemies[i][1] + enemy_h)) &&
           (ship_xw < (enemies[i][0] + enemy_w)) &&
           (ship_xw > enemies[i][1])){
            checkLives();
        }
    }
}
