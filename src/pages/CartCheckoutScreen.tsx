import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import OrderSummaryItem from '@/components/checkout/OrderSummaryItem';
import DeliveryDetailsSection from '@/components/checkout/DeliveryDetailsSection';
import PaymentMethodSection from '@/components/checkout/PaymentMethodSection';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { toast } from "sonner";
import { Separator } from '@/components/ui/separator';

const initialCartItems = [
  { id: 'd1', name: 'Classic Beef Burger', imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60', price: 12.99, quantity: 1, variantInfo: 'Medium rare, extra pickles' },
  { id: 'd4', name: 'Fries', imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZXN8ZW58MHx8MHx8fDA&auto=format&fit=crop&w=100&q=60', price: 4.00, quantity: 2 },
];

type CartItem = typeof initialCartItems[0];

// Placeholder for Address type used by DeliveryDetailsSection (matching its internal type for now)
interface Address { id: string; line1: string; city: string; state: string; zip: string; type: 'Home' | 'Work' | 'Other'; }
const placeholderSavedAddresses: Address[] = [
    { id: 'addr1', type: 'Home', line1: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210' },
    { id: 'addr2', type: 'Work', line1: '456 Business Rd', city: 'Busytown', state: 'NY', zip: '10001' },
];

// Placeholder for PaymentMethod type used by PaymentMethodSection
interface PaymentMethod { id: string; type: 'Card' | 'NetBanking' | 'COD'; details: string; }
const placeholderPaymentMethods: PaymentMethod[] = [
    { id: 'pm1', type: 'Card', details: 'Visa **** 1234' },
    { id: 'pm2', type: 'COD', details: 'Cash on Delivery' },
];


const CartCheckoutScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [currentStep, setCurrentStep] = useState<'summary' | 'delivery' | 'payment'>('summary');
  
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(placeholderSavedAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(placeholderSavedAddresses[0]?.id);

  const [availablePaymentMethods] = useState<PaymentMethod[]>(placeholderPaymentMethods);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | undefined>(placeholderPaymentMethods[0]?.id);

  console.log('CartCheckoutScreen loaded, current step:', currentStep);

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item)).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.error("Item removed from cart.");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Example tax
  const deliveryFee = 5.00; // Example delivery fee
  const total = subtotal + tax + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
        toast.success(`Promo code "${promoCode}" applied! (10% off - FAKE)`);
        // Apply discount logic if real
    } else {
        toast.error(`Invalid promo code: "${promoCode}"`);
    }
  };

  const handleAddNewAddress = (newAddress: Omit<Address, 'id'>) => {
    const newAddrWithId: Address = { ...newAddress, id: `addr${Date.now()}` };
    setSavedAddresses(prev => [...prev, newAddrWithId]);
    setSelectedAddressId(newAddrWithId.id);
    toast.success("New address added and selected!");
  };

  const handlePlaceOrder = () => {
    console.log('Placing order with:', { cartItems, selectedAddressId, selectedPaymentMethodId, total });
    toast.promise(
        new Promise(resolve => setTimeout(resolve, 2000)), {
        loading: 'Placing your order...',
        success: 'Order placed successfully! Your food is on its way.',
        error: 'Failed to place order. Please try again.',
      }
    );
    // Reset cart, navigate to order confirmation/home page etc.
    setCartItems([]);
    setCurrentStep('summary');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header showSearch={false} showLocation={false} />
      <ScrollArea className="flex-grow mb-16 md:mb-0">
        <main className="container mx-auto px-4 py-6 space-y-6">
          <h1 className="text-3xl font-bold">
            {currentStep === 'summary' && "Your Cart"}
            {currentStep === 'delivery' && "Delivery Details"}
            {currentStep === 'payment' && "Payment"}
          </h1>

          {currentStep === 'summary' && (
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  cartItems.map(item => (
                    <OrderSummaryItem
                      key={item.id}
                      {...item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                    />
                  ))
                )}
                 {cartItems.length > 0 && <Separator />}
              </CardContent>
              {cartItems.length > 0 && (
                <CardFooter className="flex flex-col space-y-3">
                  <div className="w-full flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="w-full flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="w-full flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="w-full flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex w-full gap-2 pt-2">
                    <Input 
                        placeholder="Promo Code" 
                        value={promoCode} 
                        onChange={e => setPromoCode(e.target.value)}
                        className="flex-grow"
                    />
                    <Button variant="outline" onClick={handleApplyPromo}>Apply</Button>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full bg-orange-500 hover:bg-orange-600" 
                    onClick={() => setCurrentStep('delivery')}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Delivery
                  </Button>
                </CardFooter>
              )}
            </Card>
          )}

          {currentStep === 'delivery' && (
            <>
              <DeliveryDetailsSection
                savedAddresses={savedAddresses}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
                onAddNewAddress={handleAddNewAddress}
              />
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setCurrentStep('summary')}>Back to Cart</Button>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setCurrentStep('payment')} disabled={!selectedAddressId}>
                    Proceed to Payment
                </Button>
              </div>
            </>
          )}
          
          {currentStep === 'payment' && (
             <>
              <PaymentMethodSection 
                availableMethods={availablePaymentMethods}
                selectedMethodId={selectedPaymentMethodId}
                onSelectMethod={setSelectedPaymentMethodId}
              />
              {/* Final Order Review Summary Mini */}
              <Card className="mt-4">
                <CardHeader><CardTitle>Final Review</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-1">
                    <p>Delivery to: {savedAddresses.find(a => a.id === selectedAddressId)?.line1}</p>
                    <p>Payment via: {availablePaymentMethods.find(p => p.id === selectedPaymentMethodId)?.details}</p>
                    <p className="font-semibold">Total: ${total.toFixed(2)}</p>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setCurrentStep('delivery')}>Back to Delivery</Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={handlePlaceOrder} disabled={!selectedPaymentMethodId}>
                    Place Order
                </Button>
              </div>
            </>
          )}

        </main>
      </ScrollArea>
      <BottomNavigationBar />
    </div>
  );
};

export default CartCheckoutScreen;