import ErrorBoundary from '@/components/shared/ErrorBoundary';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AuthGuard from '@/components/auth/AuthGuard';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 sm:ml-64 transition-all duration-300 pb-24 sm:pb-6">
            <div className="max-w-7xl mx-auto">
              <Breadcrumbs />
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
          </main>
        </div>
        <BottomNav />
        <Footer />
      </div>
    </AuthGuard>
  );
}
