import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react'; // For view details icon

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderDate: string; // e.g., "2023-10-26"
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  items: OrderItem[]; // Could be a summary like "3 items" or actual list
}

interface OrderHistoryTableProps {
  orders: Order[];
  onViewOrderDetails: (orderId: string) => void;
}

const OrderHistoryTable: React.FC<OrderHistoryTableProps> = ({ orders, onViewOrderDetails }) => {
  console.log("Rendering OrderHistoryTable with", orders.length, "orders.");

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'Pending': return 'default';
      case 'Processing': return 'secondary';
      case 'Shipped': return 'outline';
      case 'Cancelled': return 'destructive';
      default: return 'default';
    }
  };

  if (orders.length === 0) {
    return <p className="text-center text-gray-500 py-8">You have no past orders.</p>;
  }

  return (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-center">Items</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium truncate" title={order.id}>#{order.id.substring(0,8)}...</TableCell>
            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge variant={getStatusBadgeVariant(order.status) as any}>{order.status}</Badge>
            </TableCell>
            <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
            <TableCell className="text-center">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
            <TableCell className="text-center">
              <Button variant="ghost" size="icon" onClick={() => onViewOrderDetails(order.id)} title="View Details">
                <Eye size={18} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default OrderHistoryTable;