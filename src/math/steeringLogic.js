/**
 * RBYRCT Adaptive Steering Logic
 * Based on Ather & Gordon (2025): "Min-Hit" and "Scout" Phases
 */

export const getNextRayTrajectory = (reconstructionGrid, phase, totalRaysFired) => {
  const GRID_SIZE = 128; // Example 2D slice size

  if (phase === 'SCOUT' || totalRaysFired < 2500) {
    // Phase 1: Uniform/Random sampling to establish the ROI
    // Equivalent to a 'light sprinkling of photons'
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      type: 'RANDOM_SCOUT'
    };
  }

  // Phase 2: Irradiating Phase (Min-Hit Steering)
  // Goal: Sharpen real features and let noise 'ghosts' fade
  let bestCandidate = { x: 0, y: 0, intensity: -1 };

  // Scan the reconstruction for 'Features of possible interest'
  for (let i = 0; i < reconstructionGrid.length; i++) {
    const intensity = reconstructionGrid[i];
    
    // We target areas with higher density (potential lesions) 
    // that haven't reached the SNR > 5.0 threshold yet
    if (intensity > bestCandidate.intensity) {
      bestCandidate = {
        x: i % GRID_SIZE,
        y: Math.floor(i / GRID_SIZE),
        intensity: intensity
      };
    }
  }

  return {
    ...bestCandidate,
    type: 'TARGETED_STEERING'
  };
};
