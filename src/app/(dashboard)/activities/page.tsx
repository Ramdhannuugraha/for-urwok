"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Filter, MoreVertical, FileText } from 'lucide-react';
import { getActivities } from '@/lib/api';
import './activities.css';

export default function ActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const data = await getActivities();
      setActivities(data);
      setLoading(false);
    };
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter(a => 
    a.nama_pekerjaan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>Aktivitas Kerja</h1>
          <p className="text-muted">Kelola dan pantau semua tugas Anda</p>
        </div>
        <Link href="/activities/new" className="btn btn-primary">
          <Plus size={18} />
          Tambah Aktivitas
        </Link>
      </div>

      <div className="activities-toolbar glass-panel">
        <div className="search-box">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Cari aktivitas..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <button className="btn btn-outline filter-btn">
            <Filter size={16} /> Filter
          </button>
          <select className="filter-select">
            <option value="">Semua Kategori</option>
            <option value="Website">Website</option>
            <option value="Media Sosial">Media Sosial</option>
            <option value="Rapat">Rapat</option>
          </select>
          <select className="filter-select">
            <option value="">Semua Status</option>
            <option value="Selesai">Selesai</option>
            <option value="Proses">Proses</option>
            <option value="Tertunda">Tertunda</option>
          </select>
        </div>
      </div>

      <div className="activities-table-container glass-panel">
        <table className="activities-table">
          <thead>
            <tr>
              <th>Nama Pekerjaan</th>
              <th>Kategori</th>
              <th>Unit Peminta</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{textAlign: 'center', padding: '2rem'}}>Memuat data...</td></tr>
            ) : filteredActivities.length === 0 ? (
              <tr><td colSpan={7} style={{textAlign: 'center', padding: '2rem'}}>Belum ada aktivitas ditemukan</td></tr>
            ) : (
              filteredActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <div className="activity-title-cell">
                      <FileText size={16} className="text-muted" />
                      <span>{activity.nama_pekerjaan}</span>
                    </div>
                  </td>
                  <td><span className="category-tag">{activity.kategori}</span></td>
                  <td>{activity.unit_peminta}</td>
                  <td>{activity.tanggal}</td>
                  <td>
                    <span className={`badge ${
                      activity.status === 'Selesai' ? 'badge-success' : 
                      activity.status === 'Proses' ? 'badge-primary' : 'badge-warning'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td>
                    <span className={
                      activity.prioritas === 'Tinggi' ? 'text-danger fw-bold' : 
                      activity.prioritas === 'Normal' ? 'text-success' : 'text-muted'
                    }>
                      {activity.prioritas}
                    </span>
                  </td>
                  <td>
                    <button className="icon-btn action-btn">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
