import {mat4,vec3} from './gl-matrix.js';
import {getCameraInfo, Target} from './operations.js';

function Draw(gl, programInfo, Objects)
{
    // Initialize Projection and View Matrix
    const fieldOfView = 100 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.0001;   // 可能得设为这个值不然效果太诡异了
    const zFar = 120.0;
    const ProjectionMatrix = mat4.create();
    mat4.perspective(ProjectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);

    let cameraInfo = getCameraInfo();
    // vec3.add(final_lookAt,cameraInfo.eye,cameraInfo.lookAt);
    const ViewMatrix = mat4.create();
    mat4.lookAt(ViewMatrix,
        cameraInfo.eye,
        cameraInfo.lookAt,
        // final_lookAt,
        cameraInfo.cameraUP);
    // console.log(lookAt);
    let StackModelMatrix = [mat4.create()];
    DrawGenericObject(gl, programInfo, Objects.Robot, ProjectionMatrix, ViewMatrix, StackModelMatrix);
    DrawGenericObject(gl, programInfo, Objects.Robot2, ProjectionMatrix, ViewMatrix, StackModelMatrix);
    DrawGenericObject(gl, programInfo, Objects.Robot3, ProjectionMatrix, ViewMatrix, StackModelMatrix);
    DrawGenericObject(gl, programInfo, Objects.EnvSystem, ProjectionMatrix, ViewMatrix, StackModelMatrix);

    // DrawEnv(gl, programInfo, Objects.Robot, ProjectionMatrix, ViewMatrix);
    // DrawEnv(gl, programInfo, Objects.EnvSystem, ProjectionMatrix, ViewMatrix);
}

function DrawGenericObject(gl, programInfo, Objects, ProjectionMatrix, ViewMatrix, StackModelMatrix)
{
    let lastMatrix = StackModelMatrix.pop();
    let currentModelMatrix = Objects.ModelMatrix;
    let multipliedModelMatrices = mat4.create();
    multipliedModelMatrices = mat4.multiply(multipliedModelMatrices, lastMatrix, currentModelMatrix);
    StackModelMatrix.push(lastMatrix);
    StackModelMatrix.push(multipliedModelMatrices);

    DrawBasic(Objects.Buffer, multipliedModelMatrices, Objects.Texture);

    const CountAdjObj = Objects.AdjObj.length;
    for (let i = 0; i < CountAdjObj; i++)
    {
        DrawGenericObject(gl, programInfo, Objects.AdjObj[i], ProjectionMatrix, ViewMatrix, StackModelMatrix);
    }
    StackModelMatrix.pop();

    return;

    function DrawBasic(buffer, ModelMatrix, Texture)
    {
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.VertexBuffer);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.NormalBuffer);
            gl.vertexAttribPointer(
                programInfo.attribLocations.normalPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.normalPosition);
        }

        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.TextureBuffer);
            gl.vertexAttribPointer(
                programInfo.attribLocations.textureCoordPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.textureCoordPosition);
        }

        gl.useProgram(programInfo.program);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            ProjectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.ViewMatrix,
            false,
            ViewMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.ModelMatrix,
            false,
            ModelMatrix);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,Texture);

        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        {
            const vertexcount = buffer.NumVertices/3;
            const offset = 0;
            gl.drawArrays(gl.TRIANGLES, offset, vertexcount);
        }
    }

}

export {Draw};