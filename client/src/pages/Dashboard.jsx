import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, BrainCircuit, Trophy, Target, Sparkles, TrendingUp, BookOpen, Clock } from 'lucide-react';
import SyllabusExplorer from '../components/dashboard/SyllabusExplorer';
import { useStudyStore } from '../store/useStudyStore';
import { useAuthStore } from '../store/useAuthStore';
import { useGamificationStore } from '../store/useGamificationStore';

const Dashboard = () => {
  const { fetchDashboardData, streak } = useStudyStore();
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

  // Daily Motivational Quotes
  const quotes = [
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't stop when you're tired. Stop when you're done.",
    "Your future is created by what you do today, not tomorrow.",
    "Discipline is choosing between what you want now, and what you want most.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The difference between ordinary and extraordinary is that little extra.",
    "Push yourself, because no one else is going to do it for you."
  ];
  // Pick a quote based on the day of the year so it stays consistent for the day
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const dailyQuote = quotes[dayOfYear % quotes.length];

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-screen">
      
      {/* Impressive Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 mb-8 shadow-2xl">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-white flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-indigo-200 font-semibold tracking-wide uppercase text-sm">Welcome back to the grind</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
              {user?.username ? `Ready to conquer, ${user.username}?` : 'Ready to conquer your exam?'}
            </h1>
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 mb-4">
              <p className="text-indigo-100 italic text-sm font-medium">"{dailyQuote}"</p>
            </div>
            <p className="text-indigo-100/80 text-[15px] max-w-xl leading-relaxed">
              Your target is <strong className="text-white">{user?.academicProfile?.targetExam || 'your ultimate goal'}</strong>. Select a subject below to dive into your personalized AI syllabus and keep your streak alive!
            </p>
          </div>
          
          {/* Quick Stats Grid inside Banner */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px]">
              <Flame className="w-8 h-8 text-orange-400 mb-2" />
              <span className="text-2xl font-bold text-white">{streak || 0}</span>
              <span className="text-xs text-indigo-200 uppercase font-bold tracking-wider">Day Streak</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px]">
              <BrainCircuit className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-2xl font-bold text-white">{user?.aiTokens || 20}</span>
              <span className="text-xs text-indigo-200 uppercase font-bold tracking-wider">AI Tokens</span>
            </div>
            <div className="hidden lg:flex bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex-col items-center justify-center min-w-[120px]">
              <Target className="w-8 h-8 text-pink-400 mb-2" />
              <span className="text-2xl font-bold text-white">0%</span>
              <span className="text-xs text-indigo-200 uppercase font-bold tracking-wider">Completion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Column: Syllabus (Takes up 3/4 width on large screens) */}
        <div className="xl:col-span-3">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Master Syllabus</h2>
          </div>
          {/* The visually stunning PW-style Subject Grid */}
          <SyllabusExplorer />
        </div>
        
        {/* Right Column: AI Recommendations & Activity (Makes dashboard look "complete") */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* AI Recommended Topic */}
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-50 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-500" /> AI Pick
                </h3>
                <span className="px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase">High Yield</span>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Modern History: Indian National Movement</h4>
              <p className="text-sm text-gray-500 mb-4">Based on your recent tests, you need to review the events between 1905 and 1919.</p>
              <button className="w-full py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 transition">
                Start Studying
              </button>
            </div>
          </div>

          {/* Up Next / Schedule */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" /> Scheduled Revisions
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-gray-50">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Fundamental Rights</p>
                  <p className="text-xs text-gray-500">Polity • Due today</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-gray-50">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Earthquake Waves</p>
                  <p className="text-xs text-gray-500">Geography • Overdue</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Photosynthesis</p>
                  <p className="text-xs text-gray-500">Biology • Tomorrow</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
