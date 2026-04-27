'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  FileText,
  Stethoscope,
  BookOpen,
  Upload,
  LogOut,
  X,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard',     href: '/dashboard',          icon: <LayoutDashboard size={18} /> },
  { label: 'Patients',      href: '/patients',           icon: <Users size={18} /> },
  { label: 'Test Requests', href: '/test-requests',      icon: <FlaskConical size={18} /> },
  { label: 'Reports',       href: '/reports',            icon: <FileText size={18} /> },
  { label: 'Doctors',       href: '/admin/doctors',      icon: <Stethoscope size={18} />, adminOnly: true },
  { label: 'Test Catalog',  href: '/admin/tests',        icon: <BookOpen size={18} />,   adminOnly: true },
  { label: 'Upload Report', href: '/admin/upload',       icon: <Upload size={18} />,     adminOnly: true },
];

interface SidebarProps {
  role: 'doctor' | 'admin';
  name: string;
  onClose?: () => void;
}

export default function Sidebar({ role, name, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  const visible = navItems.filter(item => !item.adminOnly || role === 'admin');

  return (
    <aside className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Physician Portal</p>
          <p className="font-semibold text-brand-700 text-lg leading-tight">Genolink</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-400 capitalize">{role}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {visible.map(item => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-brand-50 text-brand-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
