import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AddressCard from '@/components/cards/AddressCard';
import OrderHistoryTable from '@/components/profile/OrderHistoryTable';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, CreditCard, ShoppingBag, Edit3, LogOut } from 'lucide-react';


// Address type matches AddressCard and DeliveryDetailsSection
interface Address { id: string | number; type: 'Home' | 'Work' | 'Other'; line1: string; line2?: string; city: string; state: string; zip: string; isDefault?: boolean; }
const placeholderAddresses: Address[] = [
  { id: 'addr1', type: 'Home', line1: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210', isDefault: true },
  { id: 'addr2', type: 'Work', line1: '456 Business Rd', city: 'Busytown', state: 'NY', zip: '10001' },
];

// Order type matches OrderHistoryTable
interface OrderItem { id: string; productName: string; quantity: number; price: number; }
interface Order { id: string; orderDate: string; status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'; totalAmount: number; items: OrderItem[]; }
const placeholderOrders: Order[] = [
  { id: 'ord123xyz', orderDate: '2023-10-26', status: 'Delivered', totalAmount: 35.50, items: [{id: 'p1', productName: 'Pizza', quantity: 1, price: 20}, {id: 'd1', productName: 'Coke', quantity:2, price: 2.75}] },
  { id: 'ord456abc', orderDate: '2023-10-28', status: 'Processing', totalAmount: 22.00, items: [{id: 'b1', productName: 'Burger', quantity: 2, price: 11}] },
];


const UserProfileScreen = () => {
  const [userName, setUserName] = useState('John Doe');
  const [userEmail, setUserEmail] = useState('john.doe@example.com');
  const [userPhone, setUserPhone] = useState('555-123-4567');
  const [addresses, setAddresses] = useState<Address[]>(placeholderAddresses);
  const [orders] = useState<Order[]>(placeholderOrders);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  console.log('UserProfileScreen loaded');

  const handleSaveProfile = () => {
    console.log('Profile saved:', { userName, userEmail, userPhone });
    toast.success("Profile updated successfully!");
    setIsEditingProfile(false);
  };

  const handleAddAddress = () => {
    // Placeholder: In a real app, this would open a form/modal
    const newAddress: Address = {
      id: `addr${Date.now()}`,
      type: 'Other',
      line1: 'New Address Line 1',
      city: 'New City',
      state: 'NS',
      zip: '00000',
    };
    setAddresses(prev => [...prev, newAddress]);
    toast.info("New address form placeholder (added dummy address).");
  };

  const handleEditAddress = (id: string | number) => {
    toast.info(`Editing address ${id} (placeholder).`);
  };
  const handleDeleteAddress = (id: string | number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast.error(`Address ${id} deleted.`);
  };

  const handleViewOrderDetails = (orderId: string) => {
    toast.info(`Viewing details for order ${orderId} (placeholder).`);
    // Navigate to specific order detail page or show modal
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header showSearch={false} showLocation={false} />
      <ScrollArea className="flex-grow mb-16 md:mb-0">
        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Profile Header */}
          <section className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-gray-50 rounded-lg shadow">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA&auto=format&fit=crop&w=100&q=60" alt={userName} />
              <AvatarFallback>{userName.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold">{userName}</h1>
              <p className="text-gray-600">{userEmail}</p>
              <p className="text-gray-500 text-sm">{userPhone}</p>
            </div>
            <Button variant="outline" size="icon" className="sm:ml-auto" onClick={() => setIsEditingProfile(prev => !prev)}>
                <Edit3 size={18}/>
                <span className="sr-only">Edit Profile</span>
            </Button>
          </section>

          {/* Profile Information Form (Editable) */}
          {isEditingProfile && (
            <Card>
              <CardHeader><CardTitle>Edit Profile Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="userName">Full Name</Label>
                  <Input id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email Address</Label>
                  <Input id="userEmail" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="userPhone">Phone Number</Label>
                  <Input id="userPhone" type="tel" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Saved Addresses Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center"><MapPin size={20} className="mr-2 text-orange-500"/> Saved Addresses</CardTitle>
              <Button variant="outline" size="sm" onClick={handleAddAddress}>Add New</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {addresses.length > 0 ? addresses.map(addr => (
                <AddressCard 
                  key={addr.id} 
                  address={addr} 
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                  showActions={true}
                />
              )) : <p className="text-sm text-gray-500">No saved addresses.</p>}
            </CardContent>
          </Card>

          {/* Payment Methods Section (Placeholder) */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center"><CreditCard size={20} className="mr-2 text-orange-500"/>Payment Methods</CardTitle>
               <Button variant="outline" size="sm" onClick={() => toast.info("Add payment method form placeholder.")}>Add New</Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">You have 1 saved card: Visa **** 1234 (Placeholder).</p>
              {/* List saved payment methods here */}
            </CardContent>
          </Card>


          {/* Order History Section */}
          <Card>
            <CardHeader><CardTitle className="flex items-center"><ShoppingBag size={20} className="mr-2 text-orange-500"/>Order History</CardTitle></CardHeader>
            <CardContent>
              <OrderHistoryTable orders={orders} onViewOrderDetails={handleViewOrderDetails} />
            </CardContent>
          </Card>

          {/* Logout Button */}
           <div className="mt-8 text-center">
                <Button variant="destructive" onClick={() => toast.info("Logout functionality placeholder.")}>
                    <LogOut size={16} className="mr-2" /> Logout
                </Button>
            </div>

        </main>
      </ScrollArea>
      <BottomNavigationBar />
    </div>
  );
};

export default UserProfileScreen;