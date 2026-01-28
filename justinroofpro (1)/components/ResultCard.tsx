
import React from 'react';

interface ResultCardProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ label, value, unit, highlight }) => {
  return (
    <div className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
      highlight 
        ? 'bg-yellow-500 border-yellow-400 text-slate-900 shadow-lg shadow-yellow-500/20' 
        : 'bg-slate-800 border-slate-700 text-white'
    }`}>
      <span className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${highlight ? 'text-slate-800' : 'text-slate-400'}`}>
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black mono">{value}</span>
        {unit && <span className="text-xs font-bold uppercase">{unit}</span>}
      </div>
    </div>
  );
};
