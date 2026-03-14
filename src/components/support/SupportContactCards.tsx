'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock3, MessageCircleMore, Phone } from 'lucide-react';

export default function SupportContactCards() {
  return (
    <div className="space-y-4">
      <Card className="rounded-3xl border-primary/10">
        <CardHeader>
          <CardTitle>Support Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <MessageCircleMore className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold">In-app support chat</p>
              <p className="text-sm text-muted-foreground">
                Best for quick answers about beneficiaries, events, reports, subscriptions, and settings.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold">Request a callback</p>
              <p className="text-sm text-muted-foreground">
                Use the callback option for billing help, account access issues, or delivery escalation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-3xl border-primary/10">
        <CardHeader>
          <CardTitle>Response Window</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Monday to Friday</p>
              <p className="text-muted-foreground">9:00 AM - 5:00 PM EST</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            The support workspace is designed to handle account questions, notification preferences, subscription reviews, and gifting workflow guidance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
