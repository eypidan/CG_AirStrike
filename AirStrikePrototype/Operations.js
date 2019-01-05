/// Operations.js
/// This file is about the mechanism that operates th

var lookAtX = 0;
var lookAtY = 0;
var lookAtZ = 0;
var eyeX = 0;
var eyeY = 0;
var eyeZ = -10;
var upX = 0;
var upY = 1;
var upZ = 0;

let aDown = false;
let sDown = false;
let dDown = false;
let wDown = false;


document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'd') {
        dDown = true;
        return;
    }
    if (keyName === 'a') {
        aDown = true;
        return;
    }
    if (keyName === 'w') {
        wDown = true;
        return;
    }
    if (keyName === 's') {
        sDown = true;
        return;
    }
}, false);

document.addEventListener('keyup', (event) =>{
    const keyName = event.key;

    if (keyName === 'd') {
        dDown = false;
        return;
    }
    if (keyName === 'a') {
        aDown = false;
        return;
    }
    if (keyName === 'w') {
        wDown = false;
        return;
    }
    if (keyName === 's') {
        sDown = false;
        return;
    }
}, false);



// let last_position={};
// document.addEventListener('mousemove', (event) => {
//     //check to make sure there is data to compare against
//     if (typeof(last_position.x) !="undefined" ) {
//         //get the change from last position to this position
//         var deltaX = last_position.x - event.clientX,
//             deltaY = last_position.y - event.clientY;
//         if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
//             lookAtX += 0.05;
//         } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
//             lookAtX -= 0.05;
//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
//             lookAtY += 0.05;
//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
//             lookAtY -= 0.05;
//         }
//     }
//     last_position = {
//         x : event.clientX,
//         y : event.clientY
//     };
// }, false);