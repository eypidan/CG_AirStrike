precision mediump float;
varying mediump vec3 Normal;
varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
varying mediump vec3 FragPos2;

vec4 ambient = vec4(0.4,0.4,0.4,1.0);
vec4 lightColor = vec4(1.0,1.0,1.0,0.0);
vec4 diffuse;

void main(void) {
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(vec3(-0.5,-0.5,-0.5));
    float diff = max(dot(norm, lightDir), 0.0);
    diffuse = lightColor * diff;

    vec4 Texturecolor = texture2D(uSampler, vTextureCoord);
    gl_FragColor =Texturecolor*(vec4(diff)+ambient);
}