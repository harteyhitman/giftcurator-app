'use client';

import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const COLORS = ['#6d28d9', '#d97706', '#4c1d95', '#fbbf24'];

export default function GiftingInsights() {
  const { data, error } = useSWR('/api/dashboard/insights', fetcher);

  if (error) return <div className="p-4 text-muted-foreground text-sm">Failed to load insights</div>;
  if (!data) return <Skeleton className="h-80 w-full rounded-3xl" />;

  const list = Array.isArray(data) ? data : [];
  const total = list.reduce((sum: number, item: { value?: number }) => sum + (Number(item?.value) || 0), 0);
  let currentAngle = 0;
  const gradient = total
    ? `conic-gradient(${list
        .map((item: { value?: number }, index: number) => {
          const val = Number(item?.value) || 0;
          const angle = (val / total) * 360;
          const segment = `${COLORS[index % COLORS.length]} ${currentAngle}deg ${currentAngle + angle}deg`;
          currentAngle += angle;
          return segment;
        })
        .join(', ')})`
    : 'conic-gradient(#e5e7eb 0deg 360deg)';

  return (
    <Card className="rounded-3xl border-primary/5 shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-black">Gifting Insights</CardTitle>
        <p className="text-sm text-muted-foreground font-medium">Monthly distribution of activities</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8 lg:flex-cols-[18rem_1fr] lg:items-center">
          <div className="flex justify-center">
            <div
              className="relative flex h-72 w-72 items-center justify-center rounded-full"
              style={{ background: gradient }}
            >
              <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-background shadow-inner">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Total
                </span>
                <span className="text-4xl font-black text-foreground">{total}</span>
                <span className="text-sm text-muted-foreground">tracked activities</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            {list.map((item: { name?: string; value?: number }, index: number) => {
              const val = Number(item?.value) || 0;
              const percentage = total ? Math.round((val / total) * 100) : 0;
              const name = item?.name ?? `Item ${index + 1}`;

              return (
                <div key={name} className="rounded-2xl border border-primary/10 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <p className="font-semibold">{name}</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      {percentage}%
                    </Badge>
                  </div>
                  <div className="mb-2 h-2 overflow-hidden rounded-full bg-primary/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{val} activities recorded</p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
