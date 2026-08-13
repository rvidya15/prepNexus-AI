import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TutorSession = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I noticed you struggled with Thermodynamics in your last quiz. Want to break down the Second Law together?" }
  ]);
  const [input, setInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if(!input.trim()) return;
    const userMsg = input;
    const newMsgs = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);
    
    try {
      const api = (await import('../api/axiosConfig')).default;
      const res = await api.post('/ai/tutor', { query: userMsg });
      
      setMessages([...newMsgs, { 
        role: 'ai', 
        content: res.data.reply
      }]);
    } catch (err) {
      setMessages([...newMsgs, { 
        role: 'ai', 
        content: err.response?.status === 402 ? "You're out of tokens! Please buy more." : "Sorry, I am having trouble connecting to my neural net right now! Please check your API Key settings."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl h-[85vh]  bg-white/90 backdrop-blur-xl border  border-indigo-200 rounded-2xl shadow-xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b  border-indigo-100 flex items-center gap-4  bg-indigo-50/50">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-slate-800 transition">
            <ArrowLeft />
          </button>
          <Bot className="text-indigo-600 w-6 h-6" />
          <h2 className="text-lg text-slate-800 font-semibold">Smart Doubt Solver</h2>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${msg.role === 'user' ? ' bg-indigo-500' : ' bg-indigo-100'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5  text-slate-800" /> : <Bot className="w-5 h-5  text-indigo-600" />}
              </div>
              <div className={`max-w-[70%] p-4 rounded-2xl shadow-md ${msg.role === 'user' ? ' bg-indigo-500  text-slate-800 rounded-tr-none' : ' bg-gray-50 border  border-gray-200 text-inherit rounded-tl-none'}`}>
                <p className="whitespace-pre-wrap">{typeof msg.content === 'string' ? msg.content.replace(/\[ACTION_ITEM\].*/g, '') : (msg.content ? JSON.stringify(msg.content) : "No content")}</p>
                
                {/* Parse Action Item if present */}
                {typeof msg.content === 'string' && msg.content.includes('[ACTION_ITEM]') && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-3 bg-white rounded-lg border border-orange-500/50 flex flex-col gap-1 shadow-[0_0_10px_rgba(249,115,22,0.1)]"
                  >
                    <span className="text-orange-500 text-[10px] font-bold tracking-wider">⚡ AUTOMATED ACTION QUEUED</span>
                    <span className="text-sm text-slate-800">Reminder set for tomorrow.</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-4 text-indigo-600 text-sm animate-pulse flex items-center justify-center">
            AI Tutor is analyzing your query...
          </div>
        )}

        {/* Input Area */}
        <div className="p-4  bg-white border-t  border-indigo-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask the AI Tutor anything..." 
              className="flex-1  bg-gray-50 border  border-gray-300 rounded-xl px-4 py-3 focus:outline-none  focus:border-indigo-500 transition"
            />
            <button 
              onClick={handleSend}
              className="bg-neonCyan text-dark px-6 py-3 rounded-xl font-bold hover:bg-neonTeal transition-colors shadow-[0_0_15px_rgba(102,252,241,0.3)] flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TutorSession;
