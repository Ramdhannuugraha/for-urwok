"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, FileText, LogOut, FilePlus, CircleCheckBig } from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: CheckSquare, label: 'Aktivitas Kerja', href: '/activities' },
  { icon: FilePlus, label: 'Tambah Aktivitas', href: '/activities/new' },
  { icon: CircleCheckBig, label: 'Pekerjaan Selesai', href: '/completed' },
  { icon: FileText, label: 'Laporan', href: '/reports' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">FK</div>
        <h2 className="logo-text text-gradient">Work Assistant</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link href={item.href} className={`nav-link ${pathname === item.href ? 'active' : ''}`}>
                  <Icon className="nav-icon" size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link href="/" className="nav-link logout-btn">
          <LogOut className="nav-icon" size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
