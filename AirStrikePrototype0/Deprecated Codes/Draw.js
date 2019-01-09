function Draw(gl, programInfo, Objects)
{
    // Setup the Projection Matrix
    const fieldOfView = 100 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 1;
    const zFar = 100.0;
    const ProjectionMatrix = mat4.create();
    mat4.perspective(ProjectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);

    // Setting up the view matrix
    const ViewMatrix = mat4.create();
    mat4.lookAt(ViewMatrix,
        vec3.fromValues(eyeX, eyeY, eyeZ),
        vec3.fromValues(lookAtX, lookAtY, lookAtZ),
        vec3.fromValues(upX, upY, upZ));

    // 这个因为我采用了递归 然而每次都会出一些问题
    let StackModelMatrix = [mat4.create()];

    // 开始画对象树
    DrawGenericObject(gl, programInfo, Objects, ProjectionMatrix, ViewMatrix, StackModelMatrix);
}

function DrawGenericObject(gl, programInfo, Objects, ProjectionMatrix, ViewMatrix, StackModelMatrix)
{
    // 将父元素的ModelMatrix乘到本级元素的ModelMatrix上
    let lastMatrix = StackModelMatrix.pop();
    let currentModelMatrix = Objects.ModelMatrix;
    console.log(Objects.MotionParameters.Speed + "SPEED, EyeZ = " + eyeZ + " " + currentModelMatrix.toString());
    let multipliedModelMatrices = mat4.create();
    multipliedModelMatrices = mat4.multiply(multipliedModelMatrices, lastMatrix, currentModelMatrix);
    StackModelMatrix.push(lastMatrix);
    StackModelMatrix.push(multipliedModelMatrices);

    // 点光源纹理贴图物体
    if (Objects.Texture == null) {
        // 自发光物
        if (Objects.Luminous) {
            // 直接绑定ProjectionMatrix 和 ViewMatrix
            gl.useProgram(programInfo.Illuminant.program);
            gl.uniformMatrix4fv(
                programInfo.Illuminant.uniformLocations.projectionMatrix,
                false,
                ProjectionMatrix);
            gl.uniformMatrix4fv(
                programInfo.Illuminant.uniformLocations.ViewMatrix,
                false,
                ViewMatrix);

            DrawBasic(gl, Objects.Buffers, programInfo.Illuminant,
                multipliedModelMatrices, Objects.LightPos, "Illuminant");
        }
        // 非自发光物 点光源物体
        else {
            // 直接绑定ProjectionMatrix 和 ViewMatrix
            gl.useProgram(programInfo.Objects.program);
            gl.uniformMatrix4fv(
                programInfo.Objects.uniformLocations.projectionMatrix,
                false,
                ProjectionMatrix);
            gl.uniformMatrix4fv(
                programInfo.Objects.uniformLocations.ViewMatrix,
                false,
                ViewMatrix);

            DrawBasic(gl, Objects.Buffers, programInfo.Objects,
                multipliedModelMatrices, Objects.LightPos, "Object");
        }
    }
    // 非纹理贴图物体
    else {
        // 直接绑定ProjectionMatrix 和 ViewMatrix
        gl.useProgram(programInfo.Texture.program);
        gl.uniformMatrix4fv(
            programInfo.Texture.uniformLocations.projectionMatrix,
            false,
            ProjectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.Texture.uniformLocations.ViewMatrix,
            false,
            ViewMatrix);

        DrawBasicTexture(gl, Objects.Buffers, programInfo.Texture,
            multipliedModelMatrices, Objects.LightPos, "Texture", Objects.Texture);
    }

    // 递归遍历下级子树
    const CountAdjObj = Objects.AdjObj.length;
    for (let i = 0; i < CountAdjObj; i++)
    {
        DrawGenericObject(gl, programInfo, Objects.AdjObj[i], ProjectionMatrix, ViewMatrix, StackModelMatrix);
    }
    StackModelMatrix.pop();
}

/*** 绘制非纹理物体（点光源）
 *
 * @param gl
 * @param buffers       含有位置坐标、颜色等信息
 * @param proInfo       proInfo可能的值为`programInfo.Objects`或`programInfo.Illuminant`
 * @param ModelMatrix
 * @param LightPos
 * @param mode
 * @constructor
 */
function DrawBasic(gl, buffers, proInfo, ModelMatrix, LightPos, mode)
{
    let numComponents = 3;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.VertexBuffer);
    gl.vertexAttribPointer(
        proInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        proInfo.attribLocations.vertexPosition);

    // Only the normal vectors of the non-illuminant object matter.
    if (mode == "Object" || mode == "Texture") {
        numComponents = 3;
        type = gl.FLOAT;
        normalize = false;
        stride = 0;
        offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.NormalBuffer);
        gl.vertexAttribPointer(
            proInfo.attribLocations.normalPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            proInfo.attribLocations.normalPosition);
    }

    // numComponents = 4;
    // type = gl.FLOAT;
    // normalize = false;
    // stride = 0;
    // offset = 0;
    // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.Color);
    // gl.vertexAttribPointer(
    //     proInfo.attribLocations.vertexColor,
    //     numComponents,
    //     type,
    //     normalize,
    //     stride,
    //     offset);
    // gl.enableVertexAttribArray(
    //     proInfo.attribLocations.vertexColor);


    gl.useProgram(proInfo.program);
    gl.uniformMatrix4fv(
        proInfo.uniformLocations.ModelMatrix,
        false,
        ModelMatrix);
    gl.uniform3f(
        proInfo.uniformLocations.lightPosition,
        LightPos[0], LightPos[1], LightPos[2]);

    gl.drawArrays(gl.TRIANGLES, 0, buffers.numVertices);
}

/*** 绘制纹理物体（点光源）
 *
 * @param gl
 * @param buffers       含有位置坐标、颜色等信息
 * @param proInfo       proInfo可能的值为`programInfo.Texture`
 * @param ModelMatrix
 * @param LightPos
 * @param mode
 * @constructor
 */
function DrawBasicTexture(gl, buffers, proInfo, ModelMatrix, LightPos, mode, Texture)
{
    let numComponents = 3;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.VertexBuffer);
    gl.vertexAttribPointer(
        proInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        proInfo.attribLocations.vertexPosition);

    // Only the normal vectors of the non-illuminant object matter.
    if (mode == "Object" || mode == "Texture") {
        numComponents = 3;
        type = gl.FLOAT;
        normalize = false;
        stride = 0;
        offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.NormalBuffer);
        gl.vertexAttribPointer(
            proInfo.attribLocations.normalPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            proInfo.attribLocations.normalPosition);
    }

    numComponents = 2;
    type = gl.FLOAT;
    normalize = false;
    stride = 0;
    offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.TextureBuffer);
    gl.vertexAttribPointer(
        proInfo.attribLocations.textureCoordPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        proInfo.attribLocations.textureCoordPosition);
    gl.uniform1i(proInfo.Sampler, 0);

    gl.uniformMatrix4fv(
        proInfo.uniformLocations.ModelMatrix,
        false,
        ModelMatrix);
    gl.uniform3f(
        proInfo.uniformLocations.lightPosition,
        LightPos[0], LightPos[1], LightPos[2]);

    gl.bindTexture(gl.TEXTURE_2D, Texture);
    gl.drawArrays(gl.TRIANGLES, 0, buffers.numVertices);
}

// 转换JavaScript类型数组到普通数组
// 如果有更好的implementation的话就换一下
function convertTypedArray(TypedArray){
    let arr = [];
    TypedArray.forEach(function(element, index, array){
        arr.push(element);
    })
    return arr;     // JavaScript Normal Array
}