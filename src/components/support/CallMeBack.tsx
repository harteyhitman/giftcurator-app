'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Phone } from 'lucide-react';

export default function CallMeBack() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setCountdown(15 * 60); // 15 minutes in seconds

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsOpen(false);
          setIsSubmitted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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
        </DialogHeader>
        {isSubmitted ? (
          <div className="text-center space-y-4">
            <p>Thank you! You will receive a call from our team shortly.</p>
            <p className="text-2xl font-bold">{formatTime(countdown)}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="tel" placeholder="Phone Number" required />
            <Input type="text" placeholder="Preferred Time (e.g., 3-5 PM EST)" />
            <Button type="submit" className="w-full">
              Request Callback
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
