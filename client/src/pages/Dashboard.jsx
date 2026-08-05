import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, BookOpen, BrainCircuit, LogOut } from 'lucide-react';
import WeaknessRadarChart from '../components/dashboard/WeaknessRadarChart';
import GamificationHub from '../components/dashboard/GamificationHub';
import { useStudyStore } from '../store/useStudyStore';
import { useAuthStore } from '../store/useAuthStore';
import { useGamificationStore } from '../store/useGamificationStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { streak, dailyPlanner, fetchDashboardData } = useStudyStore();
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
    <div className="min-h-screen bg-dark p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-neonCyan w-8 h-8" />
          <h1 className="text-3xl font-bold text-white">PrepNexus-AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 bg-darker px-4 py-2 rounded-full border border-neonCyan/30 cursor-pointer hover:bg-neonCyan/10 transition" 
            title="Buy More Tokens"
            onClick={async () => {
              try {
                const api = (await import('../api/axiosConfig')).default;
                const res = await api.post('/stripe/create-checkout-session', { planId: 'token_pack' });
                window.location.href = res.data.url;
              } catch(e) {}
            }}
          >
            <BrainCircuit className="text-neonCyan w-5 h-5" />
            <span className="text-neonCyan font-bold">{user?.aiTokens ?? 20} Tokens</span>
          </div>
          <div className="flex items-center gap-2 bg-darker px-4 py-2 rounded-full border border-orange-500/30">
            <Flame className="text-orange-500 w-5 h-5" />
            <span className="text-orange-500 font-bold">{streak} Day Streak!</span>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white transition hover:text-red-400" title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Radar & Analytics */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-8"
        >
          <WeaknessRadarChart />
          <GamificationHub />
          
          <div className="bg-darker p-6 rounded-xl border border-neonTeal/20 shadow-lg">
            <h3 className="text-neonCyan font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/tutor')}
                className="w-full bg-neonTeal/10 hover:bg-neonTeal/20 text-neonCyan border border-neonCyan transition-all py-3 rounded-lg flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(102,252,241,0.2)] hover:shadow-[0_0_25px_rgba(102,252,241,0.4)]"
              >
                <BrainCircuit className="w-5 h-5" /> Ask Smart Tutor
              </button>
              <button 
                onClick={() => navigate('/revision')}
                className="w-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500 transition-all py-3 rounded-lg flex justify-center items-center gap-2"
              >
                <BookOpen className="w-5 h-5" /> Visual Revision Sheets
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Col: AI Daily Planner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-darker p-8 rounded-xl shadow-xl border border-neonTeal/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-neonCyan w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">AI Daily Planner</h2>
          </div>
          
          <div className="space-y-4">
            {dailyPlanner.map((task) => (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                key={task.id} 
                className="bg-dark p-4 rounded-lg border-l-4 border-neonCyan flex justify-between items-center cursor-pointer shadow-md"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-neonTeal font-bold">{task.type}</span>
                  <h4 className="text-lg text-white mt-1">{task.title}</h4>
                </div>
                <span className="text-gray-400 bg-gray-800 px-3 py-1 rounded-full text-sm">{task.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
