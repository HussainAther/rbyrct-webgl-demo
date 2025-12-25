import { create } from 'zustand'

export const useSteeringStore = create((set) => ({
  azimuth: 50, // Default 0-100
  elevation: 50,
  setAzimuth: (val) => set({ azimuth: val }),
  setElevation: (val) => set({ elevation: val }),
}))
