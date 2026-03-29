'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Star, CreditCard, MessageCircle, LogIn, UserPlus, Github, Twitter, Instagram } from 'lucide-react';

import { ThemeToggle } from '@/components/shared/ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Features', href: '#features', icon: Star },
  { name: 'Pricing', href: '#pricing', icon: CreditCard },
  { name: 'FAQ', href: '#faq', icon: MessageCircle },
];

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
        <Link href="/" className="mr-8 flex items-center space-x-2 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">G</div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">GiftCurator</span>
        </Link>
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.filter(l => l.name !== 'Home').map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-primary transition-colors font-semibold"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/5 rounded-xl">
              <Menu className="h-6 w-6 text-primary" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 flex flex-col w-[300px] border-r-primary/5">
            <SheetHeader className="sr-only p-0">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="p-6 border-b border-primary/5 bg-primary/5">
              <Link href="/" className="flex items-center space-x-2 group" onClick={() => setIsOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">G</div>
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">GiftCurator</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Premium Gifting AI</span>
                </div>
              </Link>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-background shadow-sm border border-primary/5 group-hover:border-primary/20 group-hover:shadow-md transition-all">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">{link.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-10">
                <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Account</p>
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-background shadow-sm border border-primary/5 group-hover:border-primary/20 transition-all">
                      <LogIn className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">Login</span>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                  >
                    <div className="p-2 rounded-xl bg-white/20">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">Get Started</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-primary/5 bg-primary/5">
              <div className="flex items-center justify-around">
                <Link href="#" className="p-2 rounded-xl bg-background shadow-sm border border-primary/5 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="p-2 rounded-xl bg-background shadow-sm border border-primary/5 hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="p-2 rounded-xl bg-background shadow-sm border border-primary/5 hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-center mt-6 text-[10px] font-bold text-muted-foreground">© 2026 GiftCurator. AI-Powered.</p>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <Button variant="ghost" className="hidden sm:flex hover:text-primary transition-colors h-9 px-3 sm:h-10 sm:px-4" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 sm:h-11 sm:px-6 rounded-xl shadow-lg shadow-primary/10 transition-all hover:scale-105 font-bold" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
