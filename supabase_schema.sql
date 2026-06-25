-- FK Work Assistant Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users are managed by Supabase Auth, but we can extend their profile
CREATE TABLE IF NOT EXISTS public.tabel_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'staff',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities table
CREATE TABLE IF NOT EXISTS public.tabel_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  tanggal DATE NOT NULL,
  unit_peminta TEXT NOT NULL,
  kategori TEXT NOT NULL,
  nama_pekerjaan TEXT NOT NULL,
  input_pekerjaan TEXT,
  output_pekerjaan TEXT,
  deskripsi TEXT,
  status TEXT DEFAULT 'proses', -- selesai, proses, tertunda
  prioritas TEXT DEFAULT 'normal', -- tinggi, normal, rendah
  jam_mulai TIME,
  jam_selesai TIME,
  durasi NUMERIC, -- in hours
  link_hasil TEXT,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attachments table
CREATE TABLE IF NOT EXISTS public.tabel_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID REFERENCES public.tabel_activities(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports table
CREATE TABLE IF NOT EXISTS public.tabel_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  periode TEXT NOT NULL,
  jenis_laporan TEXT NOT NULL, -- harian, mingguan, bulanan
  isi_laporan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meetings table
CREATE TABLE IF NOT EXISTS public.tabel_meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  nama_rapat TEXT NOT NULL,
  tanggal DATE NOT NULL,
  peserta TEXT,
  hasil_rapat TEXT,
  tindak_lanjut TEXT,
  pic TEXT,
  deadline DATE,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tabel_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tabel_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tabel_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tabel_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tabel_meetings ENABLE ROW LEVEL SECURITY;

-- Create Policies for RLS (Allow users to see only their own data)
CREATE POLICY "Users can view own profile" 
ON public.tabel_users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.tabel_users FOR UPDATE 
USING (auth.uid() = id);

-- Activities policies
CREATE POLICY "Users can CRUD own activities"
ON public.tabel_activities FOR ALL
USING (auth.uid() = user_id);

-- Attachments policies
CREATE POLICY "Users can CRUD own attachments"
ON public.tabel_attachments FOR ALL
USING (EXISTS (SELECT 1 FROM public.tabel_activities WHERE id = tabel_attachments.activity_id AND user_id = auth.uid()));

-- Reports policies
CREATE POLICY "Users can CRUD own reports"
ON public.tabel_reports FOR ALL
USING (auth.uid() = user_id);

-- Meetings policies
CREATE POLICY "Users can CRUD own meetings"
ON public.tabel_meetings FOR ALL
USING (auth.uid() = user_id);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tabel_activities_updated_at
BEFORE UPDATE ON public.tabel_activities
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
