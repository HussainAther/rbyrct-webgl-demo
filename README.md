# RBYRCT-WebGL-Demo: The Janus Steering Engine

This repository contains the interactive WebGL implementation of **Ray-by-Ray Computed Tomography (RBYRCT)**. It demonstrates the ability to decouple imaging resolution from radiation dose using electronically steerable Janus emitters.

## Core Technology
- **Janus Emitter Logic**: Simulates an 11-layer Janus grid where each layer provides a 4° Bragg angle, totaling a **±44° steering range**.
- **Adaptive Two-Phase Control**: 
    - **Scout Phase**: Initial 2,500 rays for low-resolution mapping.
    - **Irradiating Phase**: Adaptive steering targeting a **3mm lesion** until reaching clinical reliability (**SNR > 5.0**).
- **MART Engine**: A custom algebraic reconstruction technique (implemented in `src/math`) that updates the phantom model in real-time based on ray trajectories.

## Project Structure
- `/src/components`: React + Three.js (Fiber) components for the 3D visualization.
- `/src/math`: The physics-heavy logic, including Bragg diffraction and MART.
- `/src/store`: State management (Zustand) for ray counts and dose metrics.

## Roadmap
1. [ ] **GPU Acceleration**: Migrating the MART update logic from `MART.js` to WGSL compute shaders.
2. [ ] **Phantom Realism**: Implementing a voxel-based breast tissue model in `Phantom.jsx`.
3. [ ] **Dose Reporting**: Adding a real-time "Dose Concentration Ratio" (DCR) tracker to the dashboard.
