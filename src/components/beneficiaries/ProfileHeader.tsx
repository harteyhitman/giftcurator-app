import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, HeartHandshake, Sparkles } from 'lucide-react';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  relationship: string;
  dob: string;
  upcomingEventCount: number;
}

export default function ProfileHeader({
  firstName,
  lastName,
  relationship,
  dob,
  upcomingEventCount,
}: ProfileHeaderProps) {
  const getInitials = () => {
    return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <div className="rounded-3xl border border-primary/10 bg-card/80 p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24 border-4 border-primary/10">
            <AvatarFallback className="bg-primary/10 text-4xl font-black text-primary">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-3">
            <div>
              <h1 className="text-3xl font-black tracking-tight">{`${firstName} ${lastName}`}</h1>
              <p className="text-muted-foreground">
                A polished beneficiary profile for upcoming gifting moments.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                <HeartHandshake className="mr-2 h-3.5 w-3.5" />
                {relationship}
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                <CalendarDays className="mr-2 h-3.5 w-3.5" />
                {new Date(dob).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                })}
              </Badge>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-primary/[0.03] p-5 lg:min-w-64">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Next Steps</span>
          </div>
          <p className="text-3xl font-black">{upcomingEventCount}</p>
          <p className="text-sm text-muted-foreground">
            upcoming event{upcomingEventCount === 1 ? '' : 's'} linked to this profile
          </p>
        </div>
      </div>
    </div>
  );
}
