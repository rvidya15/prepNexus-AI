import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useStudyStore } from '../../store/useStudyStore';

const WeaknessRadarChart = () => {
  const weaknesses = useStudyStore((state) => state.weaknesses);

  return (
    <div className="w-full h-72 dark:bg-darker/80 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border dark:border-neonTeal/20 border-indigo-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <h3 className="dark:text-neonCyan text-indigo-600 font-bold mb-4 text-lg tracking-tight">Subject Mastery</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={weaknesses}>
          <PolarGrid stroke="#818cf8" opacity={0.4} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Mastery" dataKey="mastery" stroke="#6366f1" fill="#818cf8" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeaknessRadarChart;
