import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BrainCircuit, BookOpen, Flame, Trophy, Moon, Sun, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);
  const { theme, toggleTheme } = useThemeStore();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Smart Tutor', path: '/tutor', icon: <BrainCircuit className="w-5 h-5" /> },
    { name: 'Weekly Quiz', path: '/quiz', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Revision', path: '/revision', icon: <Flame className="w-5 h-5" /> },
    { name: 'PYQ Analyzer', path: '/pyqs', icon: <BrainCircuit className="w-5 h-5" /> },
    { name: 'My Notes', path: '/notes', icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <div className={`h-screen w-64 flex flex-col border-r backdrop-blur-xl transition-colors duration-500 shrink-0
      ${theme === 'dark' ? 'bg-darker/70 border-gray-800 text-white' : 'bg-white/70 border-gray-200 text-textDark'}`}
    >
      <div className="p-6 flex items-center gap-3">
        <BrainCircuit className={`w-8 h-8 ${theme === 'dark' ? 'text-neonCyan' : 'text-indigo-600'}`} />
        <h1 className="text-2xl font-bold tracking-tight">PrepNexus</h1>
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
                  ? theme === 'dark' ? 'bg-neonCyan/20 text-neonCyan shadow-[0_0_15px_rgba(102,252,241,0.2)]' : 'bg-indigo-100 text-indigo-700 shadow-sm'
                  : theme === 'dark' ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {item.icon}
              {item.name}
            </button>
          )
        })}
      </div>

      <div className="p-4 border-t border-dashed border-gray-500/30">
        <div className={`flex items-center gap-3 p-3 rounded-xl mb-4 ${theme === 'dark' ? 'bg-dark' : 'bg-gray-100'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${theme === 'dark' ? 'bg-neonCyan/20 text-neonCyan' : 'bg-indigo-200 text-indigo-800'}`}>
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.username}</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-neonCyan' : 'text-indigo-600'}`}>{user?.aiTokens} Tokens</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={toggleTheme}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-semibold transition
              ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-indigo-900'}`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className={`p-3 rounded-xl transition flex items-center justify-center ${theme === 'dark' ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
