import React, { useState } from 'react';
import { BrainCircuit, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Flashcards = () => {
  const [cards, setCards] = useState([
    { id: 1, front: "What is the primary objective of the monetary policy of India?", back: "To maintain price stability while keeping in mind the objective of growth.", subject: "Economy" },
    { id: 2, front: "Explain the difference between Fundamental Rights and Directive Principles.", back: "Fundamental Rights are justiciable (enforceable by courts), while Directive Principles are non-justiciable guidelines for the state.", subject: "Polity" },
    { id: 3, front: "What was the main outcome of the Battle of Buxar (1764)?", back: "The British East India Company gained the Diwani rights (right to collect revenue) of Bengal, Bihar, and Orissa.", subject: "Modern History" }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Decorative */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="text-center mb-10 z-10">
        <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 font-bold rounded-full text-xs uppercase tracking-widest mb-4 inline-block">Spaced Repetition</span>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Smart Flashcards</h1>
        <p className="text-gray-500 font-medium">Reviewing {cards.length} cards due today from your weak topics.</p>
      </div>

      <div className="relative w-full max-w-2xl h-[400px] z-10 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id + (isFlipped ? '-back' : '-front')}
            initial={{ rotateX: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 w-full h-full rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer shadow-xl border-2 ${isFlipped ? 'bg-indigo-600 border-indigo-700 text-white' : 'bg-white border-gray-100 text-gray-800'}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {!isFlipped && (
              <span className="absolute top-6 left-6 px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-bold uppercase">
                {currentCard.subject}
              </span>
            )}
            
            <h2 className={`text-3xl font-bold leading-snug ${isFlipped ? 'text-white' : 'text-gray-900'}`}>
              {isFlipped ? currentCard.back : currentCard.front}
            </h2>
            
            <div className={`absolute bottom-6 flex items-center gap-2 text-sm font-bold opacity-50 ${isFlipped ? 'text-indigo-200' : 'text-gray-400'}`}>
              <RefreshCw className="w-4 h-4" /> Tap to flip
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-6 mt-12 z-10">
        <button 
          onClick={handleNext}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all shadow-md group-hover:shadow-red-500/30">
            <XCircle className="w-8 h-8" />
          </div>
          <span className="font-bold text-gray-500 text-sm group-hover:text-red-500 transition-colors">Forgot</span>
        </button>

        <button 
          onClick={handleNext}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-md group-hover:shadow-emerald-500/30">
            <CheckCircle className="w-8 h-8" />
          </div>
          <span className="font-bold text-gray-500 text-sm group-hover:text-emerald-500 transition-colors">Remembered</span>
        </button>
      </div>

    </div>
  );
};

export default Flashcards;
