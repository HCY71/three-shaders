varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    // position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varyings
    vUv = uv;
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}