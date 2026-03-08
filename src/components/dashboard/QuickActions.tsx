import { Button } from '@/components/ui/button';
import { Plus, Calendar, Gift } from 'lucide-react';
import Link from 'next/link';

export default function QuickActions() {
  return (
    <div>
      <div className="hidden sm:flex items-center gap-4">
        <Link href="/beneficiaries/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Beneficiary
          </Button>
        </Link>
        <Link href="/events/new">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
        <Button variant="outline">
          <Gift className="w-4 h-4 mr-2" />
          Send Gift
        </Button>
      </div>
      <div className="sm:hidden fixed bottom-4 right-4">
        <Button size="icon" className="rounded-full h-14 w-14">
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
