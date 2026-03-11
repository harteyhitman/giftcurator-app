import { NextResponse } from 'next/server';

export async function GET() {
  const notifications = [
    {
      id: '1',
      type: 'upcoming_event',
      title: 'Upcoming Event: John Doe\'s Birthday',
      message: 'John Doe\'s birthday is in 3 days.',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'subscription_update',
      title: 'Subscription Update',
      message: 'Your subscription has been renewed.',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      type: 'beneficiary_birthday',
      title: 'Beneficiary Birthday: Jane Doe',
      message: 'It\'s Jane Doe\'s birthday today!',
      read: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      type: 'system_announcement',
      title: 'System Announcement',
      message: 'We will be undergoing maintenance on Sunday.',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      type: 'security_alert',
      title: 'Security Alert',
      message: 'A new device has been logged into your account.',
      read: false,
      createdAt: new Date().toISOString(),
    },
  ];
  return NextResponse.json(notifications);
}
