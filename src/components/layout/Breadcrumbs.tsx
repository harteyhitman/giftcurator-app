'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <div key={href} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4" />
            <Link
              href={href}
              className={isLast ? 'text-foreground' : 'hover:text-foreground'}
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
