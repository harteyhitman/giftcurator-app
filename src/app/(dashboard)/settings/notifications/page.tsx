'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BellRing, MoonStar } from 'lucide-react';
import { toast } from 'sonner';

import { usePushNotifications } from '@/hooks/usePushNotifications';

const STORAGE_KEY = 'giftcurator-notification-preferences';

export default function NotificationPreferencesPage() {
  const { subscription, subscribe, error } = usePushNotifications();
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    marketing: false,
    reminders: true,
    quietStart: '22:00',
    quietEnd: '08:00',
  });

  useEffect(() => {
    const savedPreferences = window.localStorage.getItem(STORAGE_KEY);

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const savePreferences = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    toast.success('Notification preferences saved');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight">Notification Preferences</h1>
        <p className="text-muted-foreground">
          Control how GiftCurator reaches you about reminders, events, and important account activity.
        </p>
      </div>
      <Card className="rounded-3xl border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-black">
            <BellRing className="h-5 w-5 text-primary" />
            Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive reminders, updates, and account alerts by email.</p>
            </div>
            <Switch
              checked={preferences.email}
              onCheckedChange={(value) => setPreferences((current) => ({ ...current, email: value }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive urgent event reminders by SMS.</p>
            </div>
            <Switch
              checked={preferences.sms}
              onCheckedChange={(value) => setPreferences((current) => ({ ...current, sms: value }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Smart reminder digests</p>
              <p className="text-sm text-gray-500">Bundle upcoming occasions into a neat summary.</p>
            </div>
            <Switch
              checked={preferences.reminders}
              onCheckedChange={(value) => setPreferences((current) => ({ ...current, reminders: value }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Product updates</p>
              <p className="text-sm text-gray-500">Receive release notes, feature drops, and gifting tips.</p>
            </div>
            <Switch
              checked={preferences.marketing}
              onCheckedChange={(value) => setPreferences((current) => ({ ...current, marketing: value }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Push Notifications</p>
              <p className="text-sm text-gray-500">Receive push notifications on your devices.</p>
            </div>
            <Button onClick={subscribe} disabled={!!subscription}>
              {subscription ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </CardContent>
      </Card>
      <Card className="rounded-3xl border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-black">
            <MoonStar className="h-5 w-5 text-primary" />
            Quiet Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Mute notifications during a specific time period.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quietStart">Start time</Label>
              <Input
                id="quietStart"
                type="time"
                value={preferences.quietStart}
                onChange={(event) => setPreferences((current) => ({ ...current, quietStart: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quietEnd">End time</Label>
              <Input
                id="quietEnd"
                type="time"
                value={preferences.quietEnd}
                onChange={(event) => setPreferences((current) => ({ ...current, quietEnd: event.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={savePreferences} className="rounded-2xl px-6">Save Preferences</Button>
      </div>
    </div>
  );
}
