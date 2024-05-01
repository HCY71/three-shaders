import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import coffeeSmokeVertexShader from "../../shaderSources/coffeeSmoke/vertex.glsl";
import coffeeSmokeFragmentShader from "../../shaderSources/coffeeSmoke/fragment.glsl";
import { useRef } from "react";

const coffeeSmoke = () => {
  useThree(({ camera }) => {
    camera.position.set(8, 10, 12);
  });
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const coffeeModel = useLoader(
    GLTFLoader,
    "/assets/coffee_smoke/bakedModel.glb"
  );

  const perlinTexture = useLoader(
    THREE.TextureLoader,
    "/assets/coffee_smoke/perlin.png"
  );
  perlinTexture.wrapS = THREE.RepeatWrapping;
  perlinTexture.wrapT = THREE.RepeatWrapping;

  const uniforms = {
    uTime: new THREE.Uniform(0),
    uPerlinTexture: new THREE.Uniform(perlinTexture),
  };
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    shaderRef.current!.uniforms.uTime.value = elapsedTime;
  });
  return (
    <>
      <primitive object={coffeeModel.scene} />
      {/* Smoke mesh */}
      <mesh
        // @ts-ignore
        scale={[1.5, 6, 1.5]}
        position={[0, 4.83, 0]}
      >
        <planeGeometry args={[1, 1, 16, 64]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={coffeeSmokeVertexShader}
          fragmentShader={coffeeSmokeFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default coffeeSmoke;
