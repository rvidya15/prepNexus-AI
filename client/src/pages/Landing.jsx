import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, BookOpen, Clock, PlayCircle, Sparkles, TrendingUp } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Omnipresent AI Guide",
      description: "More than a tutor. Your personal mentor for stress relief, schedule building, and instant doubt resolution.",
      icon: <BrainCircuit className="w-8 h-8 text-indigo-500" />
    },
    {
      title: "Spaced Repetition System",
      description: "Powered by the SuperMemo-2 algorithm. We automatically schedule your revisions so you never forget a topic.",
      icon: <Clock className="w-8 h-8 text-neonTeal" />
    },
    {
      title: "PYQ Trend Analyzer",
      description: "We analyze thousands of Previous Year Questions to predict what will appear on your next exam.",
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />
    },
    {
      title: "YouTube AI Integration",
      description: "Paste a lecture URL. Our AI instantly reads the transcript and answers any questions you have about the video.",
      icon: <PlayCircle className="w-8 h-8 text-red-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-indigo-200">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-indigo-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold tracking-tight text-slate-800">NexaPrep</span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Decorative Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-semibold mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" /> The Future of Learning is Here
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 leading-tight">
              Your Personal AI <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Academic Co-Pilot
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              NexaPrep uses Spaced Repetition, Trend Analysis, and an omnipresent AI Guide to guarantee you ace your next exam without the stress.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-[0_10px_40px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_50px_rgba(79,70,229,0.6)] transition-all transform hover:-translate-y-1"
              >
                Get Started for Free
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Everything you need to succeed</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We replaced rigid learning with an intelligent platform that adapts to your brain, your syllabus, and your stress levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 p-8 rounded-3xl border border-indigo-100 shadow-sm hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <BrainCircuit className="w-16 h-16 text-indigo-400 mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to revolutionize your studies?</h2>
          <p className="text-xl text-slate-300 mb-12">
            Join NexaPrep today and let our AI guide you to the top 1%.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="px-10 py-5 rounded-full font-bold text-lg text-slate-900 bg-white hover:bg-indigo-50 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-1"
          >
            Enter the Platform
          </button>
        </div>
      </section>

    </div>
  );
};

export default Landing;
