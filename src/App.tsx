import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreen from "./pages/HomeScreen";
import RestaurantListingScreen from "./pages/RestaurantListingScreen";
import MenuScreen from "./pages/MenuScreen";
import CartCheckoutScreen from "./pages/CartCheckoutScreen";
import UserProfileScreen from "./pages/UserProfileScreen";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* For shadcn/ui Toasts */}
      <Sonner position="top-right" richColors /> {/* For Sonner notifications */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/restaurants" element={<RestaurantListingScreen />} />
          <Route path="/menu/:restaurantId" element={<MenuScreen />} />
          <Route path="/cart-checkout" element={<CartCheckoutScreen />} />
          <Route path="/profile" element={<UserProfileScreen />} />
          {/* The BottomNavigationBar links to /orders, typically part of UserProfile or a dedicated page */}
          {/* For now, /orders might redirect or be handled by UserProfileScreen's OrderHistoryTable */}
          {/* If a dedicated /orders page is needed, it would be: <Route path="/orders" element={<OrdersScreen />} /> */}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;