'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, BarChart, CreditCard, Package, MessageCircle, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/beneficiaries', icon: Users, label: 'Beneficiaries' },
  { href: '/events', icon: Calendar, label: 'Events' },
  { href: '/reports', icon: BarChart, label: 'Reports' },
  { href: '/subscriptions', icon: Package, label: 'Subscriptions' },
  { href: '/support', icon: MessageCircle, label: 'Support' },
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
            'flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200',
            pathname === item.href
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
              : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
          )}
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
