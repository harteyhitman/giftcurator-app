'use client';

import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Menu, Search } from 'lucide-react';
import Nav from './Nav';

import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { canInstall, promptInstall } = usePWA();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-background sm:pl-64">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className="sm:hidden">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-60">
            <Nav />
          </SheetContent>
        </Sheet>
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {canInstall && <Button onClick={promptInstall}>Install App</Button>}
        <NotificationCenter />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
