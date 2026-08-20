import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MonitorPlay, BookOpen, Clock, PlayCircle, Trophy, Sparkles, 
  ChevronRight, FileText, LayoutGrid, CheckCircle2, Bookmark, HelpCircle
} from 'lucide-react';
import SyllabusExplorer from '../components/dashboard/SyllabusExplorer';
import { useStudyStore } from '../store/useStudyStore';
import { useAuthStore } from '../store/useAuthStore';
import { useGamificationStore } from '../store/useGamificationStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { fetchDashboardData } = useStudyStore();
  const user = useAuthStore((state) => state.user);
  const syncWithProfile = useGamificationStore((state) => state.syncWithProfile);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'classes'

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (user && user.gamification) {
      syncWithProfile(user.gamification);
    }
  }, [user, syncWithProfile]);

  const studyZone = [
    { title: "My Batches", desc: "View list of batches in which you are enr...", icon: <MonitorPlay className="w-6 h-6 text-[#5a4bda]" /> },
    { title: "Dashboard", desc: "Track your progress through detailed pe...", icon: <LayoutGrid className="w-6 h-6 text-[#5a4bda]" /> },
    { title: "Library", desc: "Access all your free material here", icon: <BookOpen className="w-6 h-6 text-[#5a4bda]" /> },
    { title: "My History", desc: "View your recent learning here", icon: <Clock className="w-6 h-6 text-[#5a4bda]" /> },
    { title: "Bookmarks", desc: "View the list of your saved questions", icon: <Bookmark className="w-6 h-6 text-[#5a4bda]" /> },
    { title: "PDF Bank", desc: "Download your Study PDFs from here", icon: <FileText className="w-6 h-6 text-[#5a4bda]" /> },
  ];

  const batchOfferings = [
    { title: "All Classes", icon: <BookOpen className="w-5 h-5 text-white" />, color: "bg-blue-500", onClick: () => setActiveTab('classes') },
    { title: "All Tests", icon: <FileText className="w-5 h-5 text-white" />, color: "bg-indigo-500" },
    { title: "My Doubts", icon: <HelpCircle className="w-5 h-5 text-white" />, color: "bg-purple-500" },
    { title: "Pi", icon: <span className="font-bold text-white">pi</span>, color: "bg-blue-400" },
    { title: "Mentorship", icon: <CheckCircle2 className="w-5 h-5 text-white" />, color: "bg-indigo-400" },
    { title: "Mains Practice", icon: <FileText className="w-5 h-5 text-white" />, color: "bg-purple-400" },
  ];

  if (activeTab === 'classes') {
    return (
      <div className="flex flex-col h-full bg-[#f8f9fa]">
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4">
          <button onClick={() => setActiveTab('dashboard')} className="text-gray-500 hover:text-gray-900 transition flex items-center gap-2">
            &larr; <span className="font-semibold text-lg">All Classes</span>
          </button>
        </div>
        <SyllabusExplorer />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-screen">
      
      {/* Top Banner */}
      <div className="bg-[#242424] rounded-2xl p-8 mb-10 text-white flex justify-between items-center relative overflow-hidden shadow-lg">
        {/* Decorative background curves */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[40px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] border-[20px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative z-10">
          <p className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Your Batch</p>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black">{user?.academicProfile?.targetExam || 'UPSC PRARAMBH 2026'}</h1>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        
        <div className="relative z-10 flex items-center gap-4">
          <button className="px-6 py-2.5 bg-white text-gray-900 rounded-full font-bold text-sm shadow-sm hover:bg-gray-100 transition">
            UPGRADE
          </button>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
            <span className="font-bold text-xl leading-none mb-2">...</span>
          </div>
        </div>
      </div>

      {/* Batch Offerings */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Batch Offerings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {batchOfferings.map((item, idx) => (
            <div 
              key={idx} 
              onClick={item.onClick}
              className="bg-white rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>
                <span className="font-semibold text-gray-800">{item.title}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* My Study Zone */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">My Study Zone</h2>
          <button className="px-4 py-2 border border-[#5a4bda] text-[#5a4bda] rounded-lg text-sm font-semibold hover:bg-[#f4f2ff] transition">
            View Weekly Schedule
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyZone.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="text-sm font-bold text-gray-600 hover:text-gray-900 underline decoration-gray-400 underline-offset-4">
            Show More
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
