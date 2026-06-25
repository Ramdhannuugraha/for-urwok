"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // Supabase sign up might require email confirmation depending on settings
        setErrorMsg('Registrasi berhasil! Silakan login (atau cek email untuk verifikasi jika diaktifkan).');
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Terjadi kesalahan saat autentikasi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel">
        <div className="login-header">
          <div className="login-logo">FK</div>
          <h2>Work Assistant</h2>
          <p className="text-muted">Asisten Digital Pribadi Tenaga Kependidikan</p>
        </div>
        
        {errorMsg && (
          <div className={`alert ${errorMsg.includes('berhasil') ? 'alert-success' : 'alert-danger'}`}>
            {errorMsg}
          </div>
        )}

        <form className="login-form" onSubmit={handleAuth}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
            {loading ? 'Memproses...' : isLogin ? 'Login' : 'Daftar Akun'}
          </button>
        </form>

        <div className="auth-switch">
          <button 
            type="button" 
            className="text-muted switch-btn" 
            onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }}
            style={{ marginBottom: '1rem', display: 'block', width: '100%' }}
          >
            {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Login'}
          </button>
          
          <button 
            type="button" 
            className="btn btn-outline" 
            style={{ width: '100%', fontSize: '0.85rem' }}
            onClick={() => router.push('/dashboard')}
          >
            Masuk Tanpa Login (Demo Mode)
          </button>
        </div>
      </div>
    </div>
  );
}
