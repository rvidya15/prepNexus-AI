import React, { useEffect } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import Sidebar from './Sidebar';
import Background from './Background';

const AppLayout = ({ children }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`flex h-screen overflow-hidden ${theme === 'dark' ? 'text-white' : 'text-textDark'}`}>
      <Background />
      <Sidebar />
      <main className="flex-1 overflow-y-auto z-10 relative">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
