'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Brush } from 'recharts';

export default function EventsPerMonthChart({ data }: { data: any[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (chartRef.current) {
      toPng(chartRef.current).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'events-per-month.png';
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Events Per Month</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleDownload}>
          <Download className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200} ref={chartRef}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#8884d8" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
