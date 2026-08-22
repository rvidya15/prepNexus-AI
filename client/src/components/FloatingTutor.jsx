import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, X, MessageSquare } from 'lucide-react';

const FloatingTutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi! I'm your NexaPrep Guide. Need help with a topic, scheduling a revision, or just feeling stressed? I'm here for you." }
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
        content: err.response?.status === 402 ? "You're out of tokens! Please buy more." : "Sorry, I couldn't connect to my neural net. Check your API settings."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[350px] sm:w-[500px] h-[600px] mb-4  bg-white/95 backdrop-blur-xl border  border-indigo-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b  border-indigo-100 flex items-center justify-between  bg-indigo-50/50">
              <div className="flex items-center gap-3">
                <Bot className="text-indigo-600 w-5 h-5" />
                <h3 className="font-bold text-sm  text-gray-800">NexaPrep Guide</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? ' bg-[#5a4bda]' : ' bg-indigo-100'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4  text-indigo-600" />}
                  </div>
                  <div className={`p-3 rounded-2xl shadow-sm max-w-[80%] ${msg.role === 'user' ? ' bg-[#5a4bda] text-white rounded-tr-none' : ' bg-gray-50 border  border-gray-200 rounded-tl-none'}`}>
                     <p className="whitespace-pre-wrap">{typeof msg.content === 'string' ? msg.content.replace(/\[ACTION_ITEM\].*/g, '') : "No content"}</p>
                     
                     {typeof msg.content === 'string' && msg.content.includes('[ACTION_ITEM]') && (
                       <div className="mt-3 p-2  bg-white rounded-lg border border-orange-500/50 flex flex-col gap-1">
                         <span className="text-orange-500 text-[10px] font-bold tracking-wider">⚡ ACTION SCHEDULED</span>
                       </div>
                     )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-xs text-indigo-600 animate-pulse flex items-center gap-2">
                  <Bot className="w-3 h-3" /> Thinking...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3  bg-white border-t  border-indigo-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything or paste a YouTube URL..." 
                className="flex-1  bg-gray-50 border  border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a4bda] transition"
              />
              <button 
                onClick={handleSend}
                className="bg-[#5a4bda] text-white px-3 py-2 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#5a4bda] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default FloatingTutor;
