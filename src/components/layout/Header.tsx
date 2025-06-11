import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  showSearch?: boolean;
  showLocation?: boolean;
  initialLocation?: string;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  showSearch = true,
  showLocation = true,
  initialLocation = "New York, USA",
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(initialLocation);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log("Rendering Header. Mobile menu open:", isMobileMenuOpen);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
    onSearch?.(searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo and Location */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500 mr-4">
              FoodApp
            </Link>
            {showLocation && (
              <div className="hidden md:flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-1 text-orange-500" />
                <span>{location}</span>
                {/* Add functionality to change location if needed */}
              </div>
            )}
          </div>

          {/* Center Section: Search (Desktop) */}
          {showSearch && (
            <div className="hidden md:flex flex-grow max-w-xl mx-4">
              <form onSubmit={handleSearchSubmit} className="w-full flex">
                <Input
                  type="search"
                  placeholder="Search restaurants or dishes..."
                  className="rounded-r-none focus:ring-orange-500 focus:border-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="rounded-l-none bg-orange-500 hover:bg-orange-600">
                  <Search size={20} />
                </Button>
              </form>
            </div>
          )}

          {/* Right Section: User Profile and Mobile Menu Toggle */}
          <div className="flex items-center">
            <Link to="/profile" className="hidden md:block">
              <Button variant="ghost" size="icon">
                <User size={24} className="text-gray-700" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu & Search */}
        {isMobileMenuOpen && (
          <div className="mt-3 md:hidden space-y-3">
            {showSearch && (
              <form onSubmit={handleSearchSubmit} className="w-full flex">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="rounded-r-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="rounded-l-none bg-orange-500 hover:bg-orange-600">
                  <Search size={20} />
                </Button>
              </form>
            )}
            {showLocation && (
              <div className="flex items-center text-sm text-gray-600 py-2 border-t border-b">
                <MapPin size={16} className="mr-1 text-orange-500" />
                <span>{location}</span>
              </div>
            )}
            <nav className="flex flex-col space-y-2">
              <Link to="/profile" className="py-2 hover:text-orange-500" onClick={toggleMobileMenu}>Profile</Link>
              {/* Add other mobile navigation links here */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;