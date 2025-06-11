import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For quantity adjustment
import { X, Plus, Minus } from 'lucide-react';

interface OrderSummaryItemProps {
  id: string | number;
  name: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  variantInfo?: string; // e.g., "Size: Large, Toppings: Extra Cheese"
  onQuantityChange: (id: string | number, newQuantity: number) => void;
  onRemove: (id: string | number) => void;
  className?: string;
}

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({
  id,
  name,
  imageUrl,
  price,
  quantity,
  variantInfo,
  onQuantityChange,
  onRemove,
  className,
}) => {
  console.log("Rendering OrderSummaryItem:", name, "Qty:", quantity);

  const handleIncrement = () => onQuantityChange(id, quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    } else {
      onRemove(id); // Or set quantity to 0 and let parent handle removal
    }
  };
  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0) { // Allow 0 to potentially trigger removal
      onQuantityChange(id, val);
    }
  };


  return (
    <div className={`flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0 ${className}`}>
      {imageUrl && (
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={name}
          className="w-16 h-16 object-cover rounded-md"
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
        />
      )}
      <div className="flex-grow">
        <h4 className="text-sm font-medium">{name}</h4>
        {variantInfo && <p className="text-xs text-gray-500">{variantInfo}</p>}
        <div className="flex items-center mt-1">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleDecrement}>
            <Minus size={14} />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityInputChange}
            className="h-7 w-12 text-center mx-1 px-0 hide-arrows [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min="0"
          />
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleIncrement}>
            <Plus size={14} />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-orange-600">${(price * quantity).toFixed(2)}</p>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 h-7 w-7 mt-1" onClick={() => onRemove(id)}>
          <X size={16} />
        </Button>
      </div>
    </div>
  );
};
export default OrderSummaryItem;