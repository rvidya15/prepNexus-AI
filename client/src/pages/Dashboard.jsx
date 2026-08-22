import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import SyllabusExplorer from '../components/dashboard/SyllabusExplorer';
import { useStudyStore } from '../store/useStudyStore';
import { useAuthStore } from '../store/useAuthStore';
import { useGamificationStore } from '../store/useGamificationStore';

const Dashboard = () => {
  const { fetchDashboardData } = useStudyStore();
  const user = useAuthStore((state) => state.user);
  const syncWithProfile = useGamificationStore((state) => state.syncWithProfile);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (user && user.gamification) {
      syncWithProfile(user.gamification);
    }
  }, [user, syncWithProfile]);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Banner */}
      <div className="bg-[#242424] p-8 text-white flex justify-between items-center relative overflow-hidden shadow-sm">
        {/* Decorative background curves */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[40px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] border-[20px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative z-10">
          <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Your Exam Focus</p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black">{user?.academicProfile?.targetExam || 'General Syllabus'}</h1>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        
        <div className="relative z-10 flex items-center gap-4">
          <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-bold text-sm shadow-sm hover:bg-gray-100 transition">
            UPGRADE
          </button>
        </div>
      </div>

      <div className="flex-1">
        <SyllabusExplorer />
      </div>
    </div>
  );
};

export default Dashboard;
