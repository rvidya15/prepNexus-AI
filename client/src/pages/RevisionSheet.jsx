import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Repeat, Map, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mermaid from 'mermaid';

import api from '../api/axiosConfig';

const RevisionSheet = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const [topicInput, setTopicInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [sheetData, setSheetData] = useState({
    topic: 'French Revolution',
    mermaidSyntax: `graph TD
      A[French Revolution] --> B(Economic Crisis)
      A --> C(Social Inequality)
      B --> E[High Taxes]
      C --> G[The Three Estates]`,
    flashcard: {
      question: 'What were the "Three Estates" in pre-revolutionary France?',
      answer: '1st: Clergy, 2nd: Nobility, 3rd: Commoners'
    }
  });

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'dark' });
    mermaid.contentLoaded();
  }, [sheetData.mermaidSyntax]);

  const handleGenerate = async () => {
    if(!topicInput.trim()) return;
    setIsGenerating(true);
    try {
      const res = await api.post('/ai/revision', { topic: topicInput });
      setSheetData({
        topic: topicInput,
        mermaidSyntax: res.data.mermaid_diagram_syntax,
        flashcard: res.data.flashcard
      });
      setTopicInput('');
      setFlipped(false);
    } catch(err) {
      console.error(err);
      alert('Failed to generate sheet');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 h-full">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition">
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-white">Visual Revision Sheet</h1>
        <span className="bg-neonCyan/20 text-neonCyan px-4 py-1 rounded-full text-sm border border-neonCyan/30">
          {sheetData.topic}
        </span>
      </header>

      <div className="mb-8 flex gap-4 max-w-xl">
        <input 
          type="text" 
          placeholder="Enter a new topic to generate (e.g., Photosynthesis)"
          value={topicInput}
          onChange={e => setTopicInput(e.target.value)}
          className="flex-1 bg-darker border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-neonCyan focus:outline-none"
        />
        <button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="bg-neonTeal text-dark px-4 py-2 rounded-lg font-bold hover:bg-neonCyan transition disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Magic Sheet'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Mermaid Mind Map Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darker p-6 rounded-xl border border-gray-700 shadow-xl"
        >
          <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
            <Map className="text-neonTeal w-5 h-5"/> Concept Mind Map
          </h3>
          <div className="bg-dark p-4 rounded-lg overflow-x-auto shadow-inner min-h-[300px] flex items-center justify-center">
            {isGenerating ? (
              <div className="text-neonCyan animate-pulse">Drawing neural pathways...</div>
            ) : (
              <div className="mermaid text-center" key={sheetData.mermaidSyntax}>
                {sheetData.mermaidSyntax}
              </div>
            )}
          </div>
        </motion.div>

        {/* Interactive Flashcard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-darker p-6 rounded-xl border border-gray-700 shadow-xl flex flex-col"
        >
          <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
            <Repeat className="text-orange-500 w-5 h-5"/> Active Recall Flashcard
          </h3>
          
          <div 
            className="relative w-full flex-1 min-h-[300px] cursor-pointer"
            onClick={() => setFlipped(!flipped)}
            style={{ perspective: '1000px' }}
          >
            <motion.div 
              className="w-full h-full absolute inset-0 preserve-3d"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                className="absolute inset-0 w-full h-full bg-dark border-2 border-neonTeal/30 rounded-xl flex items-center justify-center p-8 text-center backface-hidden shadow-[0_0_20px_rgba(69,162,158,0.1)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h2 className="text-2xl text-white font-semibold">{sheetData?.flashcard?.question || "Question not available."}</h2>
              </div>

              <div 
                className="absolute inset-0 w-full h-full bg-neonTeal/10 border-2 border-neonTeal rounded-xl flex items-center justify-center p-8 text-center backface-hidden shadow-[0_0_30px_rgba(69,162,158,0.3)]"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="text-white text-lg">
                  <p>{sheetData?.flashcard?.answer || "Please try regenerating the sheet."}</p>
                </div>
              </div>
            </motion.div>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">Click the card to flip</p>
        </motion.div>

      </div>
    </div>
  );
};

export default RevisionSheet;
