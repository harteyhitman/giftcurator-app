'use client';

import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function NotificationPreferencesPage() {
  const { subscription, subscribe, error } = usePushNotifications();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Notification Preferences</h1>
      <Card>
        <CardHeader>
          <CardTitle>Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications via email.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications via SMS.</p>
            </div>
            <Switch />
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
      <Card>
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Mute notifications during a specific time period.
          </p>
          <div className="flex items-center gap-4">
            <Input type="time" defaultValue="22:00" />
            <span>to</span>
            <Input type="time" defaultValue="08:00" />
          </div>
        </CardContent>
      </Card>
      <Button>Save Preferences</Button>
    </div>
  );
}
