varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {

    // model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varings
    vUv = uv;
    vPosition = position.xyz;
    vNormal = modelNormal.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}