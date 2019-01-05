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
function getModelBufferCollection(gl)
{
    let ExampleModel = getModelFromOBJ("./ModelObjects/Example.obj");
    // let CarModel = getModelFromOBJ("./ModelObjects/CarModel.obj");
    // let Whatever = getModelFromOBJ("./ModelObjects/whatever.obj");
    let x1 = getModelBuffer(gl, ExampleModel);
    return{
        ExampleModel: x1
        // , Whatever: getModelBuffer(gl, Whatever)
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
function getModelFromOBJ(path)
{
    // let fs = require('fs');
    // const vertex = fs.readFileSync(path, 'utf8');
    // 我有一个不需要另外npm一个组件的方法 直接用AJAX 因为我不太会（笑哭）如果解决了的话那也可以不要
    function readTextFile(file)
    {
        let string = "";
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    string = rawFile.responseText;
                }
            }
        };
        rawFile.send(null);
        return string;
    }
    let vertex = readTextFile(path);

    const Model = new gl_obj();
    handleobj(vertex, Model);   // Parse的驱动程序见后侧

    return {
        vertexPos:   Model.vertex,
        textureUV:   Model.uv,
        normalVec:   Model.normal,
        numVertices: Model.numVertices
    }
}

/////////////////////////////////////////////////////////////////////////////////////
//////////////////// 纹理管理器：读取纹理贴图 生成Texture对象 ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function GetTextureCollection(gl) {
    // 手动添加需要用到的纹理贴图
    let textureEarth = initTexture(gl, "./Textures/Earth.jpg");
    let textureSkyBox = initTexture(gl, "./Textures/SkyBox.jpg");

    return {
        Earth: textureEarth,
        SkyBox: textureSkyBox
    }
}

// 初始化图片为texture对象
// 返会texture
function initTexture(gl, src){
    let texture = gl.createTexture();
    texture.image = new Image();
    texture.image.onload = function () {
        handleLoadedTexture(texture);
    };

    texture.image.src = src;
    return texture;

    function handleLoadedTexture(texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        gl.activeTexture(gl.TEXTURE0);
    }
}




/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// OBJ Parser 驱动程序 //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

var regex = { // 这里正则只去匹配了我们obj文件中用到数据
    vertex_pattern: /v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/g, // 顶点
    normal_pattern: /vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/g, // 法线
    uv_pattern: /vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/g, // 纹理坐标
    face_vertex_uv_normal: /f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/g, // 面信息
};

function gl_obj() {};  //这是个类，类的规则写好了，之后 new一个新的就可用了
gl_obj.prototype.vertexArr=[]
gl_obj.prototype.normalArr=[]
gl_obj.prototype.uvArr=[]

gl_obj.prototype.normal=[]
gl_obj.prototype.vertex=[]
gl_obj.prototype.uv=[]

gl_obj.prototype.addFace=function(data){
    this.addIndex(+data[1], +data[4], +data[7], +data[10]);
    this.addUv(+data[2], +data[5], +data[8], +data[11]);
    this.addNormal(+data[3], +data[6], +data[9], +data[12]);

}

// Minor Update: 添加一个计数器，为了使得我们能够计算出有多少个Vertex，然后将其传入drawArray中
gl_obj.prototype.numVertices = 0;

gl_obj.prototype.addIndex = function(a, b, c, d) {
    if(!d) {
        this.vertex.push(  //有些f里，就是一个面有三个点
            this.vertexArr[3*a], this.vertexArr[3*a+1], this.vertexArr[3*a+2],
            this.vertexArr[3*b], this.vertexArr[3*b+1], this.vertexArr[3*b+2],
            this.vertexArr[3*c], this.vertexArr[3*c+1], this.vertexArr[3*c+2]
        );
        this.numVertices += 3;
    }
    else {//有些有两个
        this.vertex.push(
            this.vertexArr[3*a], this.vertexArr[3*a+1], this.vertexArr[3*a+2],
            this.vertexArr[3*b], this.vertexArr[3*b+1], this.vertexArr[3*b+2],
            this.vertexArr[3*c], this.vertexArr[3*c+1], this.vertexArr[3*c+2],
            this.vertexArr[3*a], this.vertexArr[3*a+1], this.vertexArr[3*a+2],
            this.vertexArr[3*c], this.vertexArr[3*c+1], this.vertexArr[3*c+2],
            this.vertexArr[3*d], this.vertexArr[3*d+1], this.vertexArr[3*d+2],
        );
        this.numVertices += 6;
    }
};

gl_obj.prototype.addNormal = function(a, b, c, d) {
    if(!d) {
        this.normal.push(
            this.normalArr[3*a], this.normalArr[3*a+1], this.normalArr[3*a+2],
            this.normalArr[3*b], this.normalArr[3*b+1], this.normalArr[3*b+2],
            this.normalArr[3*c], this.normalArr[3*c+1], this.normalArr[3*c+2]
        );
    } else {
        this.normal.push(
            this.normalArr[3*a], this.normalArr[3*a+1], this.normalArr[3*a+2],
            this.normalArr[3*b], this.normalArr[3*b+1], this.normalArr[3*b+2],
            this.normalArr[3*c], this.normalArr[3*c+1], this.normalArr[3*c+2],
            this.normalArr[3*a], this.normalArr[3*a+1], this.normalArr[3*a+2],
            this.normalArr[3*c], this.normalArr[3*c+1], this.normalArr[3*c+2],
            this.normalArr[3*d], this.normalArr[3*d+1], this.normalArr[3*d+2],
        );
    }
};
gl_obj.prototype.addUv = function(a, b, c, d) {
    if(!d) {
        this.uv.push(this.uvArr[2*a], this.uvArr[2*a+1] );
        this.uv.push(this.uvArr[2*b], this.uvArr[2*b+1] );
        this.uv.push(this.uvArr[2*c], this.uvArr[2*c+1] );
    } else {
        this.uv.push(this.uvArr[2*a], this.uvArr[2*a+1] );
        this.uv.push(this.uvArr[2*b], this.uvArr[2*b+1] );
        this.uv.push(this.uvArr[2*c], this.uvArr[2*c+1] );
        this.uv.push(this.uvArr[2*a], this.uvArr[2*a+1] );
        this.uv.push(this.uvArr[2*c], this.uvArr[2*c+1] );
        this.uv.push(this.uvArr[2*d], this.uvArr[2*d+1] );
    }
};

function handleobj(str, obj) {
    var result;
    obj.vertexArr.push(0,0,0);//regex.vertex_pattern.exec(str)这种就是正则匹配，你们可以在debug下跟跟，看是怎么工作的
    obj.uvArr.push(0,0);
    obj.normalArr.push(0,0,0); //这里非常tricky，f中的点是从1开始算的，而数组 【0】是起点，我塞入一个新点，之后的就一样了，这里不塞0，0，0，塞入x,x,x都行
    while((result = regex.vertex_pattern.exec(str)) !== null) {
        obj.vertexArr.push(+result[1], +result[2], +result[3]); // 加入到3D对象顶点数组
    }
    while((result = regex.normal_pattern.exec(str)) !== null) { //加入每个顶点的发向量
        obj.normalArr.push(+result[1], +result[2], +result[3]);
    }
    while((result = regex.uv_pattern.exec(str)) !== null) {//加入纹理信息
        obj.uvArr.push(+result[1], +result[2]);
    }
    while((result = regex.face_vertex_uv_normal.exec(str)) !== null) {
        obj.addFace(result);  // ！！！！！！！！！！以上数据均无顺序，我在这个addface中，
                              //利用 f x/x/x x/x/x x/x/x x/x/x 把每一个顶点按塞到新的vertex，normal，uv中，这些信息可以直接用，不用index什么的再排序
    }
}

export {getModelBufferCollection};