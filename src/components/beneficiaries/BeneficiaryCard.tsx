import { motion } from 'framer-motion';
import { startOfDay } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function BeneficiaryCard({ beneficiary }: { beneficiary: any }) {
  const name = beneficiary.firstName && beneficiary.lastName 
    ? `${beneficiary.firstName} ${beneficiary.lastName}`
    : beneficiary.name || 'Unknown';
  const today = startOfDay(new Date()).getTime();
  const upcomingEvents = (beneficiary.events ?? []).filter(
    (event: any) => new Date(event.date).getTime() >= today
  );
  const nextEvent = [...upcomingEvents].sort(
    (first: any, second: any) =>
      new Date(first.date).getTime() - new Date(second.date).getTime()
  )[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="rounded-3xl border-primary/5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group overflow-hidden h-full flex flex-col bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-primary/10 group-hover:border-primary/30 transition-colors">
                <AvatarImage src={beneficiary.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                  {name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-secondary text-secondary-foreground rounded-full p-1 shadow-lg">
                <Heart className="w-3 h-3 fill-current" />
              </div>
            </div>
            <div className="flex flex-col">
              <CardTitle className="text-xl font-black group-hover:text-primary transition-colors line-clamp-1">
                {name}
              </CardTitle>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {beneficiary.relationship || 'Contact'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {beneficiary.relationship || 'Contact'}
            </Badge>
            <Badge variant="outline" className="rounded-full px-3 py-1">
              {upcomingEvents.length} upcoming event{upcomingEvents.length === 1 ? '' : 's'}
            </Badge>
          </div>
          {beneficiary.dob && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span>{new Date(beneficiary.dob).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
          )}
          <div className="rounded-2xl bg-primary/[0.03] p-4">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Next Moment</span>
            </div>
            <p className="font-semibold">
              {nextEvent ? nextEvent.title : 'No event scheduled yet'}
            </p>
            <p className="text-sm text-muted-foreground">
              {nextEvent
                ? new Date(nextEvent.date).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Create an event to keep gifting plans on track.'}
            </p>
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t border-primary/5 bg-primary/[0.02]">
          <Button variant="ghost" className="w-full justify-between font-bold hover:bg-primary hover:text-primary-foreground group/btn rounded-xl transition-all" asChild>
            <Link href={`/beneficiaries/${beneficiary.id}`}>
              View Profile
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
