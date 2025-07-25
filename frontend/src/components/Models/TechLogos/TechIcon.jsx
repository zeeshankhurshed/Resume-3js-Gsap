// - load a '.glb' model (GLTF format)
// - Adds basic lighting 
// - Applies environment reflectionfs for ralism 
// - Wraps the model in a floating animation 
// - Optionally tweaks the material (like setting a white color on a specific mesh)
// - Disables zoom using OrbitControls

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import React, { Suspense, useEffect } from "react";
import * as THREE from 'three';

const TechIcon = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(()=>{
    if(model.name === 'Interactive Developer'){
        scene.scene.traverse((child)=>{
            if(child.isMesh && child.name === 'Object_5'){
                child.material=new THREE.MeshStandardMaterial({color:'white'})
            }
        })
    }
  },[])

  return (
    <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
      <Canvas>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5,5,5]} intensity={1}/>
        <Environment preset="city" />

        <OrbitControls enableZoom={false}/>

        <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
          <group scale={model.scale} rotation={model.rotation}>
            <primitive object={scene.scene} />
          </group>
        </Float>
        
      </Canvas>
    </Suspense>
  );
};

export default TechIcon;
