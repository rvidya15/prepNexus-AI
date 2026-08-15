import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, BookOpen, BrainCircuit, LogOut } from 'lucide-react';
import SyllabusExplorer from '../components/dashboard/SyllabusExplorer';
import { useStudyStore } from '../store/useStudyStore';
import { useAuthStore } from '../store/useAuthStore';
import { useGamificationStore } from '../store/useGamificationStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { streak, fetchDashboardData } = useStudyStore();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const syncWithProfile = useGamificationStore((state) => state.syncWithProfile);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (user && user.gamification) {
      syncWithProfile(user.gamification);
    }
  }, [user, syncWithProfile]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-indigo-600 w-8 h-8" />
          <h1 className="text-3xl font-bold text-gray-900">NexaPrep</h1>
        </div>
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-indigo-200 cursor-pointer hover:bg-opacity-80 transition shadow-sm" 
            title="Buy More Tokens"
            onClick={async () => {
              try {
                const api = (await import('../api/axiosConfig')).default;
                const res = await api.post('/stripe/create-checkout-session', { planId: 'token_pack' });
                window.location.href = res.data.url;
              } catch(e) {}
            }}
          >
            <BrainCircuit className="text-indigo-600 w-5 h-5" />
            <span className="text-indigo-600 font-bold">{user?.aiTokens ?? 20} Tokens</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-orange-500/30 shadow-sm">
            <Flame className="text-orange-500 w-5 h-5" />
            <span className="text-orange-500 font-bold">{streak} Day Streak!</span>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-slate-800 transition hover:text-red-400" title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

    </div>
  );
};
      <SyllabusExplorer />
    </div>
  );
};

export default Dashboard;
