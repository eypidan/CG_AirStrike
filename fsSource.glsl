precision mediump float;
varying mediump vec3 Normal;
varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
varying mediump vec3 FragPos2;

uniform vec4 ambientLight;
uniform vec4 lightColor;
uniform vec3 lightDirection;
vec4 diffuse;

void main(void) {
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightDirection);
    float diff = max(dot(norm, lightDir), 0.2);
    diffuse = lightColor * diff;

    vec4 Texturecolor = texture2D(uSampler, vTextureCoord);
    gl_FragColor =Texturecolor * (vec4(diff) + ambientLight);
}