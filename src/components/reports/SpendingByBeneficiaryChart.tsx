'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function SpendingByBeneficiaryChart({ data }: { data: any[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (chartRef.current) {
      toPng(chartRef.current).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'spending-by-beneficiary.png';
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Spending by Beneficiary</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleDownload}>
          <Download className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200} ref={chartRef}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
