import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Snowflake, Zap, Star } from 'lucide-react';
import { useGamificationStore } from '../../store/useGamificationStore';

const GamificationHub = () => {
  const { xp, level, freezeTokens, badges } = useGamificationStore();
  const xpProgress = (xp % 1000) / 10; // Percentage to next level (0-100)

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-indigo-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-yellow-500 font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5" /> Player Stats
        </h3>
        <div className="flex gap-2">
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
            <Snowflake className="w-3 h-3" /> {freezeTokens} Freezes
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-textLight mb-2">
          <span className="font-semibold text-slate-800">Level {level}</span>
          <span>{xp} Total XP</span>
        </div>
        {/* Animated XP Bar */}
        <div className="w-full bg-indigo-50 h-3 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full rounded-full"
          />
        </div>
        <p className="text-xs text-right mt-1 text-gray-500">{1000 - (xp % 1000)} XP to next level</p>
      </div>

      <div>
        <h4 className="text-sm text-gray-400 mb-3 flex items-center gap-1"><Star className="w-4 h-4"/> Badges Earned</h4>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, idx) => (
            <span key={idx} className="bg-indigo-50 text-yellow-600 text-xs px-3 py-2 rounded-lg border border-yellow-200 flex items-center gap-2 shadow-sm font-medium">
              <Zap className="w-3 h-3 text-yellow-500"/> {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationHub;
