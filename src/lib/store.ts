// Local storage based data layer that works immediately
// Will sync with Supabase when configured

export interface Activity {
  id: string;
  tanggal: string;
  unit_peminta: string;
  kategori: string;
  nama_pekerjaan: string;
  deskripsi: string;
  status: 'Menunggu Antrian' | 'Proses' | 'Selesai';
  prioritas: 'Tinggi' | 'Normal' | 'Rendah';
  jam_mulai: string;
  jam_selesai: string;
  created_at: string;
  completed_at?: string;
}

const STORAGE_KEY = 'fk_work_activities';

// Get all activities from localStorage
export const getAllActivities = (): Activity[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Save all activities to localStorage
const saveActivities = (activities: Activity[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
};

// Get active activities (Menunggu Antrian + Proses)
export const getActiveActivities = (): Activity[] => {
  return getAllActivities().filter(a => a.status !== 'Selesai');
};

// Get completed activities
export const getCompletedActivities = (): Activity[] => {
  return getAllActivities().filter(a => a.status === 'Selesai');
};

// Create a new activity
export const createNewActivity = (data: Omit<Activity, 'id' | 'created_at'>): Activity => {
  const activities = getAllActivities();
  const newActivity: Activity = {
    ...data,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  activities.unshift(newActivity);
  saveActivities(activities);
  return newActivity;
};

// Update activity status
export const updateActivityStatus = (id: string, status: Activity['status']): Activity | null => {
  const activities = getAllActivities();
  const index = activities.findIndex(a => a.id === id);
  if (index === -1) return null;
  
  activities[index].status = status;
  if (status === 'Selesai') {
    activities[index].completed_at = new Date().toISOString();
  } else {
    activities[index].completed_at = undefined;
  }
  
  saveActivities(activities);
  return activities[index];
};

// Delete activity
export const deleteActivity = (id: string): boolean => {
  const activities = getAllActivities();
  const filtered = activities.filter(a => a.id !== id);
  if (filtered.length === activities.length) return false;
  saveActivities(filtered);
  return true;
};

// Get dashboard stats
export const getStats = () => {
  const all = getAllActivities();
  const today = new Date().toISOString().split('T')[0];
  
  return {
    todayCount: all.filter(a => a.tanggal === today).length,
    totalMonth: all.filter(a => {
      const d = new Date(a.tanggal);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
    completedMonth: all.filter(a => {
      const d = new Date(a.tanggal);
      const now = new Date();
      return a.status === 'Selesai' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
    pendingCount: all.filter(a => a.status === 'Menunggu Antrian').length,
    prosesCount: all.filter(a => a.status === 'Proses').length,
    selesaiCount: all.filter(a => a.status === 'Selesai').length,
  };
};
