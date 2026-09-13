import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search venue, location or sport...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-4 pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium rounded-2xl border border-slate-300 py-3 pl-12 pr-11 shadow-sm hover:border-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
