import fs from 'fs'
import {mat4,vec3} from './gl-matrix.js';
import {lookAt,eye,cameraUP} from './operations.js';
let final_lookAt = vec3.create();

import skyposx1 from './Textures/skyposx1.png'
import skynegx1 from './Textures/skynegx1.png'
import skyposy1 from './Textures/skyposy1.png'
import skynegy1 from './Textures/skynegy1.png'
import skyposz1 from './Textures/skyposz1.png'
import skynegz1 from './Textures/skynegz1.png'

var skyBoxElements = [
    skyposx1,
    skynegx1,
    skyposy1,
    skynegy1,
    skyposz1,
    skynegz1
    ];
const viewMatrix = mat4.create();

function loadTextureCube(gl, skybox, skyboxProgram, uProjection) {
    var imgCount = 0;
    var img = new Array(6);
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;

    for (var i = 0; i < 6; i++) {
        img[i] = new Image();
        img[i].onload = function() {
            imgCount++;
            if (imgCount == 6) {
                var cubeTexure = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexure);

                var targets = [
                    gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
                    gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
                    gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z 
                        ];

                for (var j = 0; j < 6; j++) {
                    gl.texImage2D(targets[j], level, internalFormat, srcFormat, srcType, img[j]);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                }
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                drawSkyBox(gl, skybox, skyboxProgram, uProjection);
            }
        }
        img[i].src = skyBoxElements[i];
    }
}

function initCube(gl, cube, aCoords, uviewMatrix) {
    var skybox = {};
    skybox.coordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, skybox.coordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cube.vertexPositions, gl.STATIC_DRAW);

    skybox.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, skybox.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cube.indices, gl.STATIC_DRAW);
    
    skybox.count = cube.indices.length;

    skybox.render = function() { 
        gl.bindBuffer(gl.ARRAY_BUFFER, this.coordsBuffer);
        gl.vertexAttribPointer(aCoords, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(uviewMatrix, false, viewMatrix );
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);
    }
    return skybox;
}

function drawSkyBox(gl, skybox, skyboxProgram, uProjection) {
    gl.useProgram(skyboxProgram);
    gl.clearColor(1,1,1,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 100 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.001;   // 可能得设为这个值不然效果太诡异了
    const zFar = 300; 	   // 这个值要稍大否则会有白边
    const ProjectionMatrix = mat4.create();
    mat4.perspective(ProjectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);
    gl.uniformMatrix4fv(uProjection, false, ProjectionMatrix );

    vec3.add(final_lookAt,eye,lookAt);
    mat4.lookAt(viewMatrix,
        eye,
        final_lookAt,
        cameraUP);

    skybox.render();  
}

 /**
  * Cube object from a lib
  * Create a model of a cube, centered at the origin.  (This is not
  * a particularly good format for a cube, since an IFS representation
  * has a lot of redundancy.)
  * @side the length of a side of the cube.  If not given, the value will be 1.
  */
function createCube(side) {
    var s = (side || 1)/2;
    var coords = [];
    var normals = [];
    var texCoords = [];
    var indices = [];
    function face(xyz, nrm) {
        var start = coords.length/3;
        var i;
        for (i = 0; i < 12; i++) {
            coords.push(xyz[i]);
        }
        for (i = 0; i < 4; i++) {
            normals.push(nrm[0],nrm[1],nrm[2]);
        }
        texCoords.push(0,0,1,0,1,1,0,1);
        indices.push(start,start+1,start+2,start,start+2,start+3);
    }
    face( [-s,-s,s, s,-s,s, s,s,s, -s,s,s], [0,0,1] );
    face( [-s,-s,-s, -s,s,-s, s,s,-s, s,-s,-s], [0,0,-1] );
    face( [-s,s,-s, -s,s,s, s,s,s, s,s,-s], [0,1,0] );
    face( [-s,-s,-s, s,-s,-s, s,-s,s, -s,-s,s], [0,-1,0] );
    face( [s,-s,-s, s,s,-s, s,s,s, s,-s,s], [1,0,0] );
    face( [-s,-s,-s, -s,-s,s, -s,s,s, -s,s,-s], [-1,0,0] );
    return {
        vertexPositions: new Float32Array(coords),
        vertexNormals: new Float32Array(normals),
        vertexTextureCoords: new Float32Array(texCoords),
        indices: new Uint16Array(indices)
    }
}
export {loadTextureCube,createCube,initCube,drawSkyBox};