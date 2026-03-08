import ErrorBoundary from '@/components/shared/ErrorBoundary';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AuthGuard from '@/components/auth/AuthGuard';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 sm:ml-60">
            <Breadcrumbs />
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
}
