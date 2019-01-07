/// Operations.js
/// This file is about the mechanism that operates th
import {vec3} from './gl-matrix.js'
var lookAt = [0,0,-1];
var eye = [0,2,3];
var cameraUP = [0,1,0];

var test=vec3.create(); //作为接受vec3.multiply的结果的一个向量而已
var test2 = vec3.create();
var test3 = vec3.create();
var CameraSpeed = [0.2,0.2,0.2]
var pitch=0,yaw=0; //设置视角的角度，水平面一个，垂直一个

const radin = 10; //随便设一个半径


document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'a') {
        vec3.cross(test2,eye,cameraUP);
        vec3.add(eye,eye,vec3.multiply(test3,test2,CameraSpeed));

        return;
    }
    if (keyName === 'd') {
        vec3.cross(test2,eye,cameraUP);
        vec3.sub(eye,eye,vec3.multiply(test3,test2,CameraSpeed));
        return;
    }
    if (keyName === 'w') {
        vec3.add(eye,eye,vec3.multiply(test,lookAt,CameraSpeed));
        return;
    }
    if (keyName === 's') {
        vec3.sub(eye,eye,vec3.multiply(test,lookAt,CameraSpeed));
        return;
    }


}, false);




let last_position={};
document.addEventListener('mousemove', (event) => {

    if (typeof(last_position.x) !="undefined" ) {

        var deltaX = -last_position.x + event.clientX,
            deltaY = -last_position.y + event.clientY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
            yaw+=0.1;
        }else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
            yaw-=0.1;
        }else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
            pitch-=0.1;
        }else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
            pitch+=0.1;
        }
        if(pitch>Math.PI/2-0.01) pitch=Math.PI/2-0.01;
        if(pitch<-Math.PI/2+0.01) pitch=-Math.PI/2+0.01;
    }
    last_position = {
        x : event.clientX,
        y : event.clientY
    };
    lookAt[0]=Math.cos(pitch)*Math.cos(yaw);
    lookAt[1]=Math.sin(pitch);
    lookAt[2]=Math.cos(pitch)*Math.sin(yaw);
    console.log(pitch);

}, false);

export {lookAt,eye,cameraUP};