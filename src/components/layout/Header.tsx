'use client';

import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-primary/5 bg-background/80 backdrop-blur-xl sm:pl-64">
      <div className="flex items-center gap-2 sm:gap-6 flex-1 sm:flex-initial">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden hover:bg-primary/5 rounded-xl transition-colors">
              <Menu className="w-5 h-5 text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-60">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-left text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                GiftCurator
              </SheetTitle>
            </SheetHeader>
            <Nav />
          </SheetContent>
        </Sheet>
        <div className="relative flex-1 group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input placeholder="Search gifts, events..." className="pl-10 h-11 w-full sm:w-[300px] rounded-xl border-primary/5 bg-primary/5 focus:bg-background focus:ring-primary/20 transition-all" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {canInstall && (
          <Button onClick={promptInstall} variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-xl font-bold h-9 px-4 sm:h-11 sm:px-6 transition-all hidden md:flex">
            Install App
          </Button>
        )}
        <NotificationCenter />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-xl p-0 overflow-hidden border border-primary/5 hover:border-primary/20 transition-all">
              <Avatar className="h-full w-full">
                <AvatarImage src="/avatars/user.png" alt="User" />
                <AvatarFallback className="bg-primary/5 text-primary font-bold">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl border-primary/5 shadow-xl p-2">
            <div className="flex items-center gap-3 p-3 border-b border-primary/5 mb-2">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">JD</div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">John Doe</span>
                <span className="text-xs text-muted-foreground">Premium Plan</span>
              </div>
            </div>
            <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 focus:text-primary cursor-pointer h-11 px-3">
              <Link href="/profile" className="flex items-center gap-3 w-full">
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 focus:text-primary cursor-pointer h-11 px-3">
              <Link href="/settings" className="flex items-center gap-3 w-full">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 focus:text-primary cursor-pointer h-11 px-3">
              <Link href="/subscriptions" className="flex items-center gap-3 w-full">
                <Package className="w-4 h-4" />
                <span>Subscription</span>
              </Link>
            </DropdownMenuItem>
            <div className="h-px bg-primary/5 my-2" />
            <DropdownMenuItem 
              onClick={() => signOut()}
              className="rounded-xl focus:bg-destructive/5 focus:text-destructive cursor-pointer h-11 px-3 text-destructive"
            >
              <LogOut className="w-4 h-4 mr-3" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
