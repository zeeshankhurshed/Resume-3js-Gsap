import * as THREE from 'three';
import React from 'react';

const HeroLights = () => {
  return (
    <>
      {/* Soft ambient light */}
      <primitive object={new THREE.AmbientLight('#cdb4db', 1)} />

      {/* Warm directional light from front-top-right */}
      <directionalLight
        position={[4, 10, 4]}
        intensity={2}
        color="#ffd6a5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cooler fill light from left */}
      <pointLight
        position={[-5, 4, 2]}
        intensity={1.2}
        color="#bde0fe"
      />

      {/* Pop of color from below (accent effect) */}
      <spotLight
        position={[0, -2, 5]}
        angle={0.6}
        penumbra={1}
        intensity={1}
        color="#a2d2ff"
      />

      {/* Slight pink highlight from behind */}
      <spotLight
        position={[0, 5, -5]}
        angle={0.3}
        intensity={1.5}
        penumbra={0.8}
        color="#ffafcc"
      />
    </>
  );
};

export default HeroLights;
