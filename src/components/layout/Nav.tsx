'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, BarChart, CreditCard, Package, MessageCircle, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/beneficiaries', icon: Users, label: 'Beneficiaries' },
  { href: '/events', icon: Calendar, label: 'Events' },
  { href: '/reports', icon: BarChart, label: 'Reports' },
  { href: '/cards', icon: CreditCard, label: 'Cards' },
  { href: '/subscription', icon: Package, label: 'Subscription' },
  { href: '/contact', icon: MessageCircle, label: 'Contact' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center px-4 py-2 text-sm font-medium rounded-md',
            pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
