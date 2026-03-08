'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaymentMethods, BillingHistory, AddPaymentMethodWrapper } from './';

export default function PaymentMethodManagement() {
  return (
    <Tabs defaultValue="payment-methods">
      <TabsList>
        <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        <TabsTrigger value="add-method">Add Method</TabsTrigger>
        <TabsTrigger value="billing-history">Billing History</TabsTrigger>
      </TabsList>
      <TabsContent value="payment-methods">
        <PaymentMethods />
      </TabsContent>
      <TabsContent value="add-method">
        <AddPaymentMethodWrapper />
      </TabsContent>
      <TabsContent value="billing-history">
        <BillingHistory />
      </TabsContent>
    </Tabs>
  );
}
