'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden p-4">
      {/* Background Effects (Matching Landing Page) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [-50, 50, -50],
            y: [-50, 50, -50],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [50, -50, 50],
            y: [50, -50, 50],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[90%] h-[90%] bg-secondary/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Brand Header */}
        <Link href="/" className="mb-8 flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            G
          </div>
          <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            GiftCurator
          </span>
        </Link>

        {/* Content Area */}
        <div className="w-full flex justify-center">
          {children}
        </div>
        
        {/* Simple Footer Link */}
        <div className="mt-8 text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} GiftCurator. All rights reserved.
        </div>
      </div>
    </div>
  );
}
