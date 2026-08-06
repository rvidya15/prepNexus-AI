import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { motion } from 'framer-motion';

const Background = () => {
  const { theme } = useThemeStore();

  return (
    <div className={`fixed inset-0 z-[-1] transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0B0C10]' : 'bg-[#F8FAFC]'}`}>
      {/* Animated Glowing Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 ${theme === 'dark' ? 'bg-neonCyan/30' : 'bg-blue-400/40'}`}
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-20 ${theme === 'dark' ? 'bg-neonTeal/30' : 'bg-indigo-400/30'}`}
      />
      
      {/* Mesh Overlay for Texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDEyOCwxMjgsMTI4LDAuMDUpIiAvPgo8L3N2Zz4=')] mix-blend-overlay opacity-50" />
    </div>
  );
};

export default Background;
