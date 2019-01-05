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