uniform mat4 projection;
uniform mat4 view;
attribute vec3 coords;
varying vec3 vCoords;
void main() {
   gl_Position = projection * view * vec4(coords,1.0);
   vCoords = coords;
}