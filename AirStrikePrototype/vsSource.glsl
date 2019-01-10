attribute vec4 aVertexPosition;
attribute vec3 aNormal;

uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uProjectionMatrix;

varying mediump vec3 Normal;

attribute vec2 aTextureCoord;
varying highp vec2 vTextureCoord;

varying mediump vec3 FragPos2;
void main(void) {
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix* aVertexPosition;
    vec4 modelPos = uModelMatrix * aVertexPosition;
    FragPos2 = modelPos.xyz / modelPos.w;
    Normal = vec3(uModelMatrix * vec4(aNormal,0.0));
    vTextureCoord = aTextureCoord;
}