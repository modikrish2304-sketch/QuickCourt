import React from 'react';
import { Star } from 'lucide-react';

export interface RatingProps {
  value: number;
  max?: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  reviewCount,
  size = 'md',
  showNumber = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(max)].map((_, i) => {
          const filled = i + 1 <= Math.floor(value);
          const half = !filled && i < value;

          return (
            <Star
              key={i}
              className={`${iconSizes[size]} ${
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : half
                  ? 'fill-amber-200 text-amber-400'
                  : 'fill-slate-100 text-slate-300'
              }`}
            />
          );
        })}
      </div>

      {showNumber && (
        <span className={`font-bold text-slate-800 ${textSizes[size]}`}>
          {value > 0 ? value.toFixed(1) : 'New'}
        </span>
      )}

      {reviewCount !== undefined && reviewCount > 0 && (
        <span className={`text-slate-400 font-normal ${textSizes[size]}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
