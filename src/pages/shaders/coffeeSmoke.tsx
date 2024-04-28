import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import coffeeSmokeVertexShader from "../../shaderSources/coffeeSmoke/vertex.glsl";
import coffeeSmokeFragmentShader from "../../shaderSources/coffeeSmoke/fragment.glsl";

const coffeeSmoke = () => {
  let animationFrame: number = 0;
  useEffect(() => {
    /**
     * Base
     */

    // Canvas
    const canvas = document.querySelector("canvas.webgl") as HTMLElement;

    // Scene
    const scene = new THREE.Scene();

    // Loaders
    const textureLoader = new THREE.TextureLoader();
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
    camera.position.x = 8;
    camera.position.y = 10;
    camera.position.z = 12;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.target.y = 3;
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Model
     */
    gltfLoader.load("../assets/coffee_smoke/bakedModel.glb", (gltf) => {
      scene.add(gltf.scene);
    });

    /**
     * Smoke
     */
    // Geometry
    const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
    smokeGeometry.translate(0, 0.5, 0);
    smokeGeometry.scale(1.5, 6, 1.5);

    // Perlin texture
    const perlinTexture = textureLoader.load(
      "../assets/coffee_smoke/perlin.png"
    );
    perlinTexture.wrapS = THREE.RepeatWrapping;
    perlinTexture.wrapT = THREE.RepeatWrapping;

    // Material
    const smokeMaterial = new THREE.ShaderMaterial({
      vertexShader: coffeeSmokeVertexShader,
      fragmentShader: coffeeSmokeFragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uPerlinTexture: new THREE.Uniform(perlinTexture),
      },
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      // wireframe: true,
    });

    // Mesh
    const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
    smoke.position.y = 1.83;
    scene.add(smoke);

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update smoke
      smokeMaterial.uniforms.uTime.value = elapsedTime;

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
  }, []);

  return <canvas className="webgl" />;
};

export default coffeeSmoke;
