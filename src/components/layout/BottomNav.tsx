'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/beneficiaries', icon: Users, label: 'People' },
  { href: '/events', icon: Calendar, label: 'Events' },
  { href: '/reports', icon: BarChart2, label: 'Reports' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-20 px-4 bg-background/80 backdrop-blur-xl border-t border-primary/5 sm:hidden shadow-[0_-1px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 min-w-[64px] group">
            <div className={cn(
              "p-2 rounded-xl transition-all duration-300",
              isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110" : "text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary"
            )}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider transition-colors duration-300",
              isActive ? "text-primary" : "text-muted-foreground"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
