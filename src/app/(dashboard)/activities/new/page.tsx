"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createNewActivity, type Activity } from '@/lib/store';
import './new-activity.css';

export default function NewActivityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    unit_peminta: '',
    kategori: '',
    nama_pekerjaan: '',
    deskripsi: '',
    status: 'Menunggu Antrian' as Activity['status'],
    prioritas: 'Normal' as Activity['prioritas'],
    jam_mulai: '',
    jam_selesai: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    createNewActivity(formData);
    
    setTimeout(() => {
      setLoading(false);
      router.push('/activities');
    }, 300);
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <Link href="/activities" className="back-link text-muted">
            <ArrowLeft size={16} /> Kembali
          </Link>
          <h1 style={{marginTop: '0.5rem'}}>Tambah Aktivitas</h1>
          <p className="text-muted">Catat pekerjaan baru Anda di sini</p>
        </div>
      </div>

      <div className="form-container glass-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Nama Pekerjaan <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="input-field" 
                name="nama_pekerjaan" 
                placeholder="Contoh: Update Banner Website"
                value={formData.nama_pekerjaan}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Kategori <span className="text-danger">*</span></label>
              <select className="input-field" name="kategori" value={formData.kategori} onChange={handleChange} required>
                <option value="">Pilih Kategori</option>
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
            </div>

            <div className="input-group">
              <label className="input-label">Tanggal <span className="text-danger">*</span></label>
              <input type="date" className="input-field" name="tanggal" value={formData.tanggal} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label className="input-label">Unit Peminta</label>
              <input type="text" className="input-field" name="unit_peminta" value={formData.unit_peminta} onChange={handleChange} placeholder="Contoh: Pimpinan, Akademik..." />
            </div>

            <div className="input-group">
              <label className="input-label">Jam Mulai</label>
              <input type="time" className="input-field" name="jam_mulai" value={formData.jam_mulai} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="input-label">Jam Selesai</label>
              <input type="time" className="input-field" name="jam_selesai" value={formData.jam_selesai} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="input-label">Status Awal</label>
              <select className="input-field" name="status" value={formData.status} onChange={handleChange}>
                <option value="Menunggu Antrian">Menunggu Antrian</option>
                <option value="Proses">Proses</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Prioritas</label>
              <select className="input-field" name="prioritas" value={formData.prioritas} onChange={handleChange}>
                <option value="Normal">Normal</option>
                <option value="Tinggi">Tinggi</option>
                <option value="Rendah">Rendah</option>
              </select>
            </div>
          </div>

          <div className="input-group" style={{marginTop: '0.25rem'}}>
            <label className="input-label">Deskripsi / Catatan</label>
            <textarea 
              className="input-field" 
              name="deskripsi" 
              rows={4} 
              placeholder="Jelaskan detail pekerjaan atau catatan tambahan..."
              value={formData.deskripsi}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <Link href="/activities" className="btn btn-outline">Batal</Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={18} /> {loading ? 'Menyimpan...' : 'Simpan Aktivitas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
