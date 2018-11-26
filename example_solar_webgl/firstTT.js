var viewRoataion_Vertical = 4.0;
var viewRoataion_Horizon = 0.0;
var xPosition = 0.0;
var distance = -8.0;
var sphereRoate = 0.0;
var yPosition = 0;
var Cx,Cy,Cz;
// let flag=0;
function createcolors(colors){
  var generatedColors = [];
  for (j=0; j<15*15*6; j++) {
    var c = colors[j%6];
    for (var i=0; i<4; i++) {
      generatedColors = generatedColors.concat(c);
    }
  }
  return generatedColors;
}

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

  const planetbuffers1 = initplanetbuffers(
    gl,createcolors([
    [0,0.65,0.65,1.0],
    [0,0.8,0.3,1.0],    
    [0,0.65,0.65,1.0],
    [0,0.8,0.3,1.0],    
    [0,0.65,0.65,1.0],
    [0,0.8,0.3,1.0]    
  ]));
  const planetbuffers2 = initplanetbuffers(
    gl,createcolors([
    [0,0.95,0.65,1.0],
    [0,0.3,0.3,1.0],    
    [0,0.25,0.65,1.0],
    [0,0.2,0.1,1.0],    
    [0,0.25,0.65,1.0],
    [0,0.2,0.2,1.0]    
  ]));
  const planetbuffers3= initplanetbuffers(
    gl,createcolors([
    [1.0,0.95,0.65,1.0],
    [0,0.3,0.3,1.0],    
    [0,0.25,0.65,1.0],
    [1.0,0.2,0.1,1.0],    
    [0,0.25,0.25,1.0],
    [0,0.2,0.2,1.0]    
  ]));
  var then = 0;
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    drawScene(gl, programInfo, buffers, deltaTime);
    drawPlanet(gl,programInfo,planetbuffers1,[0.4,0.4,0.4],10,1);
    drawPlanet(gl,programInfo,planetbuffers2,[0.5,0.5,0.5],8,0);
    drawPlanetX(gl,programInfo,planetbuffers3,[0.2,0.2,0.2],8);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
function initplanetbuffers(gl,colors){
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  spherecount_1=(function(n,po,mp,no){
    var i,j,k,f=function(a,b){
      var a=Math.PI*a/n,b=2*Math.PI*b/n,l=Math.sin(a);
      return [Math.sin(b)*l,Math.cos(a),Math.cos(b)*l];
    };
    for(i=1;i<=n;i++)for(j=1;j<=n;j++){ 
      k=[].concat(f(i,j),f(i-1,j),f(i,j-1),f(i,j-1),f(i-1,j),f(i-1,j-1));//6 
      po.push.apply(po,k);
      no.push.apply(no,k);
      mp.push(
        j/n,n-i/n, j/n,n-(i-1)/n, (j-1)/n,n-i/n,
        (j-1)/n,n-i/n, j/n,n-(i-1)/n, (j-1)/n,n-(i-1)/n
      );
    };
    return n*n*6;
  })(15,sphere_position=[],mp_dat=[],no_dat=[]);
  // spherecount=spherecount_1;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere_position), gl.STATIC_DRAW);
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  spherecount_1=(function(n,po,mp,no){
    var i,j,k,f=function(a,b){
      var a=Math.PI*a/n,b=2*Math.PI*b/n,l=Math.sin(a);
      return [Math.sin(b)*l,Math.cos(a),Math.cos(b)*l];
    };
    for(i=1;i<=n;i++)for(j=1;j<=n;j++){ 
      k=[].concat(f(i,j),f(i-1,j),f(i,j-1),f(i,j-1),f(i-1,j),f(i-1,j-1));//6 
      po.push.apply(po,k);
      no.push.apply(no,k);
      mp.push(
        j/n,n-i/n, j/n,n-(i-1)/n, (j-1)/n,n-i/n,
        (j-1)/n,n-i/n, j/n,n-(i-1)/n, (j-1)/n,n-(i-1)/n
      );
    };
    return n*n*6;
  })(15,sphere_position=[],mp_dat=[],no_dat=[]);
  // spherecount=spherecount_1;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere_position), gl.STATIC_DRAW);
  const colors = [
    [1.0,  1.0,  0.0,  1.0],    
    [1.0,  0.0,  0.0,  1.0],   
    [1.0,  0.0,  0.0,  1.0],    
    [1.0,  0.0,  0.0,  1.0],    
    [1.0,  1.0,  0.0,  1.0],    
    [1.0,  0.0,  0.0,  1.0]    
  ];
  var generatedColors = [];
  for (j=0; j<15*15*6; j++) {
    var c = colors[j%6];
    for (var i=0; i<4; i++) {
      generatedColors = generatedColors.concat(c);
    }
  }
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

function drawPlanet(gl,programInfo,buffers,scales,radin,dealt){
  const fieldOfView = 100 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  dealt=dealt* Math.PI / 180;
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  const ViewMatrix = mat4.create();
  const ModelMatrix = mat4.create();
  let theat = (sphereRoate*60%360)* Math.PI / 180;
  // console.log(sphereRoate);
  let x,y,z;
  
  if(dealt===0){
    x = radin*Math.cos(theat);
    y = 0;
    z = radin*Math.sin(theat);
    Cx=x;
    Cy=y;
    Cz=z;
  }
  else{
    // fy=Math.atan(-1/Math.sqrt(2)/Math.sin(theat+1/2*Math.PI));
    // console.log(fy);
    // x = radin*Math.sin(fy)*Math.cos(theat);
    // y = radin*Math.sin(fy)*Math.sin(theat);
    // z = radin*Math.cos(fy);
    x = 0;
    z =radin*Math.cos(theat);
    y = radin*Math.sin(theat);
  }
  
  
  // console.log(y)
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
  mat4.scale(ModelMatrix,    
            ModelMatrix,    
            scales);  
  mat4.rotate(ModelMatrix,  
            ModelMatrix,  
            sphereRoate * .7,
            [0, 1, 0]);           
  mat4.translate(ModelMatrix,    
                ModelMatrix,    
                [x,y,z]);  
  {
    const numComponents = 3;
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
    vertexcount=15*15*6;
    const offset = 0;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexcount);
  }
  // sphereRoate += deltaTime;
}

function drawPlanetX(gl,programInfo,buffers,scales,radin){
  const fieldOfView = 100 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  // dealt=dealt* Math.PI / 180;
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  const ViewMatrix = mat4.create();
  const ModelMatrix = mat4.create();
  let theat = (sphereRoate*200%360)* Math.PI / 180;
  // console.log(sphereRoate);
  let x1,y1,z1;
  x1 = radin*Math.cos(theat);
  y1 = 0;
  z1 = radin*Math.sin(theat);
  // console.log(Cx,x1);

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
  mat4.scale(ModelMatrix,    
            ModelMatrix,    
            scales);  
  mat4.rotate(ModelMatrix,  
            ModelMatrix,  
            sphereRoate * .7,
            [0, 1, 0]);    
   
  mat4.translate(ModelMatrix,    
                ModelMatrix,    
                [Cx*2.5,Cy*2.5,Cz*2.5]);
  mat4.translate(ModelMatrix,    
                ModelMatrix,    
                [x1,y1,z1]);               
  {
    const numComponents = 3;
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
    vertexcount=15*15*6;
    const offset = 0;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexcount);
  }
  // sphereRoate += deltaTime;
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
    const numComponents = 3;
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
    vertexcount=15*15*6;
    const offset = 0;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexcount);
  }
  sphereRoate += deltaTime;
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

document.addEventListener('mousemove', (event) => {
    //check to make sure there is data to compare against
    if (typeof(last_position.x) !="undefined" ) {
      //get the change from last position to this position
      var deltaX = last_position.x - event.clientX,
          deltaY = last_position.y - event.clientY;
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
  last_position = {
    x : event.clientX,
    y : event.clientY
  };
}, false);