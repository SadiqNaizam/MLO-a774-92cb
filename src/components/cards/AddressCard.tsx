import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Home, Edit2, Trash2 } from 'lucide-react'; // Icons

interface Address {
  id: string | number;
  type: 'Home' | 'Work' | 'Other'; // Address type for icon/label
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  onSelect?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  showActions?: boolean; // To show/hide edit/delete buttons
  className?: string;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  showActions = true,
  className,
}) => {
  console.log("Rendering AddressCard:", address.line1, "Selected:", isSelected);

  const AddressIcon = address.type === 'Home' ? Home : Edit2; // Simplified, could be more specific

  return (
    <Card className={`overflow-hidden transition-all ${isSelected ? "border-orange-500 ring-2 ring-orange-500" : ""} ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {onSelect && (
            <RadioGroup value={isSelected ? String(address.id) : undefined} onValueChange={() => onSelect(address.id)} className="mt-1">
              <RadioGroupItem value={String(address.id)} id={`address-${address.id}`} />
            </RadioGroup>
          )}
          <Label htmlFor={`address-${address.id}`} className="flex-grow cursor-pointer">
            <div className="flex items-center mb-1">
              <AddressIcon size={18} className="mr-2 text-orange-500" />
              <h4 className="font-semibold text-sm">{address.type} {address.isDefault && <span className="text-xs text-green-600 ml-1">(Default)</span>}</h4>
            </div>
            <p className="text-xs text-gray-600">{address.line1}</p>
            {address.line2 && <p className="text-xs text-gray-600">{address.line2}</p>}
            <p className="text-xs text-gray-600">{`${address.city}, ${address.state} ${address.zip}`}</p>
          </Label>
        </div>
      </CardContent>
      {showActions && (onEdit || onDelete) && (
        <CardFooter className="p-2 bg-gray-50 border-t flex justify-end gap-2">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={() => onEdit && onEdit(address.id)}>
              <Edit2 size={14} className="mr-1" /> Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => onDelete && onDelete(address.id)}>
              <Trash2 size={14} className="mr-1" /> Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
export default AddressCard;