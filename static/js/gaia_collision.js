/******************************************************************************\
 * gaia_collision.js                                                          *
 * -------------------------------------------------------------------------- *
 * hitTest                                                                    *
 * shipCollision                                                              *
\******************************************************************************/

//=======================================\\
// hitTest                               \\
//=======================================\\
function hitTest() {
    var remove = false;

    for (var i = 0; i < lasers.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
            if (lasers[i][1] <= (enemies[j][1] + enemies[j][3]) && lasers[i][0] >= enemies[j][0] && lasers[i][0] <= (enemies[j][0] + enemies[j][2])) {
                remove = true;
                enemies.splice(j, 1);
                score += 10;
                enemies.push([(Math.random() * 500) + 50, -45, enemy_w, enemy_h, enemy_speed]);
            }
        }
        if (remove === true) {
        lasers.splice(i, 1);
        remove = false;
        }
    }
}
//=======================================\\
// shipCollision                         \\
//=======================================\\
function shipCollision(){
    var ship_xw = (ship_x + ship_w),
        ship_yh = (ship_y + ship_h),
        temp_enemy_length = enemies.length;

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
