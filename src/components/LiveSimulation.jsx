import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { JanusEmitter } from './JanusEmitter';
import { getNextRayTrajectory } from '../math/steeringLogic';

export const LiveSimulation = () => {
  const [rays, setRays] = useState(0);
  const [currentSteering, setCurrentSteering] = useState(50); // 0-100 scale
  const [reconstruction, setReconstruction] = useState(new Float32Array(128 * 128));

  useEffect(() => {
    const interval = setInterval(() => {
      if (rays < 12500) {
        // 1. Get next target based on research phase
        const phase = rays < 2500 ? 'SCOUT' : 'IRRADIATING';
        const nextTarget = getNextRayTrajectory(reconstruction, phase, rays);
        
        // 2. Map the X coordinate (0-128) to the Janus Emitter range (0-100)
        const newSteeringValue = (nextTarget.x / 128) * 100;
        
        setCurrentSteering(newSteeringValue);
        setRays(prev => prev + 1);
        
        // Note: In a full app, you'd trigger the MART update here
      }
    }, 50); // High-speed electronic steering simulation

    return () => clearInterval(interval);
  }, [rays, reconstruction]);

  return (
    <div className="relative w-full h-[600px] bg-black rounded-xl overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-black/50 p-4 border border-cyan-500 rounded">
        <h2 className="text-cyan-400 font-mono">BEAM STATUS: {rays < 2500 ? 'SCOUTING' : 'IRRADIATING'}</h2>
        <p className="text-white">Ray Count: {rays.toLocaleString()}</p>
        <p className="text-xs text-slate-400">Targeting 3mm Lesion at SNR 5.0</p>
      </div>

      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <JanusEmitter steeringInput={currentSteering} />
        {/* The Phantom Breast Model would go here */}
        <mesh position={[0, -2, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#333" transparent opacity={0.2} wireframe />
        </mesh>
      </Canvas>
    </div>
  );
};
