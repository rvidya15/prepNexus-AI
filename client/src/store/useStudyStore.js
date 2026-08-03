import { create } from 'zustand';
import api from '../api/axiosConfig';

export const useStudyStore = create((set) => ({
  streak: 0,
  weaknesses: [],
  dailyPlanner: [],
  isLoading: false,

  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      const profileRes = await api.get('/users/profile');
      const workspacesRes = await api.get('/workspaces');
      
      const profile = profileRes.data;
      const workspaces = workspacesRes.data;

      // Mock Weaknesses mapped to the user's target exam (Analytics schema is phase 2)
      const mockWeaknesses = [
        { subject: 'Advanced Algebra', mastery: 30 },
        { subject: 'Quantum Physics', mastery: 75 },
        { subject: 'Organic Chemistry', mastery: 50 },
      ];

      // Map dynamic backend workspaces to the daily planner
      const planner = workspaces.map((ws, i) => ({
        id: ws._id,
        title: `Learn ${ws.title}`,
        type: i % 2 === 0 ? 'learn' : 'revision',
        time: '45m'
      }));

      // Fallback if no workspaces exist
      if (planner.length === 0) {
        planner.push({ id: 1, title: 'Create your first Workspace!', type: 'setup', time: '5m' });
      }

      set({
        streak: profile.gamification?.streak || 0,
        weaknesses: mockWeaknesses,
        dailyPlanner: planner,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      set({ isLoading: false });
    }
  }
}));
