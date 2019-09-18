/// Operations.js
/// This file is about the mechanism that operates th
import {vec3} from './gl-matrix.js'
import {mat4} from "./gl-matrix";
var lookAt = [0,0,-1];
var eye = [0,2,3];
var cameraUP = [0,1,0];
var viewDirection = [0, 1, 0]

function getCameraInfo()
{
    let a = {
        lookAt: lookAt,
        eye: eye,
        cameraUP: cameraUP
    };
    // console.log(a.eye);
    return a;
}

// 操作对象
// 0 for scene control, 1-3 for robot control
let Target = 0;

// 用于切换视角后恢复上一组视角。
class camera
{
    constructor()
    {
        this.lookAt   = [0, 1, 0];
        this.eye      = [2, 3, 4];
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

var pitch=0, yaw=0; //设置视角的角度，水平面一个，垂直一个

let aDown = false;
let sDown = false;
let dDown = false;
let wDown = false;
let rDown = false;
let tDown = false;
let missileTriggered = false;

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

        document.getElementById("OperationalTarget").innerHTML =  (Target>0?"Robot ":"Scene ") + Target;

        return;
    }


    if (keyName === 'a') {
        // vec3.cross(test2,eye,cameraUP);
        // vec3.add(eye,eye,vec3.multiply(test3,test2,CameraSpeed));
        let d = vec3.create();
        vec3.cross(d, cameraUP, viewDirection);
        vec3.add(eye, eye, vec3.scale(d, d, 0.5));
        vec3.add(lookAt, lookAt, vec3.scale(d, d, 0.5));
        return;
    }
    if (keyName === 'd') {
        // vec3.cross(test2,eye,cameraUP);
        // vec3.sub(eye,eye,vec3.multiply(test3,test2,CameraSpeed));
        let d = vec3.create();
        vec3.cross(d, viewDirection, cameraUP);
        vec3.add(eye, eye, vec3.scale(d, d, 0.5));
        vec3.add(lookAt, lookAt, vec3.scale(d, d, 0.5));
        return;
    }
    if (keyName === 'w') {
        vec3.add(eye, eye, vec3.scale(viewDirection, viewDirection, 0.5));
        vec3.add(lookAt, lookAt, vec3.scale(viewDirection, viewDirection, 0.5));
        return;
    }
    if (keyName === 's') {
        vec3.add(eye, eye, vec3.scale(viewDirection, viewDirection, -0.5));
        vec3.add(lookAt, lookAt, vec3.scale(viewDirection, viewDirection, -0.5));
        return;
    }

    if (Target >= 1 && Target <= 3)
    {
        if (keyName === 'ArrowRight') {
            dDown = true;
            return;
        }
        if (keyName === 'ArrowLeft') {
            aDown = true;
            return;
        }
        if (keyName === 'ArrowUp') {
            wDown = true;
            return;
        }
        if (keyName === 'ArrowDown') {
            sDown = true;
            return;
        }
        if (keyName === 'r') {
            rDown = true;
            return;
        }
        if (keyName === 't') {
            tDown = true;
            return;
        }
        if (keyName === 'e') {
            missileTriggered = true;
            return;
        }
    }

}, false);

document.addEventListener('keyup', (event) =>{
    const keyName = event.key;

    if (keyName === 'ArrowRight') {
        dDown = false;
        return;
    }
    if (keyName === 'ArrowLeft') {
        aDown = false;
        return;
    }
    if (keyName === 'ArrowUp') {
        wDown = false;
        return;
    }
    if (keyName === 'ArrowDown') {
        sDown = false;
        return;
    }
    if (keyName === 'r') {
        rDown = false;
        return;
    }
    if (keyName === 't')
    {
        tDown = false;
        return;
    }
}, false);


let last_position={};
document.addEventListener('mousemove', (event) => {

    if (typeof(last_position.x) !="undefined" ) {

        var deltaX = -last_position.x + event.clientX,
            deltaY = -last_position.y + event.clientY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
            yaw+=0.08;
        }else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
            yaw-=0.08;
        }else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
            pitch-=0.08;
        }else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
            pitch+=0.08;
        }
        if(pitch>Math.PI/2-0.01) pitch=Math.PI/2-0.01;
        if(pitch<-Math.PI/2+0.01) pitch=-Math.PI/2+0.01;
    }
    last_position = {
        x : event.clientX,
        y : event.clientY
    };
    viewDirection[0]=Math.cos(pitch)*Math.cos(yaw);
    viewDirection[1]=Math.sin(pitch);
    viewDirection[2]=Math.cos(pitch)*Math.sin(yaw);
    lookAt[0] = eye[0] + viewDirection[0];
    lookAt[1] = eye[1] + viewDirection[1];
    lookAt[2] = eye[2] + viewDirection[2];
    // console.log(pitch);

}, false);


let directionalTheta = 90;  // 平面朝向参数角度（角度制）

function MoveForward(Object, deltaTime)
{
    // 按住w加速，直到上限，不按住减速，直到下限。
    if (wDown == false) {
        // 减速
        if (Object.MotionParameters.Speed > 0.00) {
            Object.MotionParameters.Speed -= 2 * deltaTime;
            if (Object.MotionParameters.Speed < 0.00)
                Object.MotionParameters.Speed = 0.00;
        }
    }
    else{
        // Accelerating
        if (Object.MotionParameters.Speed < Object.MotionParameters.MaxSpeed) {
            Object.MotionParameters.Speed += 1 * deltaTime;
        }
    }

    let distance = Object.MotionParameters.Speed * deltaTime;
    let dx = distance * Math.cos(directionalTheta * Math.PI / 180);
    let dz = distance * Math.sin(directionalTheta * Math.PI / 180);
    console.log(dx + " " + dz);

    // 视角跟踪
    eye[0] += dx; eye[2] += dz;
    // console.log(eye)
    lookAt[0] += dx; lookAt[2]+= dz;

    Object.ModelMatrix = mat4.translate(
        Object.ModelMatrix, Object.ModelMatrix,
        vec3.fromValues(0, 0, Object.MotionParameters.Speed * deltaTime)
    );
}

function RootRotate(root, deltaTime)
{
    // 同时按下或者都不按下
    if ((!dDown && !aDown) || (dDown && aDown))
        return;

    let dTheta = 90 * deltaTime;   // 每秒转90度...
    if (aDown)  // 逆时针转
    {
        directionalTheta += dTheta;
    }
    else if (dDown)
    {
        dTheta = -dTheta;
        directionalTheta += dTheta
    }
    directionalTheta = directionalTheta % 360;
    root.ModelMatrix = mat4.rotate(
        root.ModelMatrix, root.ModelMatrix,
        dTheta * Math.PI / 180, vec3.fromValues(0, 1, 0)
    );
}

function BodyRotate(body, deltaTime)
{
    // 同时按下或者都不按下
    if (rDown == true)
    {
        body.ModelMatrix = mat4.rotate(
            body.ModelMatrix, body.ModelMatrix,
            deltaTime * 100 * Math.PI / 180, vec3.fromValues(0, 1, 0)
        );
    }
    else if (tDown == true)
    {
        body.ModelMatrix = mat4.rotate(
            body.ModelMatrix, body.ModelMatrix,
            -deltaTime * 100 * Math.PI / 180, vec3.fromValues(0, 1, 0)
        );
    }
}

let mVv = 1, mVh = -3;
let height = 2;

function EjectMissile(Missile, deltaTime)
{
    if (!missileTriggered)
        return;
    if (height > 0.2)
    {
        console.log("Missile " + mVh);
        Missile.ModelMatrix = mat4.translate(
            Missile.ModelMatrix, Missile.ModelMatrix,
            vec3.fromValues(0, mVv*deltaTime, mVh*deltaTime)
        );
        mVv -= deltaTime;
        height += mVv*deltaTime;
    }
    if (height <= 0.2)
        missileTriggered = false;
    return;
}

function doMotion(Objects, deltaTime) {
    let root = Objects;
    EjectMissile(root.AdjObj[1], deltaTime);
    BodyRotate(root.AdjObj[0], deltaTime);
    BodyRotate(root.AdjObj[1], deltaTime);
    BodyRotate(root.AdjObj[2], deltaTime);
    RootRotate(root, deltaTime);
    MoveForward(root, deltaTime);
}

export {doMotion, getCameraInfo};

export {Target, aDown, sDown, dDown, wDown, viewDirection,eye,cameraUP};