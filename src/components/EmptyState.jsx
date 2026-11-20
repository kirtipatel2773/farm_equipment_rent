import React from 'react';
import Button from './Button';
import { Sparkles } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Sparkles,
  title = 'No items found',
  description = 'We couldn\'t find any equipment matching your criteria. Try adjusting your filters.',
  actionText,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-agri-border my-6">
      <div className="w-16 h-16 rounded-2xl bg-agri-light flex items-center justify-center text-agri-primary mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold text-agri-text mb-2">{title}</h3>
      <p className="text-agri-muted max-w-md text-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
