uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main () {
    // scale and animate ui
    vec2 smokeUv = vUv;
    smokeUv.x *= .5;
    smokeUv.y *= .4;
    smokeUv.y -= uTime * .025;

    // smoke 
    float smoke = texture(uPerlinTexture, smokeUv).r;

    // remap smoke
    smoke = smoothstep(.38, 1.0, smoke);
    smoke *= smoothstep(0.7,.3, vUv.y);
    smoke *= smoothstep(0.0,.1, vUv.y);
    smoke *= smoothstep(1.0,0.9, vUv.x);
    smoke *= smoothstep(0.0,.1, vUv.x);

    // final color
    gl_FragColor = vec4(.6, .5, .4, smoke);
    // gl_FragColor = vec4(1.0, 1.0, 1.0,1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}