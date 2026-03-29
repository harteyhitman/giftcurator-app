'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold inline-block">GiftCurator</span>
        </Link>
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#faq">FAQ</Link>
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-left">Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4">
              <Link href="#features" onClick={() => setIsOpen(false)}>Features</Link>
              <Link href="#pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link href="#faq" onClick={() => setIsOpen(false)}>FAQ</Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" className="h-9 px-3 sm:h-10 sm:px-4 text-sm font-medium" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="h-9 px-3 sm:h-10 sm:px-4 text-sm font-bold bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
