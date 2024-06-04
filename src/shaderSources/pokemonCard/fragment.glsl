uniform sampler2D uNoiseTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    vec4 noiseTexture = texture2D(uNoiseTexture, vUv);

    // normal 
    vec3 normal = normalize(vNormal);
    normal *= gl_FrontFacing ? 1.0 : -1.0;

    vec3 viewDirection = (vPosition - normalize(cameraPosition));

    float viewAngle = acos(dot(normal, viewDirection)) * 2.0 * 3.14159;
    float viewFactor = cos(viewAngle);

    float textureFactor = smoothstep(0.45, 0.8, noiseTexture.r);

    vec3 gradientColor = mix(vec3(2.0, 0.0, 0.0), vec3(0.0, 0.0, 2.0), (vUv.x + vUv.y - .5));
    vec3 iridescentColor = mix(gradientColor, vec3(1.0, 1.0, 1.0) * viewFactor, viewFactor);

    vec4 finalColor = mix(noiseTexture, vec4(iridescentColor, 1.0), .3);

    // finalColor.a = (-viewFactor + .5) * textureFactor;

    gl_FragColor = finalColor;
}