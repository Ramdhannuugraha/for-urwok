"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './dashboard.css';

const data = [
  { name: 'Jan', tugas: 45 },
  { name: 'Feb', tugas: 52 },
  { name: 'Mar', tugas: 38 },
  { name: 'Apr', tugas: 65 },
  { name: 'Mei', tugas: 48 },
  { name: 'Jun', tugas: 70 },
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
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Pekerjaan Hari Ini</p>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper success">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>48</h3>
            <p>Selesai Bulan Ini</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper warning">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>124</h3>
            <p>Jam Produktif</p>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper danger">
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Pekerjaan Tertunda</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-card glass-panel">
          <div className="card-header">
            <h3>Grafik Pekerjaan Bulanan</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '8px' }} 
                />
                <Bar dataKey="tugas" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={1}/>
                    <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="activity-card glass-panel">
          <div className="card-header">
            <h3>Aktivitas Terkini</h3>
            <button className="btn btn-outline" style={{padding: '0.25rem 0.75rem', fontSize: '0.8rem'}}>Lihat Semua</button>
          </div>
          <div className="activity-list">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-info">
                  <h4>Update Website Fakultas</h4>
                  <p>Memasukkan berita kegiatan mahasiswa ke website</p>
                </div>
                <div className="activity-meta">
                  <span className="badge badge-success">Selesai</span>
                  <span className="activity-time">Hari ini, 10:30</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
