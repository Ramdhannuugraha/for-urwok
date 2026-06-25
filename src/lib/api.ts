import { supabase } from './supabase';

// Helper to check if Supabase is connected (URL is not placeholder)
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
};

export const getActivities = async () => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured. Returning mock data.");
    return [
      { id: '1', nama_pekerjaan: 'Update Website Fakultas', kategori: 'Website', status: 'Selesai', prioritas: 'Normal', tanggal: '2026-06-25', unit_peminta: 'Pimpinan' },
      { id: '2', nama_pekerjaan: 'Desain Poster Seminar Nasional', kategori: 'Media Sosial', status: 'Proses', prioritas: 'Tinggi', tanggal: '2026-06-26', unit_peminta: 'Akademik' },
    ];
  }

  try {
    const { data, error } = await supabase
      .from('tabel_activities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
};

export const createActivity = async (activityData: any) => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured. Simulating save.");
    return { success: true };
  }

  try {
    // In a real app with Auth, we would get the user_id from session.
    // For this MVP, if RLS requires user_id, we need to handle it.
    // Assuming the user is logged in if we reach here.
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from('tabel_activities')
      .insert([{ ...activityData, user_id: userId }]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error creating activity:', error);
    return { success: false, error };
  }
};

export const getDashboardStats = async () => {
  if (!isSupabaseConfigured()) {
    return {
      todayCount: 12,
      completedMonth: 48,
      productiveHours: 124,
      pendingCount: 3,
    };
  }

  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) throw new Error("Not authenticated");

    // simplified queries for MVP
    const { count: pendingCount } = await supabase
      .from('tabel_activities')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'Tertunda');

    const { count: completedMonth } = await supabase
      .from('tabel_activities')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'Selesai');

    return {
      todayCount: 0, // Mocked for simplicity
      completedMonth: completedMonth || 0,
      productiveHours: 0,
      pendingCount: pendingCount || 0,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      todayCount: 0,
      completedMonth: 0,
      productiveHours: 0,
      pendingCount: 0,
    };
  }
};
