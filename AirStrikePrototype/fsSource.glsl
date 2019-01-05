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