import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Assuming AddressCard is available for listing existing addresses
// import AddressCard from '../cards/AddressCard'; 

// Dummy Address type for now
interface Address { id: string; line1: string; city: string; state: string; zip: string; type: 'Home' | 'Work' | 'Other'; }

interface DeliveryDetailsSectionProps {
  savedAddresses: Address[];
  selectedAddressId?: string;
  onSelectAddress: (id: string) => void;
  onAddNewAddress: (address: Omit<Address, 'id'>) => void; // Simplified, form handling would be more robust
}

const DeliveryDetailsSection: React.FC<DeliveryDetailsSectionProps> = ({
  // savedAddresses,
  // selectedAddressId,
  // onSelectAddress,
  onAddNewAddress,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  // Simple form state, in a real app use react-hook-form
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  console.log("Rendering DeliveryDetailsSection. Show add form:", showAddForm);

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Omit<Address, 'id'> = { line1, city, state, zip, type: 'Other' }; // Type is placeholder
    console.log("Submitting new address:", newAddress);
    onAddNewAddress(newAddress);
    // Reset form and hide
    setLine1(''); setCity(''); setState(''); setZip('');
    setShowAddForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 
        // TODO: Integrate AddressCard listing here
        {savedAddresses.map(addr => (
          <AddressCard 
            key={addr.id} 
            address={addr} 
            isSelected={selectedAddressId === addr.id}
            onSelect={() => onSelectAddress(addr.id)}
            showActions={false} // Typically no edit/delete in checkout flow
          />
        ))}
        */}
        <p className="text-sm text-gray-500">Address listing placeholder. Click below to add a new address.</p>
        
        {!showAddForm && (
          <Button variant="outline" onClick={() => setShowAddForm(true)} className="w-full">
            Add New Address
          </Button>
        )}

        {showAddForm && (
          <form onSubmit={handleAddAddressSubmit} className="space-y-3 p-4 border rounded-md">
            <h3 className="text-md font-medium">Add New Delivery Address</h3>
            <div>
              <Label htmlFor="line1">Address Line 1</Label>
              <Input id="line1" value={line1} onChange={e => setLine1(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={city} onChange={e => setCity(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" value={state} onChange={e => setState(e.target.value)} required />
              </div>
            </div>
            <div>
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" value={zip} onChange={e => setZip(e.target.value)} required />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Save Address</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
export default DeliveryDetailsSection;