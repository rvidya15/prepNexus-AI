import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { BrainCircuit, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-darker p-8 rounded-2xl shadow-[0_0_40px_rgba(69,162,158,0.15)] border border-neonTeal/30"
      >
        <div className="flex flex-col items-center mb-8">
          <BrainCircuit className="text-neonCyan w-12 h-12 mb-2" />
          <h1 className="text-4xl font-bold text-center text-white mb-2">Welcome to NexaPrep</h1>
          <p className="text-gray-400 mt-2">Welcome back to your study hub.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-neonCyan text-dark py-3 rounded-xl font-bold hover:bg-neonTeal transition-colors shadow-[0_0_15px_rgba(102,252,241,0.3)] flex justify-center items-center gap-2"
          >
            {isLoading ? 'Authenticating...' : <><LogIn className="w-5 h-5" /> Sign In</>}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account? <Link to="/register" className="text-neonCyan hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
