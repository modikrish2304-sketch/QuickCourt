import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface SportCardProps {
  name: string;
  venueCount: number;
  icon: React.ReactNode;
  image: string;
  description?: string;
  onClick: () => void;
}

export const SportCard: React.FC<SportCardProps> = ({
  name,
  icon,
  image,
  venueCount,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-full flex-col overflow-hidden rounded-[20px] bg-slate-900 aspect-[3/4] text-left shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/40 to-transparent pointer-events-none transition-opacity duration-300" />

      {/* Top Badge (Icon) */}
      <div className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 mt-auto flex w-full flex-col p-4">
        <h3 className="text-lg font-bold text-white tracking-wide drop-shadow-sm font-display leading-tight">
          {name}
        </h3>
        
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[12px] font-medium text-slate-300 drop-shadow-sm leading-tight max-w-[70%]">
            {venueCount} venues nearby
          </span>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-[#14B8A6] group-hover:text-white">
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </button>
  );
};
