'use client';

import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EventStep4({ prevStep }: { prevStep: () => void }) {
  const { getValues } = useFormContext();

  const values = getValues();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Review Your Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Event Details</h3>
            <p>Name: {values.eventName}</p>
            <p>Date: {values.eventDate?.toLocaleDateString()}</p>
            <p>Frequency: {values.eventFrequency}</p>
            <p>Type: {values.eventType}</p>
          </div>
          <div>
            <h3 className="font-semibold">Beneficiary & Budget</h3>
            <p>Beneficiary: {values.beneficiary}</p>
            <p>Max Amount: ${values.maxAmount}</p>
            <p>Special Message: {values.specialMessage}</p>
          </div>
          <div>
            <h3 className="font-semibold">Gift Preferences</h3>
            <p>Buy Card: {values.buyCard ? 'Yes' : 'No'}</p>
            <p>Gift Type: {values.giftType}</p>
            <p>Personalize Gift: {values.personalizeGift ? 'Yes' : 'No'}</p>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button variant="outline" onClick={prevStep}>Previous</Button>
        <Button type="submit">Create Event</Button>
      </div>
    </div>
  );
}
