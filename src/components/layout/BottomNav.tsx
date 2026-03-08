'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, BarChart2 } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/beneficiaries', icon: Users, label: 'Beneficiaries' },
  { href: '/events', icon: Calendar, label: 'Events' },
  { href: '/reports', icon: BarChart2, label: 'Reports' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-around p-2 bg-background border-t sm:hidden">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center">
          <item.icon className={`w-6 h-6 ${pathname === item.href ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className={`text-xs ${pathname === item.href ? 'text-primary' : 'text-muted-foreground'}`}>
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
