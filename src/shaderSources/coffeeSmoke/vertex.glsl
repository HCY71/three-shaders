uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

vec2 rotate2D(vec2 value, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, -s, s, c);
    return m * value;
}

void main () {
    vec3 rotatedPosition = position;
    
    // twist
    float twistPerlin = texture(uPerlinTexture, vec2(.1, uv.y * .1 - uTime * .05)).r;
    float angle =  position.y * twistPerlin;
    rotatedPosition.xz = rotate2D(rotatedPosition.xz, angle);

    // wind
    vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(.25, uTime * .01)).r - .5, 
        texture(uPerlinTexture, vec2(.4, uTime * .01)).r - .5
    );
    windOffset *= pow(uv.y, 2.5) * 7.0;
    rotatedPosition.xz += windOffset;
;
    // final position
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(rotatedPosition, 1.0);
    
    // pass the uv to the fragment shader
    vUv = uv;
}