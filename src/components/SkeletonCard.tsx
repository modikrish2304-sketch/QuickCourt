import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm animate-pulse">
      {/* Image thumbnail skeleton */}
      <div className="w-full h-48 bg-slate-200" />

      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        {/* Title and rating */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 bg-slate-200 rounded-md" />
          <div className="h-5 w-12 bg-slate-200 rounded-md" />
        </div>

        {/* Location */}
        <div className="h-3 w-48 bg-slate-100 rounded-md" />

        {/* Sports tags */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-16 bg-slate-100 rounded-full" />
          <div className="h-6 w-20 bg-slate-100 rounded-full" />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
          <div className="h-6 w-24 bg-slate-200 rounded-md" />
          <div className="h-8 w-24 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
