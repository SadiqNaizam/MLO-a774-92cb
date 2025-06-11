import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number; // e.g., 4.5
  deliveryTime: string; // e.g., "25-35 min"
  // Add other props like priceRange, promotions, etc.
  onClick?: (id: string | number) => void; // For navigation or actions
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  onClick,
  className,
}) => {
  console.log("Rendering RestaurantCard:", name);

  const content = (
    <Card className={`w-full overflow-hidden transition-shadow duration-300 hover:shadow-xl ${className}`}>
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-3 space-y-1">
        <h3 className="text-lg font-semibold truncate" title={name}>{name}</h3>
        <div className="text-xs text-gray-600 truncate">
          {cuisineTypes.join(', ')}
        </div>
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center text-amber-500">
            <Star size={14} className="mr-1 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>{deliveryTime}</span>
          </div>
        </div>
      </CardContent>
      {/* Optional footer for promotions or quick actions */}
      {/* <CardFooter className="p-3 pt-0">
        <Badge variant="destructive">15% OFF</Badge>
      </CardFooter> */}
    </Card>
  );

  // Wrap with Link if onClick is not provided, assuming navigation to restaurant page
  return onClick ? (
    <div onClick={() => onClick(id)} className="cursor-pointer">
      {content}
    </div>
  ) : (
    <Link to={`/restaurant/${id}`}>
      {content}
    </Link>
  );
};
export default RestaurantCard;