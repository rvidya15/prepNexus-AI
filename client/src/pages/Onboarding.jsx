import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { BrainCircuit, Calendar, Target, BookOpen } from 'lucide-react';

const EXAM_OPTIONS = [
  "5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Board", 
  "11th Grade", "12th Board", "UPSC", "GATE", "CA", "JEE", "NEET", "Other Competitive Exam"
];

const Onboarding = () => {
  const navigate = useNavigate();
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const isLoading = useAuthStore((state) => state.isLoading);
  
  const [formData, setFormData] = useState({
    fullName: '',
    targetExam: '',
    examDate: '',
    subjects: '',
    studyDaysPerWeek: '',
    preparationStyle: '',
    specificGoals: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.targetExam) {
      setError('Please select your target exam.');
      return;
    }
    try {
      await updateProfile({
        fullName: formData.fullName || undefined,
        targetExam: formData.targetExam,
        examDate: formData.examDate || undefined,
        subjects: formData.subjects.split(',').map(s => s.trim()).filter(Boolean),
        studyDaysPerWeek: formData.studyDaysPerWeek || undefined,
        preparationStyle: formData.preparationStyle || undefined,
        specificGoals: formData.specificGoals || undefined
      });
      navigate('/');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-darker/90 backdrop-blur-xl border border-neonCyan/30 rounded-2xl shadow-[0_0_40px_rgba(102,252,241,0.15)] p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <BrainCircuit className="text-neonCyan w-12 h-12 mb-2" />
          <h2 className="text-3xl font-bold text-white">Welcome to PrepNexus-AI</h2>
          <p className="text-gray-400 mt-2 text-center">Let's tailor your AI tutor to your specific goals.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-neonTeal" /> Full Name (Optional)
            </label>
            <input 
              type="text" 
              placeholder="e.g., John Doe"
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-neonTeal" /> What exam are you preparing for?
            </label>
            <select 
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition"
              value={formData.targetExam}
              onChange={(e) => setFormData({...formData, targetExam: e.target.value})}
            >
              <option value="" disabled>Select your goal...</option>
              {EXAM_OPTIONS.map(exam => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neonTeal" /> When is the exam date? (Optional)
            </label>
            <input 
              type="date" 
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition [color-scheme:dark]"
              value={formData.examDate}
              onChange={(e) => setFormData({...formData, examDate: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-neonTeal" /> Primary Subjects (Comma separated, Optional)
            </label>
            <input 
              type="text" 
              placeholder="e.g., Mathematics, Physics, History"
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition"
              value={formData.subjects}
              onChange={(e) => setFormData({...formData, subjects: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2 text-sm">
                How many days per week can you study?
              </label>
              <input 
                type="number" 
                min="1"
                max="7"
                placeholder="e.g., 5"
                className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition"
                value={formData.studyDaysPerWeek}
                onChange={(e) => setFormData({...formData, studyDaysPerWeek: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2 text-sm">
                Preparation Style
              </label>
              <select 
                className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition"
                value={formData.preparationStyle}
                onChange={(e) => setFormData({...formData, preparationStyle: e.target.value})}
              >
                <option value="">Select style...</option>
                <option value="Self Study">Self Study</option>
                <option value="Crash Course">Crash Course</option>
                <option value="Deep Conceptual Dive">Deep Conceptual Dive</option>
                <option value="Exam Oriented Practice">Exam Oriented Practice</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
              Specific goals or weak areas? (Optional)
            </label>
            <textarea 
              rows="3"
              placeholder="e.g., I struggle with Organic Chemistry and need more practice problems."
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition"
              value={formData.specificGoals}
              onChange={(e) => setFormData({...formData, specificGoals: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-neonCyan text-dark font-bold py-3 rounded-xl hover:bg-neonTeal transition shadow-[0_0_15px_rgba(102,252,241,0.4)] disabled:opacity-50"
          >
            {isLoading ? 'Personalizing AI...' : 'Enter Workspace'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Onboarding;
