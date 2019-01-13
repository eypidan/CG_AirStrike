// the main function

import fs from 'fs'
import {getModelBufferCollection,GetTextureCollection} from './ModelsManager.js';
import {Draw} from './DrawGenericObjects.js'
import {ObjectTrees} from './ObjectTrees';
import {doMotion} from "./Motion";
import {loadTextureCube,createCube,initCube,drawSkyBox} from "./SkyBox.js";

const vsSource = fs.readFileSync('./vsSource.glsl', 'utf8');
const vsSource_skyBox = fs.readFileSync('./vsSource_skyBox.glsl', 'utf8');

const fsSource = fs.readFileSync('./fsSource.glsl', 'utf8');
const fsSource_skyBox = fs.readFileSync('./fsSource_skyBox.glsl', 'utf8');

const env = JSON.parse(fs.readFileSync('./ModelObjects/env.json', 'utf8'))  // !! 必须通过主文件来读取文本，所以，我只能把读好的env对象传进来
const loCannons = JSON.parse(fs.readFileSync('./ModelObjects/LowerCannons.json', 'utf8'));
const upCannons =JSON.parse(fs.readFileSync ('./ModelObjects/UpperCannons.json', 'utf8'));
const reside = JSON.parse(fs.readFileSync('./ModelObjects/reside.json', 'utf8'));
const track = JSON.parse(fs.readFileSync('./ModelObjects/Track.json', 'utf8'));
const rotatingItem =JSON.parse(fs.readFileSync( './ModelObjects/RotatingItem.json', 'utf8'));

//这里不用理解，就是直接在js 里 执行 main（）而已，不能像原来那样在index.html onload来执行 ，注意。
setTimeout(()=>{
    // console.log("AirStrike Alert!");
    main();
}, 100);

function main() {
    /******************************
     * WebGL canvas acquisition
     ******************************/
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    /* Program Info is a structure where the information of the shader program
     * as well as locations of its attributes and uniforms */
    // ProgramInfo for objects that emits light (no reflection)

    let ProgramInfo = GenerateProgramInfo(gl, shaderProgram);
    let ModelBufferCollection = getModelBufferCollection(gl);
    let TextureCollection = GetTextureCollection(gl);

    let Objects = ObjectTrees(ModelBufferCollection, TextureCollection);

    var skyboxProgram = initShaderProgram(gl, vsSource_skyBox, fsSource_skyBox);
    var aCoords =  gl.getAttribLocation(skyboxProgram, "coords");
    var uViewMatrix = gl.getUniformLocation(skyboxProgram, "view");
    var uProjection = gl.getUniformLocation(skyboxProgram, "projection");

    gl.enableVertexAttribArray(aCoords);
    var cube = createCube(200);
    var skybox = initCube(gl, cube, aCoords, uViewMatrix);
    loadTextureCube(gl, skybox, skyboxProgram, uProjection);

    let then = 0;
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;
        // console.log(lookAtX);
        doMotion(Objects.Robot, deltaTime);


        gl.disable(gl.DEPTH_TEST); // 画天空盒时要关闭深度测试
        drawSkyBox(gl, skybox, skyboxProgram, uProjection);

        gl.enable(gl.DEPTH_TEST);
        Draw(gl, ProgramInfo, Objects);
        updateLight(gl, ProgramInfo);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

/******************************
 * Shader Program Initializer
 ******************************/
function initShaderProgram(gl, vsSource, fsSource_sun) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource_sun);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;

    function loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
}

function GenerateProgramInfo(gl, webGLPrograms) {
    const programInfo = {
        program: webGLPrograms,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(webGLPrograms, 'aVertexPosition'),
            normalPosition: gl.getAttribLocation(webGLPrograms, 'aNormal'),
            textureCoordPosition: gl.getAttribLocation(webGLPrograms, 'aTextureCoord')
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(webGLPrograms, 'uProjectionMatrix'),
            ViewMatrix: gl.getUniformLocation(webGLPrograms, 'uViewMatrix'),
            ModelMatrix: gl.getUniformLocation(webGLPrograms, 'uModelMatrix'),
            Sampler: gl.getUniformLocation(webGLPrograms, 'uSampler'),
            ambientLight: gl.getUniformLocation(webGLPrograms, 'ambientLight'),
            lightColor: gl.getUniformLocation(webGLPrograms, 'lightColor'),
            lightDirection: gl.getUniformLocation(webGLPrograms, 'lightDirection')
        },
    };

    return programInfo;
}

function updateLight(gl, programInfo)
{
    gl.uniform4f(
        programInfo.uniformLocations.ambientLight,
        parseFloat(document.getElementById("ambientLightR").value),
        parseFloat(document.getElementById("ambientLightG").value),
        parseFloat(document.getElementById("ambientLightB").value),
        1
    );
    gl.uniform4f(
        programInfo.uniformLocations.lightColor,
        parseFloat(document.getElementById("directionalLightR").value),
        parseFloat(document.getElementById("directionalLightG").value),
        parseFloat(document.getElementById("directionalLightB").value),
        0
    );
    gl.uniform3f(
        programInfo.uniformLocations.lightDirection,
        parseFloat(document.getElementById("directionalLightX").value),
        parseFloat(document.getElementById("directionalLightY").value),
        parseFloat(document.getElementById("directionalLightZ").value)
    );
}

export{env,loCannons,upCannons,reside,track,rotatingItem}

