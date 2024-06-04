uniform float uTime;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    // normal 
    vec3 normal = normalize(vNormal);
    normal *= gl_FrontFacing ? 1.0 : -1.0;

    // stripes
    float stripes = mod(vPosition.y * 15.0 - uTime * .3, 1.0);
    stripes = pow(stripes, 3.0);

    // fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(normal, viewDirection) + 1.0;
    fresnel = pow(fresnel, 2.0);

    // falloff
    float falloff = smoothstep(0.8, 0.0, fresnel);

    // holographic effect
    float holographic = stripes * fresnel;
    holographic += fresnel * 1.25;
    holographic *= falloff;

    // final color
    gl_FragColor = vec4(uColor, holographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}