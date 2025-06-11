import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Landmark, CircleDollarSign } from 'lucide-react'; // Example icons

interface PaymentMethod {
  id: string;
  type: 'Card' | 'NetBanking' | 'COD';
  details: string; // e.g., "Visa **** 1234" or "Cash on Delivery"
}

interface PaymentMethodSectionProps {
  availableMethods: PaymentMethod[];
  selectedMethodId?: string;
  onSelectMethod: (id: string) => void;
  // onAddNewCard: (cardDetails: any) => void; // For adding new card
}

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  availableMethods,
  selectedMethodId,
  onSelectMethod,
}) => {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  console.log("Rendering PaymentMethodSection. Show add card form:", showAddCardForm);

  const getIcon = (type: PaymentMethod['type']) => {
    if (type === 'Card') return <CreditCard className="mr-2 h-5 w-5 text-blue-500" />;
    if (type === 'NetBanking') return <Landmark className="mr-2 h-5 w-5 text-green-500" />;
    if (type === 'COD') return <CircleDollarSign className="mr-2 h-5 w-5 text-orange-500" />;
    return null;
  };

  // Placeholder for add card form submission
  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Add new card form submitted (placeholder)");
    // onAddNewCard(...);
    setShowAddCardForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedMethodId} onValueChange={onSelectMethod}>
          {availableMethods.map(method => (
            <Label
              key={method.id}
              htmlFor={`payment-${method.id}`}
              className={`flex items-center p-3 border rounded-md cursor-pointer hover:border-orange-400 transition-colors ${selectedMethodId === method.id ? 'border-orange-500 ring-1 ring-orange-500' : ''}`}
            >
              <RadioGroupItem value={method.id} id={`payment-${method.id}`} className="mr-3" />
              {getIcon(method.type)}
              <span className="text-sm">{method.details}</span>
            </Label>
          ))}
        </RadioGroup>

        {!showAddCardForm && availableMethods.some(m => m.type === 'Card') && ( // Only show if card payment is an option
          <Button variant="outline" onClick={() => setShowAddCardForm(true)} className="w-full">
            Add New Card
          </Button>
        )}

        {showAddCardForm && (
           <form onSubmit={handleAddCardSubmit} className="space-y-3 p-4 border rounded-md mt-4">
            <h3 className="text-md font-medium">Add New Credit/Debit Card</h3>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                <Input id="expiryDate" placeholder="MM/YY" required />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="•••" required />
              </div>
            </div>
             <div>
                <Label htmlFor="cardHolderName">Cardholder Name</Label>
                <Input id="cardHolderName" placeholder="Name on card" required />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={() => setShowAddCardForm(false)}>Cancel</Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Save Card</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
export default PaymentMethodSection;