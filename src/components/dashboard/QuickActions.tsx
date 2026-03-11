import { Button } from '@/components/ui/button';
import { Plus, Calendar, Gift } from 'lucide-react';
import Link from 'next/link';

export default function QuickActions() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/beneficiaries/new" className="hidden sm:block">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/10 h-12 px-6 transition-all hover:scale-105">
          <Plus className="w-5 h-5 mr-2" />
          Add Beneficiary
        </Button>
      </Link>
      <Link href="/events/new" className="hidden sm:block">
        <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/5 font-bold rounded-xl h-12 px-6 transition-all hover:scale-105">
          <Calendar className="w-5 h-5 mr-2" />
          Create Event
        </Button>
      </Link>
      <div className="sm:hidden fixed bottom-6 right-6 z-50">
        <Button size="icon" className="rounded-2xl h-16 w-16 bg-primary shadow-2xl shadow-primary/40 hover:scale-110 transition-all">
          <Plus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
