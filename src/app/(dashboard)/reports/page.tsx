"use client";

import { useState } from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './reports.css';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('bulanan');
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('report-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Laporan_Kerja_FK_UPI_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>Laporan Kerja</h1>
          <p className="text-muted">Buat dan unduh laporan kinerja Anda</p>
        </div>
      </div>

      <div className="reports-toolbar glass-panel">
        <div className="report-controls">
          <div className="control-group">
            <label className="control-label">Jenis Laporan</label>
            <select className="control-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="harian">Laporan Harian</option>
              <option value="mingguan">Laporan Mingguan</option>
              <option value="bulanan">Laporan Bulanan</option>
            </select>
          </div>
          
          <div className="control-group">
            <label className="control-label">Periode</label>
            <div className="date-picker-wrapper">
              <Calendar size={16} className="text-muted" />
              <input type="month" className="control-input" defaultValue="2026-06" />
            </div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={exportPDF} disabled={isExporting}>
          <Download size={18} />
          {isExporting ? 'Memproses...' : 'Export PDF'}
        </button>
      </div>

      <div className="report-preview-container">
        <h3 className="preview-title">Preview Laporan</h3>
        
        {/* This is the content that will be exported to PDF */}
        <div id="report-content" className="report-document">
          <div className="report-doc-header">
            <div className="doc-logo">FK UPI</div>
            <div className="doc-title-area">
              <h2>LAPORAN KINERJA TENAGA KEPENDIDIKAN</h2>
              <h3>FAKULTAS KEDOKTERAN UNIVERSITAS PENDIDIKAN INDONESIA</h3>
              <p>Periode: Juni 2026</p>
            </div>
          </div>

          <div className="report-doc-body">
            <div className="doc-section">
              <h4>1. Ringkasan Eksekutif</h4>
              <p>Pada bulan Juni 2026, telah diselesaikan 48 aktivitas pekerjaan dengan total 124 jam kerja produktif. Tingkat penyelesaian tugas mencapai 94% dari target bulanan.</p>
            </div>

            <div className="doc-section">
              <h4>2. Rincian Aktivitas</h4>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Pekerjaan</th>
                    <th>Kategori</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Update Website Fakultas</td>
                    <td>Website</td>
                    <td>Selesai</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Desain Poster Seminar Nasional</td>
                    <td>Media Sosial</td>
                    <td>Selesai</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Notulensi Rapat Pimpinan</td>
                    <td>Rapat</td>
                    <td>Selesai</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Liputan Kegiatan Mahasiswa</td>
                    <td>Dokumentasi</td>
                    <td>Selesai</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-section">
              <h4>3. Analisis dan Kendala</h4>
              <p>Terdapat kendala pada pengumpulan dokumen akreditasi dari unit terkait yang menyebabkan sedikit keterlambatan. Rekomendasi untuk bulan depan adalah meningkatkan koordinasi sejak awal minggu.</p>
            </div>
          </div>

          <div className="report-doc-footer">
            <div className="signature-area">
              <p>Bandung, 30 Juni 2026</p>
              <p>Tenaga Kependidikan,</p>
              <br/><br/><br/>
              <p><strong>Nama Pegawai</strong></p>
              <p>NIP. 198001012005011001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
