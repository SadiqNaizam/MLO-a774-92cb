import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import DishCard from '@/components/cards/DishCard';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // For quantity or notes
import { toast } from "sonner"; // For notifications

// Placeholder data - In a real app, this would be fetched based on restaurantId
const placeholderRestaurantMenu = {
  'r1': { // Matches ID from RestaurantCard on HomeScreen/ListingScreen
    name: 'Gourmet Burger Kitchen',
    dishes: [
      { id: 'd1', name: 'Classic Beef Burger', description: 'Juicy beef patty, lettuce, tomato, onion, special sauce.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
      { id: 'd2', name: 'Spicy Chicken Burger', description: 'Crispy chicken, spicy mayo, jalapenos.', price: 11.50, imageUrl: 'https://images.unsplash.com/photo-1606132931002-1110091366b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaWNrZW4lMjBidXJnZXJ8ZW58MHx8MHx8fDA&auto=format&fit=crop&w=500&q=60' },
      { id: 'd3', name: 'Veggie Burger', description: 'Plant-based patty, fresh veggies, veganaise.', price: 10.99, imageUrl: 'https://images.unsplash.com/photo-1572448862527-d3c904757de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZ2llJTIwYnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
      { id: 'd4', name: 'Fries', description: 'Crispy golden french fries.', price: 4.00, imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZXN8ZW58MHx8MHx8fDA&auto=format&fit=crop&w=500&q=60' },
    ]
  },
  'r2': {
    name: 'The Pizza Place',
    dishes: [
      { id: 'p1', name: 'Margherita Pizza', description: 'Classic cheese and tomato.', price: 14.00, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emF8ZW58MHx8MHx8fDA&auto=format&fit=crop&w=500&q=60' },
      { id: 'p2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni.', price: 16.50, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVwcGVyb25pJTIwcGl6emF8ZW58MHx8MHx8fDA&auto=format&fit=crop&w=500&q=60' },
    ]
  },
    // Add more restaurant menus as needed
};

type Dish = typeof placeholderRestaurantMenu.r1.dishes[0];

const MenuScreen = () => {
  const { restaurantId } = useParams<{ restaurantId: keyof typeof placeholderRestaurantMenu }>();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isCustomizeSheetOpen, setIsCustomizeSheetOpen] = useState(false);

  console.log('MenuScreen loaded for restaurant ID:', restaurantId);

  const restaurant = restaurantId ? placeholderRestaurantMenu[restaurantId] : null;

  const handleAddToCart = (dishId: string | number) => {
    const dish = restaurant?.dishes.find(d => d.id === dishId);
    console.log('Adding to cart:', dish?.name);
    toast.success(`${dish?.name || 'Item'} added to cart!`);
    // Add actual cart logic here
  };

  const handleCustomize = (dishId: string | number) => {
    const dish = restaurant?.dishes.find(d => d.id === dishId);
    setSelectedDish(dish || null);
    setIsCustomizeSheetOpen(true);
    console.log('Customizing:', dish?.name);
  };

  const handleCustomizationSubmit = () => {
    console.log('Customization submitted for:', selectedDish?.name);
    toast.info(`Customizations for ${selectedDish?.name} applied.`);
    // Add to cart with customizations
    handleAddToCart(selectedDish!.id); // Assuming selectedDish is not null
    setIsCustomizeSheetOpen(false);
  };


  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header showSearch={false} showLocation={false} />
        <main className="flex-grow container mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-semibold">Restaurant not found</h1>
          <p className="text-gray-600">The menu you are looking for does not exist.</p>
        </main>
        <BottomNavigationBar />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header might need a prop to display restaurant name, or we do it below */}
      <Header showSearch={false} showLocation={false} />
      <ScrollArea className="flex-grow mb-16 md:mb-0">
        <main className="container mx-auto px-4 py-6">
          <section className="mb-6">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            {/* Could add restaurant details like address, rating here */}
            <p className="text-gray-500">Explore our delicious dishes below.</p>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {restaurant.dishes.map(dish => (
              <DishCard
                key={dish.id}
                id={dish.id}
                name={dish.name}
                imageUrl={dish.imageUrl}
                description={dish.description}
                price={dish.price}
                onAddToCart={handleAddToCart}
                onCustomize={handleCustomize}
              />
            ))}
          </div>
        </main>
      </ScrollArea>

      {selectedDish && (
        <Sheet open={isCustomizeSheetOpen} onOpenChange={setIsCustomizeSheetOpen}>
          {/* <SheetTrigger asChild>
            // This sheet is triggered programmatically by handleCustomize
          </SheetTrigger> */}
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Customize {selectedDish.name}</SheetTitle>
              <SheetDescription>
                Make it just the way you like it. Price: ${selectedDish.price.toFixed(2)}
              </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-4">
              {/* Example customization options */}
              <div>
                <Label className="text-sm font-medium">Size (Example)</Label>
                <RadioGroup defaultValue="medium" className="mt-1">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="small" id="size-small" /><Label htmlFor="size-small" className="font-normal">Small (+$0.00)</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="medium" id="size-medium" /><Label htmlFor="size-medium" className="font-normal">Medium (+$2.00)</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="large" id="size-large" /><Label htmlFor="size-large" className="font-normal">Large (+$4.00)</Label></div>
                </RadioGroup>
              </div>
              <div>
                <Label className="text-sm font-medium">Extra Toppings (Example)</Label>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center space-x-2"><Checkbox id="topping-cheese" /><Label htmlFor="topping-cheese" className="font-normal">Extra Cheese (+$1.50)</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="topping-bacon" /><Label htmlFor="topping-bacon" className="font-normal">Bacon (+$2.00)</Label></div>
                </div>
              </div>
              <div>
                <Label htmlFor="special-notes" className="text-sm font-medium">Special Instructions</Label>
                <Input id="special-notes" placeholder="e.g., no onions" className="mt-1"/>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setIsCustomizeSheetOpen(false)}>Cancel</Button>
              <Button onClick={handleCustomizationSubmit} className="bg-orange-500 hover:bg-orange-600">Add to Cart with Customizations</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
      <BottomNavigationBar />
    </div>
  );
};

export default MenuScreen;