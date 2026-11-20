import React from 'react';
import EquipmentCard from './EquipmentCard';
import EmptyState from './EmptyState';
import { SearchX } from 'lucide-react';

export default function EquipmentGrid({ 
  equipment = [], 
  columns = 4,
  emptyTitle = "No Equipment Available",
  emptyDescription = "There are no machinery listings matching your current filter criteria.",
  onResetFilters
}) {
  if (!equipment || equipment.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title={emptyTitle}
        description={emptyDescription}
        actionText={onResetFilters ? "Reset Filters" : undefined}
        onAction={onResetFilters}
      />
    );
  }

  const columnClasses = {
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${columnClasses[columns] || columnClasses[4]} gap-5 sm:gap-6`}>
      {equipment.map((item) => (
        <EquipmentCard key={item.id} equipment={item} />
      ))}
    </div>
  );
}
