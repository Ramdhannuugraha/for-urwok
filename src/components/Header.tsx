"use client";

import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import './Header.css';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="app-header glass-header">
      <div className="header-left">
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Cari aktivitas, dokumen..." className="search-input" />
        </div>
      </div>
      
      <div className="header-right">
        {mounted && (
          <button 
            className="icon-btn" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
        
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge-dot"></span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">Tenaga Kependidikan</span>
            <span className="user-role">FK UPI</span>
          </div>
        </div>
      </div>
    </header>
  );
}
