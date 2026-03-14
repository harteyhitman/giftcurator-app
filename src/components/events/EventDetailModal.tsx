import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Gift, UserRound } from 'lucide-react';

export default function EventDetailModal({ event, open, onOpenChange }: { event: any; open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            A focused view of the event details tied to your gifting schedule.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full capitalize">
              {event.type}
            </Badge>
            <Badge variant="outline" className="rounded-full">
              {(event.gifts ?? []).length} linked gift{(event.gifts ?? []).length === 1 ? '' : 's'}
            </Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-primary/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <CalendarDays className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Date</span>
              </div>
              <p className="font-semibold">
                {new Date(event.date).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <UserRound className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Beneficiary</span>
              </div>
              <p className="font-semibold">
                {event.beneficiary
                  ? `${event.beneficiary.firstName} ${event.beneficiary.lastName}`
                  : 'Not linked'}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-primary/15 p-4">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Gift className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Planning status</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This event is now part of your live calendar and beneficiary workflow. Add gifts next to turn this into a complete gifting plan.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
