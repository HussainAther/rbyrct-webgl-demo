/**
 * Multiplicative Algebraic Reconstruction Technique (MART)
 * Based on Ather & Gordon (2025)
 */

export const updateMART = (imageBuffer, projectionData, rayPath, relaxation = 0.1) => {
  // calculate current projection sum along the ray
  const currentProjection = rayPath.reduce((sum, pixelIdx) => sum + imageBuffer[pixelIdx], 0);

  if (currentProjection === 0) return imageBuffer;

  // The MART Multiplicative Update: f_j^(k+1) = f_j^k * (p_i / sum)^lambda
  // This non-linear update handles sparse data better than SIRT
  const updateFactor = Math.pow(projectionData / currentProjection, relaxation);

  rayPath.forEach(pixelIdx => {
    imageBuffer[pixelIdx] *= updateFactor;
  });

  return imageBuffer;
};
