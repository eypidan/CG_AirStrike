/// Operations.js
/// This file is about the mechanism that operates th

var lookAtX = 0;
var lookAtY = 0;
var lookAtZ = 0;
var eyeX = 0;
const eyeY = 0;  //无需改变，视角高度写死
var eyeZ = 0;

var theat_xy=0,theat_z=0; //设置视角的角度，水平面一个，垂直一个
const radin = 10; //随便设一个半径
// let aDown = false;   //这里不需要判断，压下去的时候自增即可
// let sDown = false;
// let dDown = false;
// let wDown = false;


document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'd') {
        eyeX++;
        // console.log(lookAtX++);
        return;
    }
    if (keyName === 'a') {
        // aDown = true;
        eyeX--;
        return;
    }
    if (keyName === 'w') {
        eyeZ++;
        // wDown = true;
        return;
    }
    if (keyName === 's') {
        // sDown = true;
        eyeZ--;
        return;
    }
}, false);




let last_position={};
document.addEventListener('mousemove', (event) => {
    //check to make sure there is data to compare against
    if (typeof(last_position.x) !="undefined" ) {
        //get the change from last position to this position
        var deltaX = last_position.x - event.clientX,
            deltaY = last_position.y - event.clientY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) { //鼠标左移,控制左右视角
            theat_xy+= 0.05;
            // console.log(lookAtX);
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {  //鼠标右移,控制左右视角
            theat_xy-= 0.05;
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
            theat_z += 0.05;
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {  //上下视角
            theat_z -= 0.05;
        }
    }
    last_position = {
        x : event.clientX,
        y : event.clientY
    };
    eyeX = radin*Math.cos(theat_xy);
    eyeZ = radin*Math.sin(theat_xy);
    // lookAtY = radin*Math.sin(theat_z);
}, false);

export {lookAtX,lookAtY,lookAtZ,eyeX,eyeY,eyeZ};