import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, User, ListOrdered, Heart } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/orders', label: 'Orders', icon: ListOrdered },
  // { path: '/favorites', label: 'Favorites', icon: Heart }, // Example
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/profile', label: 'Profile', icon: User },
];

const BottomNavigationBar: React.FC = () => {
  const location = useLocation();
  console.log("Rendering BottomNavigationBar, current path:", location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-top z-40 md:hidden">
      <div className="container mx-auto px-2">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <li key={item.path} className="flex-1 text-center">
                <Link
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200",
                    isActive ? "text-orange-500" : "text-gray-600 hover:text-orange-400"
                  )}
                >
                  <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={cn("text-xs mt-0.5", isActive ? "font-semibold" : "font-normal")}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
export default BottomNavigationBar;