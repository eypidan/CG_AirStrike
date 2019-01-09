function Draw(gl, programInfo, Objects)
{
    // Initialize Projection and View Matrix
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

    const ViewMatrix = mat4.create();
    mat4.lookAt(ViewMatrix,
        vec3.fromValues(eyeX, eyeY, eyeZ),
        vec3.fromValues(lookAtX, lookAtY, lookAtZ),
        vec3.fromValues(upX, upY, upZ));

    let StackModelMatrix = [mat4.create()];
    DrawGenericObject(gl, programInfo, Objects, ProjectionMatrix, ViewMatrix, StackModelMatrix);
}

function DrawGenericObject(gl, programInfo, Objects, ProjectionMatrix, ViewMatrix, StackModelMatrix)
{
    let lastMatrix = StackModelMatrix.pop();
    let currentModelMatrix = Objects.ModelMatrix;
    let multipliedModelMatrices = mat4.create();
    multipliedModelMatrices = mat4.multiply(multipliedModelMatrices, lastMatrix, currentModelMatrix);
    StackModelMatrix.push(lastMatrix);
    StackModelMatrix.push(multipliedModelMatrices);

    if (Objects.Texture != null)
    {
        DrawBasicTexture(gl, Objects.Buffers, programInfo.Texture,
            ProjectionMatrix, ViewMatrix, multipliedModelMatrices, Objects.LightPos, "Texture", Objects.Texture);
    }
    else {
        if (Objects.Luminous)
            DrawBasic(gl, Objects.Buffers, programInfo.Illuminant,
                ProjectionMatrix, ViewMatrix, multipliedModelMatrices, Objects.LightPos, "Illuminant");
        else
            DrawBasic(gl, Objects.Buffers, programInfo.Objects,
                ProjectionMatrix, ViewMatrix, multipliedModelMatrices, Objects.LightPos, "Object");
    }

    const CountAdjObj = Objects.AdjObj.length;
    for (let i = 0; i < CountAdjObj; i++)
    {
        DrawGenericObject(gl, programInfo, Objects.AdjObj[i], ProjectionMatrix, ViewMatrix, StackModelMatrix);
    }
    StackModelMatrix.pop();
}

function DrawBasic(gl, buffers, proInfo, ProjectionMatrix, ViewMatrix, ModelMatrix, LightPos, mode)
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

    numComponents = 4;
    type = gl.FLOAT;
    normalize = false;
    stride = 0;
    offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        proInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        proInfo.attribLocations.vertexColor);

    gl.useProgram(proInfo.program);
    gl.uniformMatrix4fv(
        proInfo.uniformLocations.projectionMatrix,
        false,
        ProjectionMatrix);
    gl.uniformMatrix4fv(
        proInfo.uniformLocations.ViewMatrix,
        false,
        ViewMatrix);
    gl.uniformMatrix4fv(
        proInfo.uniformLocations.ModelMatrix,
        false,
        ModelMatrix);
    gl.uniform3f(
        proInfo.uniformLocations.lightPosition,
        LightPos[0], LightPos[1], LightPos[2]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffers.numVertices);
}

function DrawBasicTexture(gl, buffers, proInfo, ProjectionMatrix, ViewMatrix, ModelMatrix, LightPos, mode, Texture)
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


    gl.useProgram(proInfo.program);
    gl.uniformMatrix4fv(
        proInfo.uniformLocations.projectionMatrix,
        false,
        ProjectionMatrix);
    gl.uniformMatrix4fv(
        proInfo.uniformLocations.ViewMatrix,
        false,
        ViewMatrix);
    gl.uniformMatrix4fv(
        proInfo.uniformLocations.ModelMatrix,
        false,
        ModelMatrix);
    gl.uniform3f(
        proInfo.uniformLocations.lightPosition,
        LightPos[0], LightPos[1], LightPos[2]);

    gl.bindTexture(gl.TEXTURE_2D, Texture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffers.numVertices);
}