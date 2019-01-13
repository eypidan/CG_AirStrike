/// Operations.js
/// This file is about the mechanism that operates th
import {vec3} from './gl-matrix.js'
var lookAt = [0,0,-1];
var eye = [0,2,3];
var cameraUP = [0,1,0];

// 操作对象
// 0 for scene control, 1-3 for robot control
let Target = 0;

// 用于切换视角后恢复上一组视角。
class camera
{
    constructor()
    {
        this.lookAt   = [0, 0, 0];
        this.eye      = [0, 1, 1];
        this.cameraUP = [0, 1, 0];
    }
    restore()
    {
        lookAt   = this.lookAt;
        eye      = this.eye;
        cameraUP = this.cameraUP;
    }
    store()
    {
        this.lookAt   = lookAt;
        this.eye      = eye;
        this.cameraUP = cameraUP;
    }
}

let cameras = [
    new camera(),   // camera 0 for the scene navigation
    new camera(),   // camera 1 for navigation of robot 1
    new camera(),   // camera 2 for navigation of robot 1
    new camera()    // camera 3 for navigation of robot 1
];

var test = vec3.create(); //作为接受vec3.multiply的结果的一个向量而已
var test2 = vec3.create();
var test3 = vec3.create();
var CameraSpeed = [0.2,0.2,0.2]
var pitch=0, yaw=0; //设置视角的角度，水平面一个，垂直一个

let aDown = false;
let sDown = false;
let dDown = false;
let wDown = false;

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    // Switching Target Mode
    if (keyName === '0' || keyName === '1' || keyName === '2' || keyName === '3')
    {
        // 目前Target还是上次的值。
        // 将上一个Target最后的摄像机向量放到本地数组中。
        cameras[Target].store();

        // 恢复上一次该物体的相机参数，并从此开始
        Target = keyName - '0';
        cameras[Target].restore();

        return;
    }


    if (Target == 0)
    {
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
    }

    else if (Target >= 1 && Target <= 3)
    {
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
    // console.log(pitch);

}, false);

export {lookAt, eye, cameraUP, Target, aDown, sDown, dDown, wDown};