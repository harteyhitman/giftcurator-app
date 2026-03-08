'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

import { ThemeToggle } from '@/components/shared/ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'border-b bg-background/80 backdrop-blur-xl border-primary/10' : 'bg-transparent'} text-foreground`}>
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-8 flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">G</div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">GiftCurator</span>
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
            <div className="flex flex-col space-y-4">
              <Link href="#features" onClick={() => setIsOpen(false)}>Features</Link>
              <Link href="#pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link href="#faq" onClick={() => setIsOpen(false)}>FAQ</Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <nav className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" className="hover:text-primary transition-colors" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 rounded-xl shadow-lg shadow-primary/10 transition-all hover:scale-105" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
