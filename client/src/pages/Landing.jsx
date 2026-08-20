import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Video, FileText, Clock, MapPin, 
  ArrowRight, Search, Phone
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "15 Million+", label: "Happy Students", bgColor: "bg-[#fff7e6]" },
    { number: "24000+", label: "Mock Tests", bgColor: "bg-[#ffe6e6]" },
    { number: "14000+", label: "Video Lectures", bgColor: "bg-[#e6f7ff]" },
    { number: "80000+", label: "Practice Papers", bgColor: "bg-[#f2e6ff]" }
  ];

  const features = [
    { icon: <Video className="w-8 h-8 text-[#ff4b4b]" />, title: "Daily Live", desc: "Interactive classes" },
    { icon: <FileText className="w-8 h-8 text-blue-400" />, title: "10 Million +", desc: "Tests, sample papers & notes" },
    { icon: <Clock className="w-8 h-8 text-purple-500" />, title: "24 x 7", desc: "Doubt solving sessions" },
    { icon: <MapPin className="w-8 h-8 text-yellow-500" />, title: "100 +", desc: "Offline centres" },
  ];

  const examCategories = [
    { title: "NEET", tags: ["Class 11", "Class 12", "Dropper"], icon: "bg-red-50", text: "text-red-500" },
    { title: "IIT JEE", tags: ["Class 11", "Class 12", "Dropper"], icon: "bg-yellow-50", text: "text-yellow-500" },
    { title: "Pre Foundation", tags: [], icon: "bg-orange-50", text: "text-orange-500" },
    { title: "School Boards", tags: ["CBSE", "ICSE", "UP Board", "Maharashtra Board"], icon: "bg-green-50", text: "text-green-500" },
    { title: "UPSC", tags: [], icon: "bg-blue-50", text: "text-blue-500" },
    { title: "Govt Job Exams", tags: ["SSC", "Banking", "Teaching", "Judiciary"], icon: "bg-purple-50", text: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-gray-900 rounded-full p-2 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-6 font-semibold text-[15px] text-gray-700">
              <div className="px-4 py-2 border border-[#5a4bda] text-[#5a4bda] rounded flex items-center gap-2 cursor-pointer">
                All Courses <span className="text-[10px]">▼</span>
              </div>
              <a href="#" className="hover:text-[#5a4bda]">NexaPrep Centres</a>
              <a href="#" className="hover:text-[#5a4bda]">Skills</a>
              <a href="#" className="hover:text-[#5a4bda]">Store</a>
              <a href="#" className="hover:text-[#5a4bda]">Class 1st - 8th</a>
              <a href="#" className="hover:text-[#5a4bda]">Power Batch</a>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 rounded bg-[#1f2937] text-white font-semibold hover:bg-black transition-colors"
          >
            Login/Register
          </button>
        </div>
        {/* Thin orange accent line */}
        <div className="h-0.5 bg-yellow-400 w-full"></div>
      </nav>

      {/* Hero Section */}
      <section className="pt-[140px] pb-16 max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-[44px] leading-[1.1] font-bold text-gray-900 mb-4 tracking-tight">
            Bharat's <span className="text-[#5a4bda]">Trusted & Affordable</span> Educational Platform
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Unlock your potential by signing up with NexaPrep- The most affordable learning solution
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="px-10 py-3.5 rounded-lg bg-[#5a4bda] text-white font-bold text-lg hover:bg-[#483ab4] transition-colors shadow-lg shadow-indigo-200"
          >
            Get Started
          </button>
        </div>
        
        {/* Abstract Hero Image Area */}
        <div className="relative h-[400px] flex items-center justify-center">
          {/* Dashed circular rings */}
          <div className="absolute w-[350px] h-[350px] rounded-full border-2 border-dashed border-gray-200 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[250px] h-[250px] rounded-full border-2 border-dashed border-gray-200 animate-[spin_40s_linear_infinite_reverse]"></div>
          
          {/* Mock Avatars */}
          <div className="absolute z-10 -left-4 w-32 h-32 bg-indigo-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-slate-200 flex flex-col justify-end items-center">
                <div className="w-16 h-16 bg-slate-300 rounded-full mb-2"></div>
                <div className="w-24 h-12 bg-slate-400 rounded-t-full"></div>
             </div>
          </div>
          
          <div className="absolute z-10 top-4 right-8 w-40 h-40 bg-pink-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-slate-200 flex flex-col justify-end items-center">
                <div className="w-20 h-20 bg-slate-300 rounded-full mb-2"></div>
                <div className="w-32 h-16 bg-slate-400 rounded-t-full"></div>
             </div>
          </div>

          {/* Chat bubbles */}
          <div className="absolute z-20 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 text-sm font-semibold right-0 top-1/2 -translate-y-12">
            NexaPrep Sir, What is AI?
          </div>
          <div className="absolute z-20 bg-[#2b1f4b] text-white px-4 py-2 rounded-xl shadow-lg text-[11px] max-w-[200px] bottom-1/4 left-1/4">
            NexaPrep is where students learn with AI and can grow with guidance
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-wrap justify-between p-8">
          {features.map((feature, idx) => (
            <div key={idx} className={`flex-1 flex flex-col items-center text-center px-4 ${idx !== features.length - 1 ? 'border-r border-gray-100' : ''} min-w-[200px] py-4`}>
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg">{feature.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 text-center border-t border-gray-100">
        <h2 className="text-[32px] font-bold text-gray-900 mb-2">A Platform Trusted by Students Worldwide</h2>
        <p className="text-gray-500 mb-12">Don't Just Take Our Word for It. Delve into the Numbers and Witness the Excellence for Yourself!</p>
        
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.bgColor} rounded-2xl p-10 flex flex-col items-center justify-center transition-transform hover:-translate-y-2`}>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <button onClick={() => navigate('/login')} className="px-12 py-3.5 rounded bg-[#5a4bda] text-white font-bold text-lg hover:bg-[#483ab4] transition-colors shadow-lg shadow-indigo-200">
            Get Started
          </button>
        </div>
      </section>

      {/* Exam Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-gray-900 mb-3">Exam Categories</h2>
            <p className="text-gray-500">NexaPrep is preparing students for 35+ exam categories. Scroll down to find the one you are preparing for</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examCategories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                {/* Curved background decor */}
                <div className={`absolute top-0 right-0 w-32 h-full ${cat.icon} rounded-l-full -mr-16 group-hover:-mr-12 transition-all`}></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-8 flex-1">
                    {cat.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full border border-gray-200 text-xs font-semibold text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                    Explore Category <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="text-[#5a4bda] font-medium text-sm underline decoration-[#5a4bda] underline-offset-4 decoration-dashed">
              View All Categories (20)
            </button>
          </div>
        </div>
      </section>

      {/* Offline Centres Banner */}
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        {/* Placeholder for background image */}
        <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-blue-900 to-slate-900"></div>
        
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Explore Tech-Enabled Offline Centres
          </h2>
          <p className="text-gray-300 text-lg mb-12">Creating new benchmarks in learning experiences</p>
          
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-[800px] mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Find a NexaPrep Centre in your city</h3>
            <p className="text-gray-500 mb-8">Available in <span className="text-[#5a4bda] font-bold">175+</span> cities</p>
            
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden p-2 focus-within:border-[#5a4bda] transition-colors">
              <Search className="w-6 h-6 text-gray-400 ml-2" />
              <input 
                type="text" 
                placeholder="Search your city" 
                className="flex-1 outline-none px-4 py-2 text-gray-700"
              />
              <button className="px-8 py-3 bg-[#5a4bda] text-white font-bold rounded-md hover:bg-[#483ab4]">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Call Button */}
      <div className="fixed bottom-8 right-8 w-14 h-14 bg-[#5a4bda] rounded-xl shadow-[0_10px_25px_rgba(90,75,218,0.5)] flex items-center justify-center cursor-pointer hover:-translate-y-1 transition-transform z-50">
        <Phone className="text-white w-6 h-6" />
      </div>

    </div>
  );
};

export default Landing;
