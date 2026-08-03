import { create } from 'zustand';
import api from '../api/axiosConfig';

export const useGamificationStore = create((set) => ({
  xp: 0,
  level: 1,
  streak: 0,
  freezeTokens: 0,
  badges: [],
  
  syncWithProfile: (gamificationData) => {
    if (!gamificationData) return;
    const newXp = gamificationData.studyXp || 0;
    const newLevel = Math.floor(newXp / 1000) + 1;
    set({
      xp: newXp,
      level: newLevel,
      streak: gamificationData.streak || 0,
      freezeTokens: gamificationData.freezeTokens || 0,
      badges: gamificationData.badges || []
    });
  },

  addXp: (amount) => set((state) => {
    const newXp = state.xp + amount;
    const newLevel = Math.floor(newXp / 1000) + 1;
    return { xp: newXp, level: newLevel };
  }),
  
  useFreezeToken: () => set((state) => ({
    freezeTokens: Math.max(0, state.freezeTokens - 1)
  })),
}));
