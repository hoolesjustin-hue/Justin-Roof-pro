
import React, { useMemo } from 'react';
import { NumberInput } from './NumberInput';
import { ResultCard } from './ResultCard';

interface Props {
  length: string;
  setLength: (val: string) => void;
  width: string;
  setWidth: (val: string) => void;
}

export const MainAreaCalculator: React.FC<Props> = ({ length, setLength, width, setWidth }) => {
  const results = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    
    const baseSqft = l * w;
    const totalWithWaste = baseSqft * 1.1;

    return {
      baseSqft: Math.round(baseSqft),
      totalWithWaste: Math.ceil(totalWithWaste),
      iso4x4: Math.ceil(totalWithWaste / 16),
      iso4x8: Math.ceil(totalWithWaste / 32),
      board3x8: Math.ceil(totalWithWaste / 24),
      capRolls: Math.ceil(totalWithWaste / 75),
      baseRolls: Math.ceil(totalWithWaste / 96)
    };
  }, [length, width]);

  const handleReset = () => {
    setLength('');
    setWidth('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput label="Length" value={length} onChange={setLength} placeholder="0.00" suffix="FT" />
        <NumberInput label="Width" value={width} onChange={setWidth} placeholder="0.00" suffix="FT" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ResultCard label="Base Area" value={results.baseSqft} unit="SQFT" />
        <ResultCard label="Area (+10%)" value={results.totalWithWaste} unit="SQFT" highlight />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1 border-b border-slate-800 pb-2 italic">
          Estimated Materials
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className="text-slate-300 font-semibold text-xs">4' x 4' ISO Board</span>
            <span className="text-2xl font-black text-yellow-500 mono">{results.iso4x4}</span>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className="text-slate-300 font-semibold text-xs">4' x 8' ISO Board</span>
            <span className="text-2xl font-black text-yellow-500 mono">{results.iso4x8}</span>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className="text-slate-300 font-semibold text-xs">3' x 8' Board</span>
            <span className="text-2xl font-black text-yellow-500 mono">{results.board3x8}</span>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className="text-slate-300 font-semibold text-xs">3' x 25' Cap Rolls</span>
            <span className="text-2xl font-black text-yellow-500 mono">{results.capRolls}</span>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className="text-slate-300 font-semibold text-xs">3' x 32' Base Rolls</span>
            <span className="text-2xl font-black text-yellow-500 mono">{results.baseRolls}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleReset}
        className="w-full bg-slate-800 text-slate-400 font-bold p-4 rounded-xl border-2 border-slate-700 hover:text-white hover:border-slate-600 transition-all active:scale-95 text-xs uppercase tracking-widest"
      >
        RESET ALL FIELDS
      </button>
    </div>
  );
};
