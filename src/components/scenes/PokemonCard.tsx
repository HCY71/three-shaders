import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect } from "react";

import pokemonCardVertexShader from "@/shaderSources/pokemonCard/vertex.glsl";
import pokemonCardFragmentShader from "@/shaderSources/pokemonCard/fragment.glsl";
import pokemonCardVertexShaderTest from "@/shaderSources/pokemonCard/testVtx.glsl";
import pokemonCardFragmentShaderTest from "@/shaderSources/pokemonCard/testFrag.glsl";

const pokemonCard = () => {
  const { gl } = useThree();
  const noiseTexture = useTexture("/assets/pokemon_card/noise.jpg");
  const texture = useTexture("/assets/pokemon_card/test.jpg");
  noiseTexture.wrapS = THREE.RepeatWrapping;
  noiseTexture.wrapT = THREE.RepeatWrapping;
  const textures = [noiseTexture, texture];

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uNoiseTexture: { value: noiseTexture },
    },
    // vertexShader: pokemonCardVertexShaderTest,
    // fragmentShader: pokemonCardFragmentShaderTest,
    vertexShader: pokemonCardVertexShader,
    fragmentShader: pokemonCardFragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
  });

  useEffect(() => {
    gl.setClearColor(new THREE.Color("white"));
  }, [gl]);

  return (
    <>
      {/* pointLight/> */}
      <ambientLight intensity={5} />
      <mesh material={shaderMaterial}>
        <planeGeometry args={[3, 4.5]} />
      </mesh>
    </>
  );
};

export default pokemonCard;
