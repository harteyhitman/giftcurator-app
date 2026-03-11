import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card className="rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black">{value}</div>
        {trend && (
          <p
            className={cn(
              'text-xs text-muted-foreground',
              trend > 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            {trend > 0 ? '+' : ''}
            {trend.toFixed(1)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
