import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NotesTab({ notes }: { notes: string }) {
  return (
    <div className="space-y-4">
      <Textarea defaultValue={notes} rows={10} />
      <Button>Save Notes</Button>
    </div>
  );
}
