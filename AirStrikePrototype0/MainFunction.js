/****************************************
 * Initialize Vertex and Fragment Buffer
 ****************************************/
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

    // ModelBufferCollection
    /*******************************
     * Compile Shader Programs
     *******************************/
    const shaderProgram_Ill = initShaderProgram(gl, vsSource, fsSource_Illuminant);
    const shaderProgram_Obj = initShaderProgram(gl, vsSource, fsSource);
    const shaderProgram_Tex = initShaderProgram(gl, vsSource_Texture, fsSource_texture);
    /* Program Info is a structure where the information of the shader program
     * as well as locations of its attributes and uniforms */
    // ProgramInfo for objects that emits light (no reflection)

    let ProgramInfo = GenerateProgramInfo(gl, [shaderProgram_Ill, shaderProgram_Obj, shaderProgram_Tex]);
    let ModelBufferCollection = getModelBufferCollection(gl);       ///////// Return to be specified
    let TextureCollection = GetTextureCollection(gl);
    let Objects = ObjectTrees(ModelBufferCollection, TextureCollection);

    let then = 0;
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;

        // doMotion(Objects, deltaTime);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        Draw(gl, ProgramInfo, Objects);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}


const vsSource = `
		attribute vec4 aVertexPosition;
		attribute vec4 aVertexColor;
		attribute vec3 aNormal;

		uniform mat4 uViewMatrix;
		uniform mat4 uModelMatrix;
		uniform mat4 uProjectionMatrix;
		uniform vec3 u_lightWorldPosition;
		
		varying lowp vec4 vColor;
		varying mediump vec3 Normal;

		varying mediump vec3 FragPos2;
		varying lowp vec3 u_light;
		void main(void) {
			gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix* aVertexPosition;
			vColor = aVertexColor;
			vec4 modelPos = uModelMatrix * aVertexPosition;
			FragPos2 = modelPos.xyz / modelPos.w;
			Normal = vec3(uModelMatrix*vec4(aNormal,0.0));
			u_light=u_lightWorldPosition;
		}
	`;

const vsSource_Texture = `
		attribute vec4 aVertexPosition;
		attribute vec3 aNormal;

		uniform mat4 uViewMatrix;
		uniform mat4 uModelMatrix;
		uniform mat4 uProjectionMatrix;
		uniform vec3 u_lightWorldPosition;
		
		varying mediump vec3 Normal;
		
        attribute vec2 aTextureCoord;
        varying vec2 vTextureCoord;

		varying mediump vec3 FragPos2;
		varying lowp vec3 u_light;
		void main(void) {
			gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix* aVertexPosition;
			vec4 modelPos = uModelMatrix * aVertexPosition;
			FragPos2 = modelPos.xyz / modelPos.w;
			Normal = vec3(uModelMatrix*vec4(aNormal,0.0));
			u_light=u_lightWorldPosition;
			vTextureCoord = aTextureCoord;
		}
	`;

const fsSource = `
		precision mediump float;
		varying mediump  vec3 Normal;
		varying lowp vec4 vColor;

		varying mediump  vec3 FragPos2;
		varying mediump vec3 u_light;
		
		vec4 ambient = vec4(0.1,0.1,0.1,1.0);
		vec4 lightColor = vec4(1.0,1.0,1.0,0.0);
		vec4 diffuse;
		void main(void) {
			vec3 norm = normalize(Normal);
			vec3 lightDir = normalize(u_light - FragPos2);
			float diff = max(dot(norm, lightDir), 0.0);
			diffuse = lightColor * diff;
			gl_FragColor = (ambient + diffuse) * vColor;
		}
	`;
const fsSource_Illuminant = `
		varying lowp vec4 vColor;
		void main(void) {
			gl_FragColor = vColor;
		}
	`;
const fsSource_texture = `
    precision mediump float;
    varying mediump vec3 Normal;
    varying lowp vec2 vTextureCoord;
    uniform sampler2D uSampler;

    varying mediump vec3 FragPos2;
    varying mediump vec3 u_light;
    
    vec4 ambient = vec4(0.1,0.1,0.1,1.0);
    vec4 lightColor = vec4(1.0,1.0,1.0,0.0);
    vec4 diffuse;
    void main(void) {
        vec3 norm = normalize(Normal);
        vec3 lightDir = normalize(u_light - FragPos2);
        float diff = max(dot(norm, lightDir), 0.0);
        diffuse = lightColor * diff;
        gl_FragColor = (ambient + diffuse) * texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    }
`;

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
    const programInfo_Illuminant = {
        program: webGLPrograms[0],
        attribLocations: {
            vertexPosition: gl.getAttribLocation(webGLPrograms[0], 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(webGLPrograms[0], 'aVertexColor'),
        },
        uniformLocations: {
            lightPosition: gl.getUniformLocation(webGLPrograms[0],'u_lightWorldPosition'), // Light Position
            projectionMatrix: gl.getUniformLocation(webGLPrograms[0], 'uProjectionMatrix'),
            ViewMatrix: gl.getUniformLocation(webGLPrograms[0], 'uViewMatrix'),
            ModelMatrix: gl.getUniformLocation(webGLPrograms[0], 'uModelMatrix'),
        },
    };
    // Objects that don't emit light (reflection)
    const programInfo_Objects = {
        program: webGLPrograms[1],
        attribLocations: {
            vertexPosition: gl.getAttribLocation(webGLPrograms[1], 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(webGLPrograms[1], 'aVertexColor'),
            normalPosition: gl.getAttribLocation(webGLPrograms[1], 'aNormal'),
        },
        uniformLocations: {
            lightPosition: gl.getUniformLocation(webGLPrograms[1],'u_lightWorldPosition'), // Light Position
            projectionMatrix: gl.getUniformLocation(webGLPrograms[1], 'uProjectionMatrix'),
            ViewMatrix: gl.getUniformLocation(webGLPrograms[1], 'uViewMatrix'),
            ModelMatrix: gl.getUniformLocation(webGLPrograms[1], 'uModelMatrix'),
        },
    };
    // Objects that's specified with texture
    const programInfo_Textures = {
        program: webGLPrograms[2],
        attribLocations: {
            vertexPosition: gl.getAttribLocation(webGLPrograms[2], 'aVertexPosition'),
            normalPosition: gl.getAttribLocation(webGLPrograms[2], 'aNormal'),
            textureCoordPosition: gl.getAttribLocation(webGLPrograms[2], 'aTextureCoord')
        },
        uniformLocations: {
            lightPosition: gl.getUniformLocation(webGLPrograms[2],'u_lightWorldPosition'), // Light Position
            projectionMatrix: gl.getUniformLocation(webGLPrograms[2], 'uProjectionMatrix'),
            ViewMatrix: gl.getUniformLocation(webGLPrograms[2], 'uViewMatrix'),
            ModelMatrix: gl.getUniformLocation(webGLPrograms[2], 'uModelMatrix'),
            Sampler: gl.getUniformLocation(webGLPrograms[2], 'uSampler')
        },
    };

    return {
        Illuminant: programInfo_Illuminant,
        Objects: programInfo_Objects,
        Texture: programInfo_Textures
    }
}
