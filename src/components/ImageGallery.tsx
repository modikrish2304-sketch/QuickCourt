import React, { useState } from 'react';

export interface ImageGalleryProps {
  images: string[];
  venueName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, venueName }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
        <img
          src={displayImages[activeImageIndex]}
          alt={`${venueName} main view`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails row */}
      {displayImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                activeImageIndex === idx
                  ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${venueName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
