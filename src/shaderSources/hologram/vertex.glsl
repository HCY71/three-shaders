uniform float uTime;
uniform bool uIsGlitch;
varying vec3 vPosition;
varying vec3 vNormal;

float random2D(vec2 value) {
    return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {

    // position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // glitch
    float glitchStrength = uTime - modelPosition.y;
    glitchStrength = sin(glitchStrength * 10.5) + sin(glitchStrength) + sin(glitchStrength * 3.45);
    glitchStrength /= 3.0;
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
    glitchStrength *= .25;

    glitchStrength = uIsGlitch ? glitchStrength : 0.0;

    modelPosition.x += (random2D(modelPosition.xz + uTime) - .5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime) - .5) * glitchStrength;

    // final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varyings
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}