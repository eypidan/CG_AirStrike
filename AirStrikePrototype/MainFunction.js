// the main function

import {mat4} from './gl-matrix.js';
import {lookAtX,lookAtY,lookAtZ} from './operations.js';
import fs from 'fs'
import {getModelBufferCollection} from './ModelsManager.js';
setTimeout(()=>{
    console.log("the CG_big is start!");
    main();

}, 100);

const vsSource = fs.readFileSync('./vsSource.glsl', 'utf8');
const fsSource = fs.readFileSync('./fsSource.glsl', 'utf8');


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
    const shaderProgram_Tex = initShaderProgram(gl, vsSource, fsSource);
    /* Program Info is a structure where the information of the shader program
     * as well as locations of its attributes and uniforms */
    // ProgramInfo for objects that emits light (no reflection)

    let ProgramInfo = GenerateProgramInfo(gl, shaderProgram_Tex);
    let ModelBufferCollection = getModelBufferCollection(gl);       ///////// Return to be specified
    // let TextureCollection = GetTextureCollection(gl);
    // let Objects = ObjectTrees(ModelBufferCollection, TextureCollection);

    let then = 0;
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;
        // console.log(lookAtX);
        // doMotion(Objects, deltaTime);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Draw(gl, ProgramInfo, Objects);

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
    const programInfo_Textures = {
        program: webGLPrograms,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(webGLPrograms, 'aVertexPosition'),
            normalPosition: gl.getAttribLocation(webGLPrograms, 'aNormal'),
            textureCoordPosition: gl.getAttribLocation(webGLPrograms, 'aTextureCoord')
        },
        uniformLocations: {
            lightPosition: gl.getUniformLocation(webGLPrograms,'u_lightWorldPosition'), // Light Position
            projectionMatrix: gl.getUniformLocation(webGLPrograms, 'uProjectionMatrix'),
            ViewMatrix: gl.getUniformLocation(webGLPrograms, 'uViewMatrix'),
            ModelMatrix: gl.getUniformLocation(webGLPrograms, 'uModelMatrix'),
            Sampler: gl.getUniformLocation(webGLPrograms, 'uSampler')
        },
    };

    return programInfo_Textures;
}
