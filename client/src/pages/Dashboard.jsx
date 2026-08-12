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
            <BrainCircuit className="text-neonCyan w-5 h-5" />
            <span className="text-neonCyan font-bold">{user?.aiTokens ?? 20} Tokens</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-orange-500/30 shadow-sm">
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
        </motion.div>

        {/* Right Col: AI Daily Planner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-indigo-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-indigo-600 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-900">Spaced Repetition Schedule</h2>
          </div>
          
          <div className="space-y-4">
            {user?.srsTopics?.length > 0 ? (
              user.srsTopics.slice().sort((a,b) => new Date(a.nextRevisionDate) - new Date(b.nextRevisionDate)).map((task, idx) => {
                const isDue = new Date(task.nextRevisionDate) <= new Date();
                return (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    key={idx} 
                    className={`p-4 rounded-lg border-l-4 flex justify-between items-center shadow-md ${isDue ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-indigo-500'}`}
                  >
                    <div>
                      <span className={`text-xs uppercase tracking-wider font-bold ${isDue ? 'text-red-500' : 'text-indigo-500'}`}>
                        {isDue ? 'DUE TODAY' : 'UPCOMING'}
                      </span>
                      <h4 className="font-semibold text-gray-800 text-lg">{task.topicName}</h4>
                      <p className="text-xs text-gray-500">Next Review: {new Date(task.nextRevisionDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {isDue && (
                        <button 
                          onClick={() => {
                            alert("To complete this review, chat with the NexaPrep Guide!");
                          }}
                          className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition text-sm"
                        >
                          Review Now
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className="text-center p-8 text-gray-500 border border-dashed border-gray-400 rounded-lg">
                No topics scheduled for revision. Ask the NexaPrep Guide to schedule a revision for you!
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
