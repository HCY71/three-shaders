import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useControls } from "leva";

import hologramVertexShader from "../../shaderSources/hologram/vertex.glsl";
import hologramFragmentShader from "../../shaderSources/hologram/fragment.glsl";

import Button from "@/components/Button";

const hologram = () => {
  let animationFrame: number = 0;
  // Debug
  const debug = useControls({ clearColor: "#1d1f2a" });

  useEffect(() => {
    /**
     * Base
     */

    // Canvas
    const canvas = document.querySelector("canvas.webgl") as HTMLElement;

    // Scene
    const scene = new THREE.Scene();

    // Loaders
    const gltfLoader = new GLTFLoader();

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      25,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(7, 7, 7);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const rendererParameters: { clearColor: string } = { clearColor: "" };
    rendererParameters.clearColor = debug.clearColor;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setClearColor(rendererParameters.clearColor);
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Material
     */
    const material = new THREE.ShaderMaterial({
      vertexShader: hologramVertexShader,
      fragmentShader: hologramFragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
      },
      transparent: true,
    });

    /**
     * Objects
     */
    // Torus knot
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
      material
    );
    torusKnot.position.x = 3;
    scene.add(torusKnot);

    // Sphere
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(), material);
    sphere.position.x = -3;
    scene.add(sphere);

    // Suzanne
    let suzanne: THREE.Object3D | null = null;
    gltfLoader.load("../assets/hologram/suzanne.glb", (gltf) => {
      suzanne = gltf.scene;
      suzanne.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = material;
        }
      });
      scene.add(suzanne);
    });

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      //   Update material uniforms
      material.uniforms.uTime.value = elapsedTime;

      // Rotate objects
      if (suzanne) {
        suzanne.rotation.x = -elapsedTime * 0.1;
        suzanne.rotation.y = elapsedTime * 0.2;
      }

      sphere.rotation.x = -elapsedTime * 0.1;
      sphere.rotation.y = elapsedTime * 0.2;

      torusKnot.rotation.x = -elapsedTime * 0.1;
      torusKnot.rotation.y = elapsedTime * 0.2;

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      animationFrame = window.requestAnimationFrame(tick);
    };

    tick();
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [debug]);

  return (
    <>
      <canvas className="webgl" />
      <Button name="hologram" />
    </>
  );
};

export default hologram;
