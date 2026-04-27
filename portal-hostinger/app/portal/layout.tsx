import { requireAuth } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar — visible on large screens */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar role={session.role} name={session.name} />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
