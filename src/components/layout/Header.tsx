'use client';

import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Menu, Search, User, Settings, Package, LogOut } from 'lucide-react';
import Nav from './Nav';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { canInstall, promptInstall } = usePWA();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-6 border-b border-primary/5 bg-background/80 backdrop-blur-xl sm:pl-72">
      <div className="flex items-center gap-6">
        <Sheet>
          <SheetTrigger className="sm:hidden p-2 hover:bg-primary/5 rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-primary" />
          </SheetTrigger>
          <SheetContent side="left" className="w-60">
            <Nav />
          </SheetContent>
        </Sheet>
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input placeholder="Search gifts, events..." className="pl-10 h-11 w-[300px] rounded-xl border-primary/5 bg-primary/5 focus:bg-background focus:ring-primary/20 transition-all" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {canInstall && (
          <Button onClick={promptInstall} variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-xl font-bold h-11 px-6 transition-all hidden md:flex">
            Install App
          </Button>
        )}
        <NotificationCenter />
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all hover:scale-105">
            <Avatar className="h-11 w-11 border-2 border-primary/10 shadow-sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/subscriptions" className="cursor-pointer">
                <Package className="mr-2 h-4 w-4" />
                <span>Subscription</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()} className="text-destructive cursor-pointer focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
