import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Brain, Network, Timer, MessageSquare, 
  Target, Zap, ShieldCheck, ArrowRight, Sparkles, BookOpen, ChevronRight, CheckCircle2
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    { 
      icon: <Network className="w-8 h-8 text-indigo-500" />, 
      title: "AI Magic Sheets", 
      desc: "Instantly generate visual mind-maps and high-yield flashcards for any topic using our advanced AI engine.",
      color: "bg-indigo-50"
    },
    { 
      icon: <Brain className="w-8 h-8 text-pink-500" />, 
      title: "Smart Flashcards", 
      desc: "Tinder-style swipeable flashcards utilizing active recall and spaced repetition to help you memorize 4x faster.",
      color: "bg-pink-50"
    },
    { 
      icon: <Timer className="w-8 h-8 text-orange-500" />, 
      title: "Focus Zone", 
      desc: "Immerse yourself with built-in Pomodoro timers and Lofi beats. Stay in the zone with zero distractions.",
      color: "bg-orange-50"
    },
    { 
      icon: <MessageSquare className="w-8 h-8 text-emerald-500" />, 
      title: "Socratic AI Tutor", 
      desc: "A floating 24/7 tutor that guides you to the answer instead of just spoon-feeding it. True conceptual clarity.",
      color: "bg-emerald-50"
    },
    { 
      icon: <Target className="w-8 h-8 text-blue-500" />, 
      title: "Master Syllabus", 
      desc: "Track your completion percentage across your entire syllabus with automated progress bars and AI-curated notes.",
      color: "bg-blue-50"
    },
    { 
      icon: <BookOpen className="w-8 h-8 text-purple-500" />, 
      title: "Smart Resources", 
      desc: "AI recommends the best books and creates a tailored overview of your specific target exam syllabus.",
      color: "bg-purple-50"
    }
  ];

  const benefits = [
    "Retain information 4x longer with Active Recall",
    "Eliminate context-switching with built-in study tools",
    "Identify weak points instantly with AI PYQ Analysis",
    "Stay motivated with visual completion tracking"
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-[#5a4bda] rounded-xl p-2 shadow-lg shadow-indigo-200">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">NexaPrep AI</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-5 py-2 text-gray-600 font-bold hover:text-gray-900 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-6 py-2 rounded-full bg-[#5a4bda] text-white font-bold hover:bg-[#483ab4] transition-all shadow-lg shadow-indigo-200 hover:-translate-y-0.5"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-[160px] pb-24 px-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-40 -right-20 w-[400px] h-[400px] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-sm mb-8 animate-bounce">
            <Sparkles className="w-4 h-4" /> The Future of Learning is Here
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
            Don't just study hard. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5a4bda] to-[#ff4b91]">
              Study smart with AI.
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            NexaPrep is an all-in-one AI study companion that turns any syllabus into interactive mind-maps, smart flashcards, and a hyper-focused study environment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#5a4bda] text-white font-bold text-lg hover:bg-[#483ab4] transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
            >
              Start Learning Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-bold text-lg hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* App Preview / Benefits Section */}
      <section className="max-w-[1200px] mx-auto px-6 pb-32">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-black mb-6 text-slate-900">Why switch to NexaPrep?</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Traditional studying relies on passive reading. NexaPrep forces active engagement through AI-generated questions, visual maps, and distraction-free zones.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="font-semibold text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-inner relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5a4bda]/5 to-transparent rounded-2xl pointer-events-none"></div>
            {/* Mockup of UI */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group-hover:shadow-md transition-shadow">
              <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="h-8 w-24 bg-indigo-100 rounded-full"></div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
                  <div className="h-3 w-4/6 bg-slate-100 rounded"></div>
                </div>
                <div className="h-32 w-full bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center">
                  <Network className="w-8 h-8 text-indigo-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-white py-32 border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">An Arsenal of AI Tools</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Everything you need to crack your toughest exams, packaged into one beautiful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all group">
                <div className={`w-16 h-16 rounded-2xl ${feat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5a4bda]/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to crush your goals?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Join the platform that is changing how students interact with their syllabus. Stop guessing and start progressing.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="px-10 py-4 rounded-full bg-white text-[#5a4bda] font-black text-xl hover:bg-slate-100 hover:scale-105 transition-all shadow-2xl"
          >
            Create Your Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-900 font-black">
            <Brain className="w-5 h-5 text-[#5a4bda]" /> NexaPrep AI
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Built for students who want to study smarter.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
