import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function JanusEmitter({ steeringValue }) {
  const groupRef = useRef();
  
  // Logic: 11 layers @ 4° Bragg angle = +/- 44° range
  const maxSteering = (44 * Math.PI) / 180;

  useFrame(() => {
    if (groupRef.current) {
      // Map 0-100 slider to -44° to +44°
      const targetRotation = ((steeringValue - 50) / 50) * maxSteering;
      
      // Smooth interpolation for the electronic steering feel
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        targetRotation, 
        0.15
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Visualizing 11 layers of Janus Spheres */}
      {[...Array(11)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.1, 0]}>
          <sphereGeometry args={[0.04, 32, 32]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "silver" : "darkgrey"} 
            roughness={0.1}
          />
        </mesh>
      ))}
      {/* The Steering Lobe: 1.1577cm spatial shift visualized */}
      <mesh position={[0, 0, 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.2, 4, 32]} />
        <meshStandardMaterial color="cyan" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
