/**
 * RBYRCT Steering Logic
 * Determines the next ray trajectory based on the current reconstruction state.
 */

export const getNextRayTrajectory = (reconstruction, phase, rays) => {
  // Constants based on JSI 11-layer Janus Physics
  const GRID_SIZE = 128;
  const CENTER = GRID_SIZE / 2;

  if (phase === 'SCOUT') {
    // Phase 1: Uniform distribution to map the 'phantom' volume
    // Returns a value between 0 and 128 (mapped to +/- 44 degrees)
    return {
      x: Math.random() * GRID_SIZE,
      y: CENTER,
      intensity: 1.0
    };
  }

  // Phase 2: IRRADIATING (Min-Hit Steering)
  // We look for the 'lesion' (high density areas) in the reconstruction array
  let targetX = CENTER;
  let maxDensity = -1;

  // Simple 'gradient descent' or 'search' for the ROI
  // In a full MART implementation, this would look at the back-projection error
  for (let i = 0; i < reconstruction.length; i++) {
    if (reconstruction[i] > maxDensity) {
      maxDensity = reconstruction[i];
      targetX = i % GRID_SIZE;
    }
  }

  // Add a small Gaussian 'jitter' to ensure coverage around the target
  const jitter = (Math.random() - 0.5) * 5; 
  
  return {
    x: Math.max(0, Math.min(GRID_SIZE, targetX + jitter)),
    y: CENTER,
    intensity: 1.5 // Increased intensity for the targeted phase
  };
};
