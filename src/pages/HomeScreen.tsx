import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import CategoryChip from '@/components/common/CategoryChip';
import RestaurantCard from '@/components/cards/RestaurantCard';
import Carousel from '@/components/common/Carousel';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { Button } from '@/components/ui/button';
import { Flame, Pizza, Sandwich, Sushi } from 'lucide-react'; // Example icons

const placeholderCategories = [
  { id: 'feat', name: 'Featured', icon: <Flame size={16} /> },
  { id: 'pizza', name: 'Pizza', icon: <Pizza size={16} /> },
  { id: 'burgers', name: 'Burgers', icon: <Sandwich size={16} /> },
  { id: 'sushi', name: 'Sushi', icon: <Sushi size={16} /> },
  { id: 'pasta', name: 'Pasta' },
  { id: 'desserts', name: 'Desserts' },
];

const placeholderRestaurants = [
  { id: 'r1', name: 'Gourmet Burger Kitchen', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Burgers', 'American'], rating: 4.5, deliveryTime: '25-35 min' },
  { id: 'r2', name: 'The Pizza Place', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Pizza', 'Italian'], rating: 4.2, deliveryTime: '30-40 min' },
  { id: 'r3', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Sushi', 'Japanese'], rating: 4.8, deliveryTime: '35-45 min' },
];

const featuredItemsSlides = [
  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=1000&h=400&q=80" alt="Featured Dish 1" className="w-full h-48 md:h-64 object-cover rounded-lg" />,
  <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=1000&h=400&q=80" alt="Featured Dish 2" className="w-full h-48 md:h-64 object-cover rounded-lg" />,
  <div className="bg-orange-500 text-white p-10 rounded-lg flex flex-col items-center justify-center h-48 md:h-64">
    <h3 className="text-2xl font-bold">Special Offer!</h3>
    <p>Get 20% off on all Pizzas today!</p>
    <Button variant="secondary" className="mt-4">Order Now</Button>
  </div>,
];

const HomeScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | number | null>(placeholderCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  console.log('HomeScreen loaded');

  const handleCategoryClick = (id: string | number) => {
    console.log('Category selected:', id);
    setSelectedCategoryId(id);
    // Logic to filter restaurants based on category
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    setSearchQuery(query);
    // Logic to navigate to RestaurantListingScreen with query or filter current view
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} showSearch={true} showLocation={true} initialLocation="New York, NY" />
      <ScrollArea className="flex-grow mb-16 md:mb-0"> {/* mb-16 for bottom nav space on mobile */}
        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Featured Items Carousel */}
          <section aria-labelledby="featured-items-title">
            <h2 id="featured-items-title" className="text-2xl font-semibold mb-3">
              Today's Specials
            </h2>
            <Carousel slides={featuredItemsSlides} options={{ loop: true }} slideClassName="flex-[0_0_100%] md:flex-[0_0_100%]" />
          </section>

          {/* Category Chips */}
          <section aria-labelledby="categories-title">
            <h2 id="categories-title" className="text-2xl font-semibold mb-3">
              Categories
            </h2>
            <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-hide">
              {placeholderCategories.map(category => (
                <CategoryChip
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  isSelected={selectedCategoryId === category.id}
                  onClick={handleCategoryClick}
                  className="flex-shrink-0"
                />
              ))}
            </div>
          </section>

          {/* Restaurant List */}
          <section aria-labelledby="restaurants-title">
            <h2 id="restaurants-title" className="text-2xl font-semibold mb-4">
              Popular Restaurants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {placeholderRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  imageUrl={restaurant.imageUrl}
                  cuisineTypes={restaurant.cuisineTypes}
                  rating={restaurant.rating}
                  deliveryTime={restaurant.deliveryTime}
                  // onClick={(id) => console.log('Restaurant clicked:', id)}
                />
              ))}
            </div>
          </section>
        </main>
      </ScrollArea>
      <BottomNavigationBar />
    </div>
  );
};

export default HomeScreen;