"use client";

import { useState, useEffect, useCallback } from 'react';
import { Search, CircleCheckBig, RotateCcw, Trash2 } from 'lucide-react';
import { getCompletedActivities, updateActivityStatus, deleteActivity, type Activity } from '@/lib/store';
import './completed.css';

export default function CompletedPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);

  const loadData = useCallback(() => {
    setActivities(getCompletedActivities());
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUndoComplete = (id: string) => {
    updateActivityStatus(id, 'Proses');
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus aktivitas ini secara permanen?')) {
      deleteActivity(id);
      loadData();
    }
  };

  const filtered = activities.filter(a => 
    a.nama_pekerjaan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>Pekerjaan Selesai</h1>
          <p className="text-muted">Daftar pekerjaan yang sudah diselesaikan — <strong>{activities.length}</strong> pekerjaan</p>
        </div>
      </div>

      {activities.length > 0 && (
        <div className="completed-toolbar glass-panel">
          <div className="search-box">
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Cari pekerjaan selesai..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="glass-panel empty-completed">
          <CircleCheckBig size={48} className="text-muted" />
          <h3>Belum ada pekerjaan yang selesai</h3>
          <p className="text-muted">Pekerjaan yang Anda tandai &quot;Selesai&quot; dari halaman Aktivitas Kerja akan muncul di sini.</p>
        </div>
      ) : (
        <div className="completed-grid">
          {filtered.map((activity) => (
            <div key={activity.id} className="completed-card glass-panel">
              <div className="completed-card-top">
                <span className="category-tag">{activity.kategori}</span>
                <span className="completed-date">
                  {activity.completed_at 
                    ? new Date(activity.completed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                    : activity.tanggal
                  }
                </span>
              </div>
              
              <h4 className="completed-title">{activity.nama_pekerjaan}</h4>
              
              {activity.deskripsi && (
                <p className="completed-desc">{activity.deskripsi}</p>
              )}

              <div className="completed-meta">
                {activity.unit_peminta && (
                  <span className="meta-item">Unit: {activity.unit_peminta}</span>
                )}
                <span className={`meta-item ${
                  activity.prioritas === 'Tinggi' ? 'text-danger' : ''
                }`}>
                  Prioritas: {activity.prioritas}
                </span>
              </div>

              <div className="completed-actions">
                <button 
                  className="btn btn-outline completed-action-btn" 
                  onClick={() => handleUndoComplete(activity.id)}
                  title="Kembalikan ke Proses"
                >
                  <RotateCcw size={14} /> Buka Kembali
                </button>
                <button 
                  className="btn btn-outline completed-action-btn delete-btn" 
                  onClick={() => handleDelete(activity.id)}
                  title="Hapus Permanen"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
