import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({ rating = 0, reviews, showCount = true, size = 'sm' }) {
  const starSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const currentSize = starSizes[size] || starSizes.sm;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${currentSize} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="font-semibold text-agri-text text-sm ml-0.5">
        {rating?.toFixed(1) || '0.0'}
      </span>
      {showCount && reviews !== undefined && (
        <span className="text-agri-muted text-xs">
          ({reviews})
        </span>
      )}
    </div>
  );
}
