import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import { CompRoom } from './Comp-room';
import HeroLights from './HeroLights';
import Particles from './Particles';

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const canvasRef = useRef();

  useEffect(() => {
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('🛑 WebGL context lost.');
    };
    const handleContextRestored = () => {
      console.warn('✅ WebGL context restored.');
    };

    const canvasEl = canvasRef.current?.gl?.domElement;
    if (canvasEl) {
      canvasEl.addEventListener('webglcontextlost', handleContextLost);
      canvasEl.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvasEl) {
        canvasEl.removeEventListener('webglcontextlost', handleContextLost);
        canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      dpr={[1, 2]}
      shadows
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 15], fov: 45 }}
    >
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <HeroLights />


      <Suspense fallback={null}>
      <Particles count={1000}/>
        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -2.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <CompRoom />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
