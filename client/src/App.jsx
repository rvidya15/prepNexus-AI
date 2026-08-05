import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TutorSession from './pages/TutorSession';
import RevisionSheet from './pages/RevisionSheet';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Notes from './pages/Notes';
import PYQBrowser from './pages/PYQBrowser';
import WeeklyQuiz from './pages/WeeklyQuiz';
import { useAuthStore } from './store/useAuthStore';

// Simple protected route component
const ProtectedRoute = ({ children, requireOnboarding = true }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (!isAuthenticated) return <Navigate to="/login" />;
  
  if (!user) return <div className="min-h-screen bg-dark flex items-center justify-center"><div className="text-neonCyan animate-pulse">Loading Profile...</div></div>;

  const needsOnboarding = user.academicProfile?.targetExam === 'General';

  if (requireOnboarding && needsOnboarding) {
    return <Navigate to="/onboarding" />;
  }

  if (!requireOnboarding && !needsOnboarding) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token, fetchProfile]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route path="/onboarding" element={<ProtectedRoute requireOnboarding={false}><Onboarding /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tutor" element={<ProtectedRoute><TutorSession /></ProtectedRoute>} />
        <Route path="/revision" element={<ProtectedRoute><RevisionSheet /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/pyqs" element={<ProtectedRoute><PYQBrowser /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><WeeklyQuiz /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
