import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Trophy, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const WeeklyQuiz = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic) return setError('Please enter a topic to generate a quiz on.');
    setIsLoading(true); setError('');
    try {
      const res = await api.post('/ai/quiz', { topic });
      setQuizData(res.data);
      setCurrentQIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
    } catch (e) {
      setError('Failed to generate quiz. Make sure you have enough AI tokens.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (option) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQIndex]: option });
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="p-8 h-full">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <ArrowLeft className="w-6 h-6 text-neonCyan cursor-pointer hover:text-neonTeal transition" onClick={() => navigate('/')} />
          <h1 className="text-3xl font-bold flex items-center gap-3"><Trophy className="text-yellow-400" /> Weekly AI Quiz</h1>
        </header>

        {!quizData ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-darker p-8 rounded-xl border border-gray-800 text-center">
            <Target className="w-16 h-16 text-neonCyan mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Generate Your Quiz</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">Enter a topic you studied this week. The AI will instantly generate a tailored 5-question multiple choice quiz based on your profile.</p>
            
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="text" placeholder="e.g., Thermodynamics, World War 2" value={topic} onChange={(e) => setTopic(e.target.value)}
                className="flex-1 bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-neonCyan transition"
              />
              <button 
                onClick={handleGenerate} disabled={isLoading}
                className="bg-neonCyan text-dark font-bold px-6 py-3 rounded-lg hover:bg-neonTeal transition disabled:opacity-50"
              >
                {isLoading ? 'Generating...' : 'Start'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-darker p-8 rounded-xl border border-gray-800">
            {!isSubmitted ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-neonCyan font-bold">Question {currentQIndex + 1} of {quizData.length}</span>
                  <div className="flex gap-2">
                    {quizData.map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i === currentQIndex ? 'bg-neonCyan' : selectedAnswers[i] ? 'bg-neonTeal/50' : 'bg-gray-700'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-6">{quizData[currentQIndex].question}</h3>

                <div className="space-y-3 mb-8">
                  {quizData[currentQIndex].options.map((opt, i) => (
                    <div 
                      key={i} onClick={() => handleSelect(opt)}
                      className={`p-4 rounded-lg cursor-pointer border transition ${selectedAnswers[currentQIndex] === opt ? 'bg-neonCyan/10 border-neonCyan' : 'bg-dark border-gray-700 hover:border-gray-500'}`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button 
                    disabled={currentQIndex === 0} onClick={() => setCurrentQIndex(prev => prev - 1)}
                    className="px-6 py-2 rounded-lg border border-gray-600 disabled:opacity-30"
                  >
                    Previous
                  </button>
                  
                  {currentQIndex === quizData.length - 1 ? (
                    <button 
                      onClick={() => setIsSubmitted(true)}
                      className="bg-neonCyan text-dark font-bold px-6 py-2 rounded-lg"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="bg-gray-700 text-white font-bold px-6 py-2 rounded-lg"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
                <p className="text-xl mb-8">You scored <span className="text-neonCyan font-bold">{calculateScore()}</span> out of {quizData.length}</p>
                
                <div className="space-y-6 text-left max-w-2xl mx-auto">
                  {quizData.map((q, i) => {
                    const isCorrect = selectedAnswers[i] === q.answer;
                    return (
                      <div key={i} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                        <p className="font-semibold mb-2">{q.question}</p>
                        <p className="text-sm flex items-center gap-2 mb-2">
                          Your Answer: {selectedAnswers[i] || 'Skipped'} 
                          {isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                        </p>
                        {!isCorrect && <p className="text-sm text-green-400 mb-2">Correct Answer: {q.answer}</p>}
                        <p className="text-xs text-gray-400 bg-dark p-2 rounded">{q.explanation}</p>
                      </div>
                    )
                  })}
                </div>
                
                <button onClick={() => setQuizData(null)} className="mt-8 bg-neonCyan text-dark font-bold px-8 py-3 rounded-lg">
                  Take Another Quiz
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WeeklyQuiz;
