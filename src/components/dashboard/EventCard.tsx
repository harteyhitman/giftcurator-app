import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Cake, Gift, ShoppingCart } from 'lucide-react';

interface EventCardProps {
  eventName: string;
  eventType: string;
  beneficiaryName: string;
  daysRemaining: number;
  progress: number;
}

export default function EventCard({ eventName, eventType, beneficiaryName, daysRemaining, progress }: EventCardProps) {
  const getEventIcon = () => {
    switch (eventType) {
      case 'Birthday':
        return <Cake className="w-5 h-5" />;
      case 'Wedding':
        return <Gift className="w-5 h-5" />;
      case 'Anniversary':
        return <Gift className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{eventName}</CardTitle>
          {getEventIcon()}
        </div>
        <p className="text-sm text-muted-foreground">{beneficiaryName}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm">Days Remaining</p>
          <p className="text-sm font-bold">{daysRemaining}</p>
        </div>
        <Progress value={progress * 100} className="mt-2" />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Select Gift
        </Button>
        <Button size="sm">View Event</Button>
      </CardFooter>
    </Card>
  );
}
