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
    <Card className="rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-all group overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-xl group-hover:scale-110 transition-transform ${eventType === 'Birthday' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
            {getEventIcon()}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{eventType}</span>
        </div>
        <CardTitle className="text-xl font-black group-hover:text-primary transition-colors">{eventName}</CardTitle>
        <p className="text-sm font-medium text-muted-foreground">{beneficiaryName}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Status</p>
            <p className="text-sm font-black text-primary">{daysRemaining} days left</p>
          </div>
          <Progress value={progress * 100} className="h-2 rounded-full bg-primary/10" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-3 pt-4 border-t border-primary/5 bg-primary/5">
        <Button variant="ghost" size="sm" className="font-bold hover:bg-white hover:text-primary transition-all">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Gift
        </Button>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/10 transition-all hover:scale-105">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
