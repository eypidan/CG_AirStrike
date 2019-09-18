// Models Manager
//////////// - 模 型 管 理 器 - //////////////
//////////// - 模 型 管 理 器 - //////////////
//////////// - 模 型 管 理 器 - //////////////
/***
 * 模型管理器
 * 本管理器负责Parse OBJ文件/读取JSON文件（取决于是否提前将OBJ转化为JSON）
 * 本管理器还负责整理纹理，并提供创建纹理的函数
 * 本管理器输出的对象为模型Buffer的全体的对象（可以理解成一个指针吧）+ 纹理全体的对象，这个对象可以在CreateGenericObjects中绘制泛型模型的过程中，
 *      通过直接访问对象的字段名来访问模型的Buffer和Texture对象，并将其赋到模型的物体上。
 */

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// 读取模型 返回Buffers ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

/***
 * 模型集
 * 返回一个对象，通过属性名来访问 / 通过数组来访问
 * 整合convert_obj_to_json.js
 * @param gl
 * @returns {{ExampleModel: {VertexBuffer: (AudioBuffer|WebGLBuffer), TextureBuffer: (AudioBuffer|WebGLBuffer), NormalBuffer: (AudioBuffer|WebGLBuffer), NumVertices: number}}}
 */

// Define OBJ path
import {env,loCannons,upCannons,reside,track,rotatingItem} from "./MainFunction.js";
console.log(track)
// Define Texture path
import FLOOR_URL from  "./Textures/floor.jpg";
import loCannonsTex from './Textures/LowerCannons.jpg';
import upCannonsTex from './Textures/UpperCannons.jpg';
import resideTex from  './Textures/reside.jpg';
import trackTex from './Textures/Track.jpg';
import rotatingItemTex from './Textures/RotatingItem.jpg';

function getModelBufferCollection(gl)
{
    let envModel = getModelFromOBJ(env);
    let loCannonsModel = getModelFromOBJ(loCannons);
    let upCannonsModel = getModelFromOBJ(upCannons);
    let resideModel = getModelFromOBJ(reside);
    let trackModel = getModelFromOBJ(track);
    let rotatingItemModel = getModelFromOBJ(rotatingItem);

    let loCannonsBuffer = getModelBuffer(gl, loCannonsModel);
    let upCannonsBuffer = getModelBuffer(gl, upCannonsModel);
    let resideBuffer = getModelBuffer(gl, resideModel);
    let trackBuffer = getModelBuffer(gl, trackModel);
    let rotatingItemBuffer = getModelBuffer(gl, rotatingItemModel);

    // console.log(envModel)
    let env_buffer = getModelBuffer(gl, envModel);
    return {
        envModelbuffer:     env_buffer,
        loCannonsBuffer:    loCannonsBuffer,
        upCannonsBuffer:    upCannonsBuffer,
        resideBuffer:       resideBuffer,
        trackBuffer:        trackBuffer,
        rotatingItemBuffer: rotatingItemBuffer
    }

}

/***
 * 根据模型数组对象建立Buffer
 * @param gl
 * @param Model     Model对象是由`function getModelFromOBJ(path)`生成的
 * @returns {{VertexBuffer: AudioBuffer | WebGLBuffer, TextureBuffer: AudioBuffer | WebGLBuffer, NormalBuffer: AudioBuffer | WebGLBuffer, NumVertices: number}}
 * 返回的是Buffer对象
 */
function getModelBuffer(gl, Model)
{
    const VertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Model.vertexPos), gl.STATIC_DRAW);

    const TextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, TextureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Model.textureUV), gl.STATIC_DRAW);
    // console.log(Model.textureUV)
    const NormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, NormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Model.normalVec), gl.STATIC_DRAW);

    return {
        VertexBuffer:   VertexBuffer,
        TextureBuffer:  TextureBuffer,
        NormalBuffer:   NormalBuffer,
        NumVertices:    Model.numVertices
    }
}

// 此函数是生成数组并提取 而非生成buffer
function getModelFromOBJ(Model){
    // console.log(Model);
    return {
        vertexPos:   Model.vertex,
        textureUV:   Model.uv,
        normalVec:   Model.normal,
        numVertices: Model.vertex.length
    }
}

/////////////////////////////////////////////////////////////////////////////////////
//////////////////// 纹理管理器：读取纹理贴图 生成Texture对象 ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function GetTextureCollection(gl) {
    // 手动添加需要用到的纹理贴图
    let textureEnv = initTexture(gl, FLOOR_URL);
    let textureLoCannons = initTexture(gl, loCannonsTex);
    let textureUpCannons = initTexture(gl, upCannonsTex);
    let textureReside = initTexture(gl, resideTex);
    let textureTrack = initTexture(gl, trackTex);
    let textureRotatingItem = initTexture(gl, rotatingItemTex);

    return {
        envTextureBuffer:   textureEnv,
        LoCannons:          textureLoCannons,
        UpCannons:          textureUpCannons,
        Reside:             textureReside,
        Track:              textureTrack,
        RotatingItem:       textureRotatingItem
    }
}

// 初始化图片为texture对象
// 返会texture
function initTexture(gl, url){
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        width, height, border, srcFormat, srcType,
        pixel);

    const image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
            srcFormat, srcType, image);

        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // No, it's not a power of 2. Turn of mips and set
            // wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    };
    image.src = url;
    return texture;
}
function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}

export {getModelBufferCollection,GetTextureCollection};