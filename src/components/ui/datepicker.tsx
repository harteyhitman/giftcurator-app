import { DateRange } from 'react-day-picker';
import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  value?: Date | DateRange;
  onChange: (date?: Date | DateRange) => void;
  mode?: 'single' | 'range';
}

export function DatePicker({ value, onChange, mode = 'single' }: DatePickerProps) {
  const displayValue = () => {
    if (mode === 'range' && value instanceof Object && 'from' in value && value.from) {
      if (value.to) {
        return `${format(value.from, 'LLL dd, y')} - ${format(value.to, 'LLL dd, y')}`;
      }
      return format(value.from, 'LLL dd, y');
    }
    if (value instanceof Date) {
      return format(value, 'PPP');
    }
    return <span>Pick a date</span>;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {displayValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode={mode as any}
          selected={value as any}
          onSelect={onChange as any}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
