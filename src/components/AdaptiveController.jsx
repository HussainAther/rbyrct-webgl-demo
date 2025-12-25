import React, { useState } from 'react';

export const AdaptiveController = () => {
  const [phase, setPhase] = useState('SCOUT'); // Phase 1: Scout, Phase 2: Irradiating
  const [rayCount, setRayCount] = useState(0);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-lg border border-cyan-500/30">
      <h3 className="text-xl font-bold mb-4">RBYRCT Control Panel</h3>
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setPhase('SCOUT')}
          className={`px-4 py-2 rounded ${phase === 'SCOUT' ? 'bg-cyan-600' : 'bg-slate-700'}`}
        >
          Scout Phase (Random)
        </button>
        <button 
          onClick={() => setPhase('IRRADIATING')}
          className={`px-4 py-2 rounded ${phase === 'IRRADIATING' ? 'bg-orange-600' : 'bg-slate-700'}`}
        >
          Irradiating Phase (Min-Hit Steering)
        </button>
      </div>
      <div className="text-sm">
        <p>Current Ray Count: {rayCount.toLocaleString()} / 12,500</p>
        <div className="w-full bg-slate-800 h-2 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-cyan-400 h-full transition-all" 
            style={{ width: `${(rayCount / 12500) * 100}%` }}
          />
        </div>
        <p className="text-slate-400 mt-2 italic">Target: 3mm Lesion Detectability (SNR > 5.0)</p>
      </div>
    </div>
  );
};
