uniform sampler2D uNoise;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

vec3 getIridescentColor(float intensity) {
    // Define color palette
    // TODO: modify the colors to create a more interesting iridescent effect
    // vec3 color1 = vec3(0.0, 0.0, 1.0); // Blue
    // vec3 color2 = vec3(0.0, 1.0, 0.6); // Green
    vec3 color1 = vec3(1.0, 0.0, 0.0); // Blue
    vec3 color2 = vec3(1.0, 0.87, 0.0); // Green

    // TODO:
    // Interpolate colors based on the intensity
    if(intensity < 0.125) {
        return mix(vec3(1.0, 1.0, 1.0), color1, intensity / 0.125);
    } else if(intensity < 0.25) {
        return mix(color1, color2, (intensity - .375) / 0.25);
    }
}

vec3 iridescentColor(vec3 normal, vec3 viewDir, vec3 noise) {
    float angle = abs(dot(normal, viewDir));
    // TODO:
    float intensity = pow(angle, 5.0) * pow(noise.x, .75);

    vec3 iridescentColor = getIridescentColor(intensity);
    return mix(vec3(1.0), iridescentColor, noise);
}

void main() {
    // normal 
    vec3 normal = normalize(vNormal);
    normal *= gl_FrontFacing ? 1.0 : -1.0;

    vec3 noise = texture2D(uNoise, vUv * 1.0).rgb;
    vec3 viewDirection = normalize(vPosition - cameraPosition);

    vec3 color = iridescentColor(normal, viewDirection, noise);
    float alpha = pow(abs(dot(normal, viewDirection)), 2.0);
    gl_FragColor = vec4(color, alpha);

    // #include <tonemapping_fragment>
    // #include <colorspace_fragment>
}