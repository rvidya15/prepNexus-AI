import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { BrainCircuit, Calendar, Target, BookOpen, Clock, Lightbulb } from 'lucide-react';

const EXAM_OPTIONS = [
  "5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Board", 
  "11th Grade", "12th Board", "UPSC", "GATE", "CA", "JEE", "NEET", "Other Competitive Exam"
];

const Onboarding = () => {
  const navigate = useNavigate();
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const isLoading = useAuthStore((state) => state.isLoading);
  
  const [formData, setFormData] = useState({
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
        targetExam: formData.targetExam,
        examDate: formData.examDate || undefined,
        subjects: formData.subjects.split(',').map(s => s.trim()).filter(Boolean),
        studyDaysPerWeek: formData.studyDaysPerWeek || undefined,
        preparationStyle: formData.preparationStyle || undefined,
        specificGoals: formData.specificGoals || undefined
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-indigo-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 relative z-10 my-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <BrainCircuit className="text-indigo-600 w-8 h-8" />
          </div>
          <h2 className="text-4xl font-extrabold text-center text-slate-900 tracking-tight mb-2">Configure Your Co-Pilot</h2>
          <p className="text-slate-500 mt-2 text-center text-lg">Let's tailor the NexaPrep AI to your exact syllabus and goals.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-indigo-500" /> What exam are you preparing for?
              </label>
              <select 
                className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
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
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-indigo-500" /> Exam Date (Optional)
              </label>
              <input 
                type="date" 
                className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
                value={formData.examDate}
                onChange={(e) => setFormData({...formData, examDate: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-indigo-500" /> Study Days per Week
              </label>
              <input 
                type="number" 
                min="1"
                max="7"
                placeholder="e.g., 5"
                className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
                value={formData.studyDaysPerWeek}
                onChange={(e) => setFormData({...formData, studyDaysPerWeek: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-indigo-500" /> Primary Subjects (Comma separated, Optional)
              </label>
              <input 
                type="text" 
                placeholder="e.g., Mathematics, Physics, History"
                className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
                value={formData.subjects}
                onChange={(e) => setFormData({...formData, subjects: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2 text-sm">
                <Lightbulb className="w-4 h-4 text-indigo-500" /> Preparation Style
              </label>
              <select 
                className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
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
            <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2 text-sm">
              Specific goals or weak areas? (Optional)
            </label>
            <textarea 
              rows="3"
              placeholder="e.g., I struggle with Organic Chemistry and need more practice problems."
              className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
              value={formData.specificGoals}
              onChange={(e) => setFormData({...formData, specificGoals: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-600 text-slate-800 font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-50 mt-4 text-lg"
          >
            {isLoading ? 'Personalizing AI...' : 'Enter Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Onboarding;
