import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function EventDetailModal({ event, open, onOpenChange }: { event: any; open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div>
          <p>Date: {new Date(event.start).toLocaleDateString()}</p>
          {/* Add more event details and quick actions here */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
