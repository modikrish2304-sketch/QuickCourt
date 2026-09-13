import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps & { variant?: 'light' | 'dark' }> = ({ className = '', showTagline = false, size = 'md', variant = 'light' }) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Court/Racquet Vector Emblem */}
      <div className={`${iconSize} rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 shrink-0`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {/* Court lines & lightning sport stroke */}
          <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" strokeOpacity="0.9" />
          <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
          <path d="M12 2v20" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={`${titleSize} font-extrabold tracking-tight ${variant === 'dark' ? 'text-white' : 'text-slate-900'} font-display`}>
            Quick<span className={variant === 'dark' ? 'text-white' : 'text-emerald-600'}>Court</span>
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] uppercase font-bold tracking-wider -mt-0.5 ${variant === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Find. Book. Play.
          </span>
        )}
      </div>
    </div>
  );
};
