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
import Landing from './pages/Landing';
import History from './pages/History';
import FocusZone from './pages/FocusZone';
import Flashcards from './pages/Flashcards';
import { useAuthStore } from './store/useAuthStore';
import AppLayout from './components/layout/AppLayout';

// Simple protected route component
const ProtectedRoute = ({ children, requireOnboarding = true }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) return <div className="min-h-screen bg-slate-50 text-indigo-600 flex items-center justify-center font-bold">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  const needsOnboarding = !user?.academicProfile?.targetExam || user?.academicProfile?.targetExam === 'General';

  if (requireOnboarding && needsOnboarding) {
    return <Navigate to="/onboarding" />;
  }

  if (!requireOnboarding && !needsOnboarding) {
    return <Navigate to="/dashboard" />;
  }

  return <AppLayout>{children}</AppLayout>;
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
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<ProtectedRoute requireOnboarding={false}><Onboarding /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tutor" element={<ProtectedRoute><TutorSession /></ProtectedRoute>} />
        <Route path="/revision" element={<ProtectedRoute><RevisionSheet /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/pyqs" element={<ProtectedRoute><PYQBrowser /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><WeeklyQuiz /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/focus" element={<ProtectedRoute><FocusZone /></ProtectedRoute>} />
        <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
