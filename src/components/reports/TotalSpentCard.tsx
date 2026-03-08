import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function TotalSpentCard({ data }: { data: { amount: number; trend: number } }) {
  const trendColor = data.trend > 0 ? 'text-green-500' : 'text-red-500';
  const TrendIcon = data.trend > 0 ? ArrowUp : ArrowDown;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">${data.amount.toFixed(2)}</div>
        <div className={`flex items-center ${trendColor}`}>
          <TrendIcon className="w-4 h-4 mr-1" />
          <span>{(data.trend * 100).toFixed(0)}% from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
