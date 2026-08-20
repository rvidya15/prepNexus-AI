import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, Edit3, MonitorPlay, Library, LayoutGrid, 
  FileText, ClipboardList, GraduationCap, MapPin, LogOut, Code
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  const sections = [
    {
      title: "LEARN ONLINE",
      items: [
        { name: 'Study', path: '/dashboard', icon: <Edit3 className="w-5 h-5" /> },
        { name: 'Pi', path: '/tutor', icon: <MonitorPlay className="w-5 h-5" />, badge: 'NEW' },
        { name: 'Library', path: '/notes', icon: <BookOpen className="w-5 h-5" /> },
      ]
    },
    {
      title: "STUDY PACKS",
      items: [
        { name: 'Batches', path: '/history', icon: <MonitorPlay className="w-5 h-5" /> },
        { name: 'Test Series', path: '/quiz', icon: <FileText className="w-5 h-5" /> },
        { name: 'My Test', path: '/pyqs', icon: <ClipboardList className="w-5 h-5" /> },
        { name: 'Scholarship', path: '/revision', icon: <GraduationCap className="w-5 h-5" /> },
      ]
    },
    {
      title: "OFFLINE",
      items: [
        { name: 'NexaPrep Centres', path: '/centres', icon: <MapPin className="w-5 h-5" /> },
      ]
    }
  ];

  return (
    <div className="h-screen w-[260px] flex flex-col border-r bg-white border-gray-200 text-gray-800 shrink-0 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
      
      {/* Brand Header */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-gray-900 rounded-full p-1.5 flex items-center justify-center">
           <Code className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">NexaPrep</h1>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-6">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-6">
            <h2 className="px-6 text-[11px] font-bold text-gray-400 mb-3 tracking-widest uppercase">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center justify-between px-6 py-2.5 transition-colors text-sm font-medium border-l-4
                      ${isActive 
                        ? 'bg-[#f4f2ff] text-[#5a4bda] border-[#5a4bda]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${isActive ? 'text-[#5a4bda]' : 'text-gray-400'}`}>
                        {item.icon}
                      </div>
                      {item.name}
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold bg-[#ff4b4b] text-white px-1.5 py-0.5 rounded shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User & Logout Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold bg-[#f4f2ff] text-[#5a4bda]">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.aiTokens} Tokens</p>
            </div>
          </div>
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
            Sign Out
          </button>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
