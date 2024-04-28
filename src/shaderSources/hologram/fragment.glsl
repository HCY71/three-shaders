uniform float uTime;

varying vec3 vPosition;

void main() {

    // stripes
    float stripes = mod(vPosition.y * 15.0 - uTime * .3, 1.0);
    stripes = pow(stripes, 3.0);

    // final color
    gl_FragColor = vec4(stripes, stripes, stripes, stripes);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}