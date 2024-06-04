import * as THREE from "three";
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

import hologramVertexShader from "../../shaderSources/hologram/vertex.glsl";
import hologramFragmentShader from "../../shaderSources/hologram/fragment.glsl";

const hologram = () => {
  // Debug
  const debug = useControls({
    clearColor: "#0d0d10",
    color: "#7cffff",
    isGlitch: true,
  });

  const { camera, gl } = useThree();

  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const materialOptions = {
    color: debug.color,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  };

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: hologramVertexShader,
    fragmentShader: hologramFragmentShader,
    uniforms: {
      uTime: new THREE.Uniform(0),
      uColor: new THREE.Uniform(new THREE.Color(materialOptions.color)),
      uIsGlitch: new THREE.Uniform(debug.isGlitch),
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  shaderMaterialRef.current = shaderMaterial;

  const suzanne = useLoader(GLTFLoader, "../assets/hologram/suzanne.glb");
  suzanne.scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = shaderMaterial;
    }
  });

  useEffect(() => {
    camera.position.set(5, 5, 5);
  }, [camera]);

  useEffect(() => {
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uColor.value.set(debug.color);
      shaderMaterialRef.current.uniforms.uIsGlitch.value = debug.isGlitch;
    }
  }, [debug.color, debug.isGlitch]);

  useEffect(() => {
    gl.setClearColor(new THREE.Color(debug.clearColor));
  }, [debug.clearColor, gl]);

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
