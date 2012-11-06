/******************************************************************************\
 * gaia_player.js                                                             *
 * -------------------------------------------------------------------------- *
 * moveLaser                                                                  *
 * drawShip                                                                   *
 * drawLaser                                                                  *
 * keyDown(e)                                                                 *
 * keyUp(e)                                                                   *
\******************************************************************************/

//=======================================\\
// moveLaser                             \\
//=======================================\\
function moveLaser(){
    for(var i=0; i < lasers.length; i++){
        if(lasers[i][0] < 599){
            lasers[i][0] += 10;
        }else if(lasers[i][0] >= 600){
            lasers.splice(i, 1);
        }
    }
}

//=======================================\\
// drawShip                              \\
//=======================================\\
function drawShip(){
    if(rightKey){ ship_x +=5; 
    }else if(leftKey){ ship_x -=5; }

    if(upKey){ ship_y -=5;
    }else if(downKey){ ship_y +=5; }

    if(ship_x <= 0){ ship_x = 0; }
    if((ship_x + ship_w) >= width){ ship_x = (width - ship_w); }
    if(ship_y <= 0){ ship_y = 0; }
    if((ship_y + ship_h) >= height){ ship_y = (height - ship_h); }

    ctx.drawImage(ship, ship_x, ship_y);
}

//=======================================\\
// drawLaser                             \\
//=======================================\\
function drawLaser(){
    if(lasers.length){
        var temp_laser_length = lasers.length;
        for(var i=0; i < temp_laser_length; i++){
            ctx.fillStyle = '#f00';
            ctx.fillRect(lasers[i][0], lasers[i][1], lasers[i][2], lasers[i][3]);
        }
    }
}

//=======================================\\
// keyDown(e)                            \\
//=======================================\\
function keyDown(e){
    if(e.keyCode === 39){
        rightKey = true;
    }else if(e.keyCode === 37){ 
        leftKey = true;
    }

    if(e.keyCode === 38){ 
        upKey = true;
    }else if(e.keyCode === 40){ 
        downKey = true;
    }

    if((e.keyCode === 88) && (lasers.length <= laserTotal)){
        lasers.push([(ship_x + 50), (ship_y + 13), 20, 4]);
    }
}

//=======================================\\
// keyUp(e)                              \\
//=======================================\\
function keyUp(e){
    if(e.keyCode === 39){ rightKey = false;
    }else if(e.keyCode === 37){ leftKey = false; }

    if(e.keyCode === 38){ upKey = false;
    }else if(e.keyCode === 40){ downKey = false; }
}
