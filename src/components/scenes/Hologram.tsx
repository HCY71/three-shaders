import { useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useControls } from "leva";
import { useRef } from "react";

import hologramVertexShader from "../../shaderSources/hologram/vertex.glsl";
import hologramFragmentShader from "../../shaderSources/hologram/fragment.glsl";

const hologram = () => {
  let animationFrame: number = 0;

  // Debug
  const debug = useControls({ clearColor: "#1d1f2a" });

  const { camera } = useThree();
  camera.position.set(5, 5, 5);

  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: hologramVertexShader,
    fragmentShader: hologramFragmentShader,
    uniforms: {
      uTime: new THREE.Uniform(0),
    },
    transparent: true,
  });

  const suzanne = useLoader(GLTFLoader, "../assets/hologram/suzanne.glb");
  suzanne.scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = shaderMaterial;
    }
  });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    shaderMaterial.uniforms.uTime.value = elapsedTime;
    suzanne.scene.rotation.x = -elapsedTime * 0.1;
    suzanne.scene.rotation.y = elapsedTime * 0.2;
    sphereRef.current!.rotation.x = -elapsedTime * 0.1;
    sphereRef.current!.rotation.y = elapsedTime * 0.2;
    torusRef.current!.rotation.x = -elapsedTime * 0.1;
    torusRef.current!.rotation.y = elapsedTime * 0.2;
  });

  return (
    <>
      <mesh position={[3, 0, 0]} material={shaderMaterial} ref={torusRef}>
        <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
      </mesh>
      <mesh position={[-3, 0, 0]} material={shaderMaterial} ref={sphereRef}>
        <sphereGeometry />
      </mesh>
      <primitive object={suzanne.scene} />
    </>
  );
};

export default hologram;
