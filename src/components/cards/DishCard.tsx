import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlusCircle, Edit3 } from 'lucide-react'; // Icons for add to cart and customize

interface DishCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  description?: string;
  price: number;
  onAddToCart: (id: string | number) => void;
  onCustomize?: (id: string | number) => void; // Optional customize action
  className?: string;
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  imageUrl,
  description,
  price,
  onAddToCart,
  onCustomize,
  className,
}) => {
  console.log("Rendering DishCard:", name);

  return (
    <Card className={`w-full overflow-hidden flex flex-col ${className}`}>
      <CardHeader className="p-0">
        <AspectRatio ratio={4 / 3}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-3 space-y-1 flex-grow">
        <h3 className="text-md font-semibold truncate" title={name}>{name}</h3>
        {description && <p className="text-xs text-gray-500 line-clamp-2">{description}</p>}
        <p className="text-sm font-bold text-orange-600 pt-1">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex gap-2">
        {onCustomize && (
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onCustomize(id)}>
            <Edit3 size={16} className="mr-1.5" /> Customize
          </Button>
        )}
        <Button 
            size="sm" 
            className="flex-1 bg-orange-500 hover:bg-orange-600" 
            onClick={() => onAddToCart(id)}
        >
          <PlusCircle size={16} className="mr-1.5" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
};
export default DishCard;