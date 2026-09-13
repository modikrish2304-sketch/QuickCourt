import React from 'react';

export interface SportCardProps {
  name: string;
  venueCount: number;
  icon: string;
  image: string;
  description?: string;
  onClick: () => void;
}

export const SportCard: React.FC<SportCardProps> = ({
  name,
  icon,
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-[20px] bg-slate-900 aspect-square shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgb(0,0,0,0.15)] flex flex-col items-center justify-center border border-slate-200/50 hover:border-[#16A34A]/50"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

      {/* Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="text-[56px] mb-3 drop-shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
          {icon}
        </div>
        <h3 className="text-[18px] sm:text-[20px] font-extrabold text-white font-display drop-shadow-md tracking-wide">
          {name}
        </h3>
      </div>
    </div>
  );
};
