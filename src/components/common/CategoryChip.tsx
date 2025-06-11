import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // For conditional classes

interface CategoryChipProps {
  id: string | number;
  name: string;
  icon?: React.ReactNode; // Optional icon
  isSelected?: boolean;
  onClick: (id: string | number) => void;
  className?: string;
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  id,
  name,
  icon,
  isSelected = false,
  onClick,
  className,
}) => {
  console.log("Rendering CategoryChip:", name, "Selected:", isSelected);
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      size="sm"
      className={cn(
        "rounded-full h-auto py-1.5 px-4 transition-all duration-200 ease-in-out",
        isSelected ? "bg-orange-500 text-white hover:bg-orange-600" : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-orange-400",
        className
      )}
      onClick={() => onClick(id)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="text-sm font-medium">{name}</span>
    </Button>
  );
};
export default CategoryChip;