import { create } from 'zustand';

export const useStore = create((set) => ({
  // State
  rays: 0,
  phase: 'SCOUT', // 'SCOUT' | 'IRRADIATING'
  isRunning: false,
  
  // Actions
  incrementRays: () => set((state) => {
    if (state.rays >= 12500) return { rays: 12500, isRunning: false };
    const newRayCount = state.rays + 1;
    // Transition to Irradiating Phase automatically at 2500
    const newPhase = newRayCount >= 2500 ? 'IRRADIATING' : 'SCOUT';
    return { rays: newRayCount, phase: newPhase };
  }),
  
  toggleSimulation: () => set((state) => ({ isRunning: !state.isRunning })),
  
  setPhase: (newPhase) => set({ phase: newPhase }),
  
  resetSimulation: () => set({ rays: 0, phase: 'SCOUT', isRunning: false }),
}));

### 2. Integrating with the Components

Now, you connect your `LiveSimulation` (Physics) and `AdaptiveController` (UI) to this store. This replaces the local `useState` hooks you currently have in those files.

#### Update: `src/components/AdaptiveController.jsx`
Replace your local state with the store hook.

import { useStore } from '../store/useStore';

export const AdaptiveController = () => {
  const { rays, phase, toggleSimulation, isRunning } = useStore();

  return (
    <div className="p-6 bg-slate-900 text-white rounded-lg border border-cyan-500/30">
      <h3 className="text-xl font-bold mb-4">RBYRCT Control Panel</h3>
      <button 
        onClick={toggleSimulation}
        className={`px-4 py-2 rounded ${isRunning ? 'bg-red-600' : 'bg-cyan-600'}`}
      >
        {isRunning ? 'Stop Simulation' : 'Start Simulation'}
      </button>
      
      <div className="text-sm mt-4">
        <p>Phase: {phase}</p>
        <p>Ray Count: {rays.toLocaleString()} / 12,500</p>
      </div>
    </div>
  );
};

