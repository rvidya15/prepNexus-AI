import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BrainCircuit, BookOpen, Flame, Trophy, Clock, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Smart Tutor', path: '/tutor', icon: <BrainCircuit className="w-5 h-5" /> },
    { name: 'Weekly Quiz', path: '/quiz', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Revision', path: '/revision', icon: <Flame className="w-5 h-5" /> },
    { name: 'PYQ Analyzer', path: '/pyqs', icon: <BrainCircuit className="w-5 h-5" /> },
    { name: 'My Notes', path: '/notes', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Study History', path: '/history', icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div className={`h-screen w-64 flex flex-col border-r backdrop-blur-xl transition-colors duration-500 shrink-0 bg-white/70 border-indigo-100 text-slate-800`}
    >
      <div className="p-6 flex items-center gap-3">
        <BrainCircuit className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-bold tracking-tight">NexaPrep</h1>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold
                ${isActive 
                  ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }
              `}
            >
              {item.icon}
              {item.name}
            </button>
          )
        })}
      </div>

      <div className="p-4 border-t border-dashed border-indigo-200">
        <div className="flex items-center gap-3 p-3 rounded-xl mb-4 bg-slate-50 border border-indigo-100 shadow-sm">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-indigo-200 text-indigo-800">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-slate-900">{user?.username}</p>
            <p className="text-xs text-indigo-600">{user?.aiTokens} Tokens</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl transition bg-slate-100 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
