import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Headphones, BrainCircuit, Coffee } from 'lucide-react';

const FocusZone = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // focus, break
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };
  
  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col relative overflow-hidden p-8">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 h-full flex-1">
        
        {/* Left Col: Timer UI */}
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-12 rounded-[3rem] w-full max-w-md shadow-2xl flex flex-col items-center">
            
            {/* Mode Switcher */}
            <div className="flex gap-4 p-2 bg-white/5 rounded-full mb-12 border border-white/10">
              <button 
                onClick={() => switchMode('focus')}
                className={`px-6 py-2 rounded-full font-bold transition flex items-center gap-2 ${mode === 'focus' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <BrainCircuit className="w-4 h-4" /> Focus
              </button>
              <button 
                onClick={() => switchMode('break')}
                className={`px-6 py-2 rounded-full font-bold transition flex items-center gap-2 ${mode === 'break' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Coffee className="w-4 h-4" /> Break
              </button>
            </div>

            {/* Timer */}
            <div className="text-[7rem] font-black tracking-tighter tabular-nums leading-none mb-12 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              {formatTime(timeLeft)}
            </div>

            {/* Controls */}
            <div className="flex gap-6">
              <button 
                onClick={toggleTimer}
                className="w-20 h-20 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all hover:scale-105"
              >
                {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-2" />}
              </button>
              <button 
                onClick={resetTimer}
                className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-all hover:scale-105"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
            
          </div>
        </div>

        {/* Right Col: Lofi Player & Tasks */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Headphones className="w-8 h-8 text-indigo-400" /> Deep Focus Hub
            </h2>
            <p className="text-gray-400 text-lg">Immerse yourself. The AI Tutor is in strict mode and will only answer syllabus-related queries.</p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-black relative group">
            {/* Embedded Lofi Girl Live Stream */}
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&modestbranding=1" 
              title="Lofi Girl" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen"
            ></iframe>
            
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
               <span className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 font-bold tracking-widest text-indigo-300">LOFI BEATS TO STUDY TO</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FocusZone;
