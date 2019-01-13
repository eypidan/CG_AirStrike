import {lookAt, cameraUP, Target, eye, aDown, sDown, dDown, wDown} from "./Operations";
import {vec3, mat4} from './gl-matrix'

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
    else {
        // Accelerating
        if (Object.MotionParameters.Speed < Object.MotionParameters.MaxSpeed) {
            Object.MotionParameters.Speed += 1 * deltaTime;
        }
    }

    let distance = Object.MotionParameters.Speed * deltaTime;
    let dx = distance * Math.cos(directionalTheta * Math.PI / 180);
    let dz = distance * Math.sin(directionalTheta * Math.PI / 180);

    // 视角跟踪
    eye[0] += dx; eye[2] += dz;
    lookAt[0] += dx; lookAt[2]+= dz;
    // eyeX += dx; eyeZ += dz;
    // lookAtX += dx; lookAtZ += dz;

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


function doMotion(Objects, deltaTime) {
    let root = Objects;
    RootRotate(root, deltaTime);
    MoveForward(root, deltaTime);
}

export {doMotion};