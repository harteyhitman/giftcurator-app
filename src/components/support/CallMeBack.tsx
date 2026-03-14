'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { fetcher } from '@/lib/fetcher';

export default function CallMeBack() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    requestId: string;
    preferredTime: string;
    reason: string;
  } | null>(null);
  const [form, setForm] = useState({
    phone: '',
    preferredTime: '',
    reason: '',
  });
  const { data: profile } = useSWR('/api/settings/profile', fetcher);

  useEffect(() => {
    if (profile?.mobileNumber) {
      setForm((current) => ({
        ...current,
        phone: current.phone || profile.mobileNumber,
      }));
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch('/api/support/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message || 'Unable to request callback');
      }

      setConfirmation({
        requestId: body.requestId,
        preferredTime: body.preferredTime,
        reason: body.reason,
      });
      setIsSubmitted(true);
      setCountdown((body.callbackWindowMinutes ?? 15) * 60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsOpen(false);
            setIsSubmitted(false);
            setConfirmation(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      toast.success('Callback request submitted');
    } catch (error: any) {
      toast.error(error.message || 'Unable to request callback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4 rounded-full w-16 h-16">
          <Phone className="w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isSubmitted ? 'Request Received' : 'Request a Callback'}</DialogTitle>
          <DialogDescription>
            {isSubmitted
              ? 'Your callback request has been recorded and support will reach out within the response window.'
              : 'Share your phone number and preferred time so support can contact you.'}
          </DialogDescription>
        </DialogHeader>
        {isSubmitted ? (
          <div className="text-center space-y-4">
            <p>Thank you! Your callback request is in the queue.</p>
            <p className="text-2xl font-bold">{formatTime(countdown)}</p>
            {confirmation && (
              <div className="rounded-2xl bg-primary/[0.03] p-4 text-left text-sm text-muted-foreground">
                <p><span className="font-semibold text-foreground">Request ID:</span> {confirmation.requestId}</p>
                <p><span className="font-semibold text-foreground">Preferred time:</span> {confirmation.preferredTime}</p>
                <p><span className="font-semibold text-foreground">Reason:</span> {confirmation.reason}</p>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="callback-phone">Phone number</Label>
              <Input
                id="callback-phone"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="callback-time">Preferred time</Label>
              <Input
                id="callback-time"
                type="text"
                placeholder="Preferred Time (e.g., 3-5 PM EST)"
                value={form.preferredTime}
                onChange={(event) => setForm((current) => ({ ...current, preferredTime: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="callback-reason">Reason</Label>
              <Textarea
                id="callback-reason"
                placeholder="Tell support what you need help with"
                value={form.reason}
                onChange={(event) => setForm((current) => ({ ...current, reason: event.target.value }))}
                rows={4}
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Request Callback'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
