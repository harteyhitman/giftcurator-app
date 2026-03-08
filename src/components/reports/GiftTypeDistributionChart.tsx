'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function GiftTypeDistributionChart({ data }: { data: any[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (chartRef.current) {
      toPng(chartRef.current).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'gift-type-distribution.png';
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gift Type Distribution</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleDownload}>
          <Download className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200} ref={chartRef}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
