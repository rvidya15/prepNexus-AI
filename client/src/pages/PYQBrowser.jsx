import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, TrendingUp, Sparkles, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuthStore } from '../store/useAuthStore';

const PYQBrowser = () => {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [year, setYear] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const user = useAuthStore(state => state.user);

  const handleAnalyze = async () => {
    if (!questionText) return setError('Please enter a question text');
    setIsLoading(true);
    setError('');
    try {
      const res = await api.post('/ai/pyq', {
        questionText,
        examMetadata: { examType: user?.academicProfile?.targetExam, year: year || 'Unknown' }
      });
      setAnalysis(res.data);
    } catch (e) {
      setError('AI Analysis failed or you are out of tokens.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 h-full">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <ArrowLeft className="w-6 h-6 text-indigo-600 cursor-pointer hover:text-indigo-500 transition" onClick={() => navigate('/')} />
          <h1 className="text-3xl font-bold flex items-center gap-3"><TrendingUp className="text-orange-500" /> PYQ Analyzer</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className=" bg-white p-6 rounded-xl border  border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-indigo-500">Submit Question</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Exam Year (Optional)</label>
                <input 
                  type="text" placeholder="e.g., 2023" value={year} onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-slate-50 border border-indigo-200 rounded-lg px-4 py-2 focus:outline-none focus:border-neonCyan transition"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Paste Previous Year Question</label>
                <textarea 
                  rows="6" placeholder="Paste the question text here..." value={questionText} onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full bg-slate-50 border border-indigo-200 rounded-lg px-4 py-2 focus:outline-none focus:border-neonCyan transition"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button 
                onClick={handleAnalyze} disabled={isLoading}
                className="w-full bg-neonCyan/10 text-indigo-600 border border-neonCyan hover:bg-neonCyan/20 transition py-3 rounded-lg flex justify-center items-center gap-2 font-bold disabled:opacity-50"
              >
                {isLoading ? <BrainCircuit className="animate-spin" /> : <Sparkles />}
                {isLoading ? 'Analyzing Patterns...' : 'Analyze Pattern & Predict'}
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {analysis ? (
              <div className="bg-white p-6 rounded-xl border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Sparkles className="text-orange-500" /> AI Insights</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-lg border border-indigo-100">
                    <p className="text-gray-400 text-sm mb-1">Expected Weightage</p>
                    <p className="text-2xl font-bold text-indigo-600">{analysis.expectedWeightage || 0}%</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-indigo-100">
                    <p className="text-gray-400 text-sm mb-1">Probability</p>
                    <p className="text-2xl font-bold text-orange-500">{analysis.probabilityTag || 'Unknown'}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-indigo-100">
                  <p className="text-gray-400 text-sm mb-2">Concept Breakdown</p>
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{analysis.conceptBreakdown}</p>
                </div>
              </div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-white rounded-xl border border-indigo-100 border-dashed">
                 <Search className="w-16 h-16 mb-4 opacity-20" />
                 <p className="text-center px-8">Paste a question to see its probability of appearing, expected marks, and core concepts.</p>
               </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PYQBrowser;
