"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, Clock, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import './dashboard.css';

const data = [
  { name: 'Jan', tugas: 45 },
  { name: 'Feb', tugas: 52 },
  { name: 'Mar', tugas: 38 },
  { name: 'Apr', tugas: 65 },
  { name: 'Mei', tugas: 48 },
  { name: 'Jun', tugas: 70 },
];

const recentActivities = [
  { id: 1, title: 'Update Website Fakultas', desc: 'Memasukkan berita kegiatan mahasiswa', status: 'Selesai', time: 'Hari ini, 10:30' },
  { id: 2, title: 'Desain Poster Seminar', desc: 'Membuat poster untuk seminar nasional', status: 'Proses', time: 'Hari ini, 09:15' },
  { id: 3, title: 'Notulensi Rapat Pimpinan', desc: 'Notulensi rapat koordinasi bulanan', status: 'Selesai', time: 'Kemarin, 14:00' },
  { id: 4, title: 'Upload Dokumen Akreditasi', desc: 'Upload berkas akreditasi prodi', status: 'Tertunda', time: 'Kemarin, 11:30' },
];

export default function DashboardPage() {
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
            <h3>12</h3>
            <p>Pekerjaan Hari Ini</p>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper success">
            <CheckCircle size={22} />
          </div>
          <div className="stat-content">
            <h3>48</h3>
            <p>Selesai Bulan Ini</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper warning">
            <Clock size={22} />
          </div>
          <div className="stat-content">
            <h3>124</h3>
            <p>Jam Produktif</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper danger">
            <AlertCircle size={22} />
          </div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Pekerjaan Tertunda</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel">
          <div className="card-header">
            <h3>Grafik Pekerjaan Bulanan</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
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
                <Bar dataKey="tugas" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-bar)" stopOpacity={1}/>
                    <stop offset="100%" stopColor="var(--chart-bar-end)" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
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
            {recentActivities.map((item) => (
              <div key={item.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="activity-meta">
                  <span className={`badge ${
                    item.status === 'Selesai' ? 'badge-success' : 
                    item.status === 'Proses' ? 'badge-primary' : 'badge-warning'
                  }`}>
                    {item.status}
                  </span>
                  <span className="activity-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
