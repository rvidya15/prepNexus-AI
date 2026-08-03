import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useStudyStore } from '../../store/useStudyStore';

const WeaknessRadarChart = () => {
  const weaknesses = useStudyStore((state) => state.weaknesses);

  return (
    <div className="w-full h-64 bg-darker rounded-xl p-4 shadow-lg border border-neonTeal/20">
      <h3 className="text-neonCyan font-semibold mb-2">Subject Mastery (Weakness Radar)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={weaknesses}>
          <PolarGrid stroke="#45A29E" opacity={0.3} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#C5C6C7', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Mastery" dataKey="mastery" stroke="#66FCF1" fill="#66FCF1" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeaknessRadarChart;
