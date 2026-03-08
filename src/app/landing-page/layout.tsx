import Navbar from '@/components/layout/Navbar';
import FloatingCTA from '@/components/shared/FloatingCTA';
import CookieConsent from '@/components/shared/CookieConsent';
import BackToTop from '@/components/shared/BackToTop';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <FloatingCTA />
      <CookieConsent />
      <BackToTop />
    </div>
  );
}
