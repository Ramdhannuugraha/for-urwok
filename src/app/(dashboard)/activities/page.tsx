"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Plus, FileText, ChevronDown, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getActiveActivities, updateActivityStatus, deleteActivity, type Activity } from '@/lib/store';
import './activities.css';

const STATUS_OPTIONS: Activity['status'][] = ['Menunggu Antrian', 'Proses', 'Selesai'];

const STATUS_BADGE: Record<string, string> = {
  'Menunggu Antrian': 'badge-warning',
  'Proses': 'badge-primary',
  'Selesai': 'badge-success',
};

const PAGE_SIZE_OPTIONS = [25, 50, 100, 'Semua'] as const;

export default function ActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filterKategori, setFilterKategori] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | 'Semua'>(25);

  const loadData = useCallback(() => {
    setActivities(getActiveActivities());
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => setOpenDropdown(null);
    if (openDropdown) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [openDropdown]);

  const handleStatusChange = (id: string, newStatus: Activity['status']) => {
    updateActivityStatus(id, newStatus);
    loadData();
    setOpenDropdown(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus aktivitas ini?')) {
      deleteActivity(id);
      loadData();
    }
  };

  const filtered = activities.filter(a => {
    const matchSearch = a.nama_pekerjaan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori = !filterKategori || a.kategori === filterKategori;
    const matchStatus = !filterStatus || a.status === filterStatus;
    return matchSearch && matchKategori && matchStatus;
  });

  // Pagination logic
  const totalItems = filtered.length;
  const effectivePageSize = pageSize === 'Semua' ? totalItems : pageSize;
  const totalPages = effectivePageSize > 0 ? Math.ceil(totalItems / effectivePageSize) : 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * effectivePageSize;
  const endIndex = pageSize === 'Semua' ? totalItems : Math.min(startIndex + effectivePageSize, totalItems);
  const paginatedData = filtered.slice(startIndex, endIndex);

  // Reset to page 1 when filters or page size change
  const handlePageSizeChange = (value: string) => {
    setPageSize(value === 'Semua' ? 'Semua' : parseInt(value));
    setCurrentPage(1);
  };

  const handleFilterChange = (setter: (v: string) => void, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>Aktivitas Kerja</h1>
          <p className="text-muted">Kelola daftar pekerjaan aktif Anda — ubah status sesuai progres</p>
        </div>
        <Link href="/activities/new" className="btn btn-primary">
          <Plus size={18} />
          Tambah Aktivitas
        </Link>
      </div>

      <div className="activities-toolbar glass-panel">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Cari aktivitas..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>
        
        <div className="filter-group">
          <select className="filter-select" value={filterKategori} onChange={(e) => handleFilterChange(setFilterKategori, e.target.value)}>
            <option value="">Semua Kategori</option>
            <option value="Website">Website</option>
            <option value="Media Sosial">Media Sosial</option>
            <option value="Persuratan">Persuratan</option>
            <option value="Akademik">Akademik</option>
            <option value="Kemahasiswaan">Kemahasiswaan</option>
            <option value="Keuangan">Keuangan</option>
            <option value="Kerja Sama">Kerja Sama</option>
            <option value="Dokumentasi">Dokumentasi</option>
            <option value="Rapat">Rapat</option>
            <option value="Pengabdian">Pengabdian</option>
            <option value="Penelitian">Penelitian</option>
            <option value="Pelatihan">Pelatihan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <select className="filter-select" value={filterStatus} onChange={(e) => handleFilterChange(setFilterStatus, e.target.value)}>
            <option value="">Semua Status</option>
            <option value="Menunggu Antrian">Menunggu Antrian</option>
            <option value="Proses">Proses</option>
          </select>
        </div>
      </div>

      <div className="activities-table-container glass-panel">
        <table className="activities-table">
          <thead>
            <tr>
              <th style={{width: '40px'}}>No</th>
              <th>Nama Pekerjaan</th>
              <th>Kategori</th>
              <th>Unit Peminta</th>
              <th>Tanggal</th>
              <th>Prioritas</th>
              <th>Status</th>
              <th style={{width: '50px'}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-state">
                  <div className="empty-content">
                    <FileText size={32} className="text-muted" />
                    <p>Belum ada aktivitas aktif</p>
                    <Link href="/activities/new" className="btn btn-primary" style={{marginTop: '0.5rem', fontSize: '0.8125rem'}}>
                      <Plus size={16} /> Tambah Aktivitas Pertama
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((activity, index) => (
                <tr key={activity.id}>
                  <td className="row-number">{startIndex + index + 1}</td>
                  <td>
                    <div className="activity-title-cell">
                      <span>{activity.nama_pekerjaan}</span>
                    </div>
                  </td>
                  <td><span className="category-tag">{activity.kategori}</span></td>
                  <td className="text-secondary">{activity.unit_peminta || '-'}</td>
                  <td className="text-secondary">{activity.tanggal}</td>
                  <td>
                    <span className={
                      activity.prioritas === 'Tinggi' ? 'text-danger fw-bold' : 
                      activity.prioritas === 'Normal' ? 'text-secondary' : 'text-muted'
                    }>
                      {activity.prioritas}
                    </span>
                  </td>
                  <td>
                    <div className="status-dropdown-wrapper">
                      <button 
                        className={`status-btn badge ${STATUS_BADGE[activity.status]}`}
                        onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === activity.id ? null : activity.id); }}
                      >
                        {activity.status}
                        <ChevronDown size={12} />
                      </button>
                      {openDropdown === activity.id && (
                        <div className="status-dropdown" onClick={(e) => e.stopPropagation()}>
                          {STATUS_OPTIONS.map(s => (
                            <button 
                              key={s} 
                              className={`status-option ${s === activity.status ? 'active' : ''}`}
                              onClick={() => handleStatusChange(activity.id, s)}
                            >
                              <span className={`status-dot ${
                                s === 'Selesai' ? 'dot-success' : 
                                s === 'Proses' ? 'dot-primary' : 'dot-warning'
                              }`}></span>
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <button className="icon-btn action-btn" onClick={() => handleDelete(activity.id)} title="Hapus">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {totalItems > 0 && (
          <div className="pagination-footer">
            <div className="pagination-info">
              <span>Menampilkan {startIndex + 1}–{endIndex} dari {totalItems} data</span>
            </div>

            <div className="pagination-controls">
              <div className="page-size-selector">
                <label>Tampilkan:</label>
                <select value={pageSize.toString()} onChange={(e) => handlePageSizeChange(e.target.value)}>
                  {PAGE_SIZE_OPTIONS.map(opt => (
                    <option key={opt.toString()} value={opt.toString()}>{opt}</option>
                  ))}
                </select>
              </div>

              {pageSize !== 'Semua' && totalPages > 1 && (
                <div className="page-nav">
                  <button 
                    className="page-btn" 
                    disabled={safeCurrentPage <= 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => {
                      if (totalPages <= 7) return true;
                      if (p === 1 || p === totalPages) return true;
                      if (Math.abs(p - safeCurrentPage) <= 1) return true;
                      return false;
                    })
                    .reduce<(number | string)[]>((acc, p, i, arr) => {
                      if (i > 0 && typeof arr[i - 1] === 'number' && (p as number) - (arr[i - 1] as number) > 1) {
                        acc.push('...');
                      }
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) => (
                      typeof p === 'string' ? (
                        <span key={`ellipsis-${i}`} className="page-ellipsis">…</span>
                      ) : (
                        <button 
                          key={p} 
                          className={`page-btn ${p === safeCurrentPage ? 'active' : ''}`}
                          onClick={() => setCurrentPage(p)}
                        >
                          {p}
                        </button>
                      )
                    ))
                  }
                  
                  <button 
                    className="page-btn" 
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
