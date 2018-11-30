var viewRoataion_Vertical = 4.0;
var viewRoataion_Horizon = 0.0;
var xPosition = 0.0;
var distance = -8.0;
var sphereRoate = 0.0;
var yPosition = 0;


function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main(void) {
      gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix* aVertexPosition;
      vColor = aVertexColor;
    }
  `;
  const fsSource = `
    varying lowp vec4 vColor;
    void main(void) {
      gl_FragColor = vColor;
    }
  `;
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      ViewMatrix: gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
      ModelMatrix: gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
    },
  };

  const buffers = initBuffers(gl);

  var then = 0;
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    drawScene(gl, programInfo, buffers, deltaTime);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  tran_p=[-2.5,0.0,
           2.5, 0.0,
           0.0,  3.5 ]
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tran_p), gl.STATIC_DRAW);


  const colors = [
    1.0,  1.0,  0.0,  1.0,    
    1.0,  0.0,  0.0,  1.0,   
    1.0,  1.0,  0.0,  1.0,
  ];
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}


function drawScene(gl, programInfo, buffers, deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  
  gl.clearDepth(1.0);             
  gl.enable(gl.DEPTH_TEST);          
  gl.depthFunc(gl.LEQUAL);          
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const fieldOfView = 100 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  const ViewMatrix = mat4.create();
  const ModelMatrix = mat4.create();
  
  mat4.translate(ViewMatrix,    
                 ViewMatrix,    
                 [xPosition, yPosition, distance]);  
  mat4.rotate(ViewMatrix,  
              ViewMatrix,  
              viewRoataion_Horizon * .7,
              [0, 1, 0]);  
  mat4.rotate(ViewMatrix,  
              ViewMatrix,  
              viewRoataion_Vertical * .1,
              [1, 0, 0]);      
  mat4.rotate(ModelMatrix,  
              ModelMatrix,  
              sphereRoate * .7,
              [0, 1, 0]);  

  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
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
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.ViewMatrix,
      false,
      ViewMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.ModelMatrix,
      false,
      ModelMatrix);
  {
    const vertexcount=3;
    const offset = 0;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexcount);
  }
  // sphereRoate += deltaTime;
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

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
}

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

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if (keyName === 'd') {    
    xPosition-=+0.1;
    return;
  }
  if (keyName === 'a') {
    xPosition += 0.1;
    return;
  }
  if (keyName === 'w') {
    yPosition-=0.1;
    return;
  }
  if (keyName === 's') {
    yPosition+=0.1;
    return;
  }
}, false);

let last_position={};
let click_down = 0;
document.addEventListener('mousedown',(event)=>{
  click_down = 1;
},false)

document.addEventListener('mouseup',(event)=>{
  click_down = 0;
},false)

document.addEventListener('mousemove', (event) => {
    //check to make sure there is data to compare against
    if (typeof(last_position.x) !="undefined" ) {
      //get the change from last position to this position
      var deltaX = last_position.x - event.clientX,
          deltaY = last_position.y - event.clientY;
      if(click_down === 1){
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
          viewRoataion_Horizon-=+0.07;
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
          viewRoataion_Horizon += 0.07;
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
          viewRoataion_Vertical+=0.7;
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
          viewRoataion_Vertical-=0.7;
        }
      }

  }
  last_position = {
    x : event.clientX,
    y : event.clientY
  };
}, false);