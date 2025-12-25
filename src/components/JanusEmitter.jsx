import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function JanusEmitter({ steeringInput }) {
  const emitterRef = useRef();

  // 11 layers * 4 deg Bragg angle = 44 deg total steering
  const MAX_STEERING_RAD = (44 * Math.PI) / 180;

  useFrame(() => {
    if (emitterRef.current) {
      // Map 0-100 to -44 to +44 degrees
      const targetAngle = ((steeringInput - 50) / 50) * MAX_STEERING_RAD;
      
      // Mature, smooth 'electronic' steering feel
      emitterRef.current.rotation.z = THREE.MathUtils.lerp(
        emitterRef.current.rotation.z, 
        targetAngle, 
        0.1
      );
    }
  });

  return (
    <group ref={emitterRef}>
      {/* Visualizing the 11 Janus Layers */}
      {[...Array(11)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.05, 0]}>
          <boxGeometry args={[0.5, 0.02, 0.5]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#22d3ee" : "#0891b2"} emissive="#0891b2" />
        </mesh>
      ))}
      {/* The Steerable Beam */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.01, 0.05, 4]} />
        <meshStandardMaterial color="cyan" transparent opacity={0.6} emissive="cyan" />
      </mesh>
    </group>
  );
}
