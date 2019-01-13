/***
 * 这是一个泛型物体类
 * 通过下面这个类，我们可以构建模型树
 * 一个物体需要包含以下属性
 * * Buffers:       包含VertexBuffer, TextureBuffer, NormalVectorBuffer以及numVertices的对象
 * * ModelMatrix:   自身的Model Matrix（相对于上一级物体的ModelMatrix）
 * * LightPos:      点光源的位置（改造成全局光源的话还有待修改）
 * * AdjObj:        一个包含了该物体所相连或相关的子物体的数组（例如四肢至于机器人主体）
 * * Luminous:      是否自发光，boolean类型
 * * Texture:       对于具有纹理的物体，保存纹理对象。如果没有则该字段为`null`
 */
import {mat4} from './gl-matrix.js';
import {vec3} from './gl-matrix.js';

class GenericObject{
    constructor (Buffer, AdjObj, TextureBuffer)
    {
        this.Buffer = Buffer;
        this.MotionParameters = new MotionParameters();
        this.ModelMatrix = mat4.create();
        this.AdjObj = AdjObj;       // Adjacent Objects (Array)
        this.Texture = TextureBuffer;
    }
}

class MotionParameters {
    constructor()
    {
        this.xP = 0; this.yP = 0; this.zP = 0;
        this.Speed = 0;
        this.Size = [1, 1, 1];
        this.Pivot = [0, 0, 0];         // 旋转轴
        this.MaxSpeed = 1;
    }
}

// Project Specific Object Creation.
// Objects should be created from branch to stem
function ObjectTrees(buffersCollection, texturesCollection){
    // 在这里可以建设多个太阳系
    // 每个太阳系有独特的建系方程

    // let ObjectsSystems = CreateObjectsSystem(buffersCollection, texturesCollection);                // 太阳系1（机器人1）
    let EnvSystem = new GenericObject (buffersCollection.envModelbuffer,[],texturesCollection.envTextureBuffer); // 场景
    mat4.scale(EnvSystem.ModelMatrix, EnvSystem.ModelMatrix, vec3.fromValues(3,3,3));

    // Robot Main
    let rotatingPart = new GenericObject(buffersCollection.rotatingItemBuffer, [], texturesCollection.RotatingItem);
    let upCannons = new GenericObject(buffersCollection.upCannonsBuffer, [], texturesCollection.UpCannons);
    let loCannons = new GenericObject(buffersCollection.loCannonsBuffer, [], texturesCollection.LoCannons);
    let reside =    new GenericObject(buffersCollection.resideBuffer, [rotatingPart], texturesCollection.Reside);
    let Robot = new GenericObject(buffersCollection.trackBuffer, [reside, upCannons, loCannons], texturesCollection.Track);
    // console.log(EnvSystem)

    return {
        // ObjectsSystems:ObjectsSystems,
        EnvSystem:  EnvSystem,
        Robot:      Robot,
    };
}

export {ObjectTrees};