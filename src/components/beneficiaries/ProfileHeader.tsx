import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
}

export default function ProfileHeader({ firstName, lastName }: ProfileHeaderProps) {
  const getInitials = () => {
    return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarFallback className="text-4xl">{getInitials()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{`${firstName} ${lastName}`}</h1>
        </div>
      </div>
      <Button variant="outline">
        <Pencil className="w-4 h-4 mr-2" />
        Edit
      </Button>
    </div>
  );
}
