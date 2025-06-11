import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import RestaurantCard from '@/components/cards/RestaurantCard';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Filter, Search } from 'lucide-react';

const placeholderRestaurants = [
  { id: 'r1', name: 'Pizza Heaven', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Pizza', 'Italian'], rating: 4.2, deliveryTime: '30-40 min' },
  { id: 'r2', name: 'Super Slice', imageUrl: 'https://images.unsplash.com/photo-1593504049358-743307ef45e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emElMjBzbGljZXxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Pizza'], rating: 4.0, deliveryTime: '25-35 min' },
  { id: 'r3', name: 'Cheesy Bites', imageUrl: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Pizza', 'Fast Food'], rating: 3.8, deliveryTime: '30-40 min' },
  { id: 'r4', name: 'Italiano Originale', imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Pizza', 'Italian', 'Pasta'], rating: 4.6, deliveryTime: '40-50 min' },
];

const RestaurantListingScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ rating: 0, priceRange: [0, 50], deliveryTime: 'any' });
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  console.log('RestaurantListingScreen loaded');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
    setIsFilterDialogOpen(false);
    // Add logic to filter restaurants based on 'filters' state
  };

  // Filtered restaurants based on searchQuery (simple client-side filter for example)
  const displayedRestaurants = placeholderRestaurants.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisineTypes.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={setSearchQuery} showSearch={true} showLocation={false} />
      <ScrollArea className="flex-grow mb-16 md:mb-0">
        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
            <h1 className="text-2xl font-semibold">Restaurants</h1> {/* Could be dynamic based on search/filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Search input for mobile/smaller screens if header search is minimal */}
              {/* <div className="relative flex-grow sm:hidden">
                <Input 
                  type="search" 
                  placeholder="Search restaurants..." 
                  value={searchQuery} 
                  onChange={handleSearchChange}
                  className="pl-8"
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div> */}
              <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter size={16} className="mr-2" /> Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Filter Restaurants</DialogTitle>
                    <DialogDescription>
                      Adjust your preferences to find the perfect meal.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="rating" className="text-sm font-medium">Minimum Rating: {filters.rating || 'Any'}</Label>
                      <Slider
                        id="rating"
                        min={0} max={5} step={0.5}
                        defaultValue={[filters.rating]}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value[0] }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Cuisine Types (Example)</Label>
                      <div className="mt-2 space-y-1">
                        {['Italian', 'Mexican', 'Chinese', 'Indian'].map(cuisine => (
                          <div key={cuisine} className="flex items-center space-x-2">
                            <Checkbox id={`cuisine-${cuisine}`} />
                            <Label htmlFor={`cuisine-${cuisine}`} className="font-normal">{cuisine}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Sort By (Example)</Label>
                      <RadioGroup defaultValue="relevance" className="mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="relevance" id="sort-relevance" /><Label htmlFor="sort-relevance" className="font-normal">Relevance</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="rating" id="sort-rating" /><Label htmlFor="sort-rating" className="font-normal">Rating</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="delivery" id="sort-delivery" /><Label htmlFor="sort-delivery" className="font-normal">Delivery Time</Label></div>
                      </RadioGroup>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsFilterDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleApplyFilters} className="bg-orange-500 hover:bg-orange-600">Apply Filters</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {displayedRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  imageUrl={restaurant.imageUrl}
                  cuisineTypes={restaurant.cuisineTypes}
                  rating={restaurant.rating}
                  deliveryTime={restaurant.deliveryTime}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">No restaurants found matching your criteria.</p>
              {searchQuery && <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>}
            </div>
          )}
        </main>
      </ScrollArea>
      <BottomNavigationBar />
    </div>
  );
};

export default RestaurantListingScreen;