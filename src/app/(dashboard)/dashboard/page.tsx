"use client";

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, Clock, CheckCircle, AlertCircle, ArrowUpRight, Hourglass } from 'lucide-react';
import Link from 'next/link';
import { getStats, getAllActivities, type Activity } from '@/lib/store';
import './dashboard.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({ todayCount: 0, totalMonth: 0, completedMonth: 0, pendingCount: 0, prosesCount: 0, selesaiCount: 0 });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    setStats(getStats());
    setRecentActivities(getAllActivities().slice(0, 5));
  }, []);

  const chartData = [
    { name: 'Antrian', value: stats.pendingCount, fill: 'var(--warning)' },
    { name: 'Proses', value: stats.prosesCount, fill: 'var(--primary)' },
    { name: 'Selesai', value: stats.selesaiCount, fill: 'var(--success)' },
  ];

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted">Ringkasan aktivitas dan kinerja Anda</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper primary">
            <Briefcase size={22} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalMonth}</h3>
            <p>Total Bulan Ini</p>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper warning">
            <Hourglass size={22} />
          </div>
          <div className="stat-content">
            <h3>{stats.pendingCount}</h3>
            <p>Menunggu Antrian</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper primary">
            <Clock size={22} />
          </div>
          <div className="stat-content">
            <h3>{stats.prosesCount}</h3>
            <p>Sedang Proses</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper success">
            <CheckCircle size={22} />
          </div>
          <div className="stat-content">
            <h3>{stats.selesaiCount}</h3>
            <p>Selesai</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel">
          <div className="card-header">
            <h3>Ringkasan Status</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip 
                  cursor={{fill: 'var(--bg-hover)', radius: 8}}
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    border: '1px solid var(--border)', 
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-lg)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8125rem',
                  }} 
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel">
          <div className="card-header">
            <h3>Aktivitas Terkini</h3>
            <Link href="/activities" className="btn btn-outline" style={{padding: '0.25rem 0.75rem', fontSize: '0.75rem', gap: '0.25rem'}}>
              Lihat Semua <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="activity-list">
            {recentActivities.length === 0 ? (
              <div style={{textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.875rem'}}>
                Belum ada aktivitas. Mulai tambahkan pekerjaan Anda!
              </div>
            ) : (
              recentActivities.map((item) => (
                <div key={item.id} className="activity-item">
                  <div className={`activity-dot ${
                    item.status === 'Selesai' ? 'dot-green' : 
                    item.status === 'Proses' ? 'dot-blue' : 'dot-orange'
                  }`}></div>
                  <div className="activity-info">
                    <h4>{item.nama_pekerjaan}</h4>
                    <p>{item.kategori} · {item.tanggal}</p>
                  </div>
                  <div className="activity-meta">
                    <span className={`badge ${
                      item.status === 'Selesai' ? 'badge-success' : 
                      item.status === 'Proses' ? 'badge-primary' : 'badge-warning'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
