import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Trophy } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const History = () => {
  const user = useAuthStore(state => state.user);

  // Mock data for history timeline (would come from user profile in a real app)
  const historyEvents = [
    { type: 'quiz', title: 'Weekly Quiz Completed', score: '85%', date: '2 days ago', icon: <Trophy className="w-5 h-5 text-yellow-500" /> },
    { type: 'revision', title: 'Revised: Quantum Physics', score: 'Mastered', date: '3 days ago', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
    { type: 'revision', title: 'Revised: Organic Chemistry', score: 'Needs Review', date: '5 days ago', icon: <Clock className="w-5 h-5 text-orange-500" /> },
    { type: 'onboarding', title: 'NexaPrep Journey Started', score: 'Welcome!', date: '1 week ago', icon: <CheckCircle2 className="w-5 h-5 text-indigo-500" /> },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-10 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center shadow-sm">
          <Clock className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Study History</h1>
          <p className="text-slate-500">Track your progress and past achievements</p>
        </div>
      </header>

      <div className="relative border-l-2 border-indigo-100 ml-6 space-y-10">
        {historyEvents.map((event, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-8"
          >
            <div className="absolute -left-3.5 top-1 bg-white p-1 rounded-full border border-indigo-100 shadow-sm">
              {event.icon}
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-indigo-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 text-lg">{event.title}</h3>
                <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{event.date}</span>
              </div>
              <p className="text-slate-600 font-medium">Result: <span className="text-indigo-600 font-bold">{event.score}</span></p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;
