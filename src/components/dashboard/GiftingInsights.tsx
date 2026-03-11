'use client';

import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const COLORS = ['#6d28d9', '#d97706', '#4c1d95', '#fbbf24'];

export default function GiftingInsights() {
  const { data, error } = useSWR('/api/dashboard/insights', fetcher);

  if (error) return <div className="p-4 text-red-500">Failed to load insights</div>;
  if (!data) return <Skeleton className="h-80 w-full rounded-3xl" />;

  return (
    <Card className="rounded-3xl border-primary/5 shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-black">Gifting Insights</CardTitle>
        <p className="text-sm text-muted-foreground font-medium">Monthly distribution of activities</p>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '1rem', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                }} 
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
