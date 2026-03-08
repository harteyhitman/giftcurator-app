import { Card, CardContent } from '@/components/ui/card';
import { RadioGroupItem } from '@/components/ui/radio-group';

export default function RadioCard({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <label>
      <RadioGroupItem value={value} className="sr-only" />
      <Card className="cursor-pointer">
        <CardContent className="flex items-center justify-center p-6">
          {children}
        </CardContent>
      </Card>
    </label>
  );
}
