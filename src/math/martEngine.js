/**
 * MART Engine for Ray-by-Ray CT
 * Optimized for 2-4mm lesion detection.
 */
export const performMARTUpdate = (currentImage, rayPath, measuredProjection, relaxation = 0.5) => {
  // 1. Calculate the forward projection along the current ray path
  const currentProjection = rayPath.reduce((sum, pixel) => sum + currentImage[pixel], 0);

  if (currentProjection === 0) return currentImage;

  // 2. Multiplicative Update: New = Old * (Measured/Calculated)^lambda
  // This helps 'ghosts' dissipate while real lesions converge.
  const updateFactor = Math.pow(measuredProjection / currentProjection, relaxation);

  const updatedImage = [...currentImage];
  rayPath.forEach(pixel => {
    updatedImage[pixel] *= updateFactor;
  });

  return updatedImage;
};
