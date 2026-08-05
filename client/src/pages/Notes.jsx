import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Trash2, Edit3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await api.post('/notes', {
        title: formData.title || 'Untitled Note',
        content: formData.content,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      });
      await fetchNotes();
      setIsEditing(false);
      setFormData({ title: '', content: '', tags: '' });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setActiveNote(null);
      fetchNotes();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex text-white">
      {/* Sidebar */}
      <div className="w-1/3 bg-darker border-r border-gray-800 p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <ArrowLeft className="text-neonCyan w-5 h-5 hover:text-neonTeal transition" />
          <h2 className="text-xl font-bold flex items-center gap-2"><BookOpen className="text-neonCyan" /> My Notes</h2>
        </div>
        
        <button 
          onClick={() => { setIsEditing(true); setActiveNote(null); setFormData({ title: '', content: '', tags: '' }) }}
          className="w-full bg-neonCyan/10 text-neonCyan border border-neonCyan/30 rounded-lg py-3 flex items-center justify-center gap-2 mb-6 hover:bg-neonCyan/20 transition"
        >
          <Plus className="w-5 h-5" /> New Note
        </button>

        <div className="space-y-3">
          {notes.map(note => (
            <div 
              key={note._id}
              onClick={() => { setActiveNote(note); setIsEditing(false); }}
              className={`p-4 rounded-lg cursor-pointer border transition ${activeNote?._id === note._id ? 'bg-neonCyan/10 border-neonCyan' : 'bg-dark border-gray-800 hover:border-gray-600'}`}
            >
              <h3 className="font-semibold truncate">{note.title}</h3>
              <p className="text-sm text-gray-500 truncate mt-1">{note.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {isEditing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-3xl">
            <input 
              type="text" 
              placeholder="Note Title..."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-transparent text-3xl font-bold border-b border-gray-700 pb-2 focus:outline-none focus:border-neonCyan"
            />
            <input 
              type="text" 
              placeholder="Tags (comma separated)..."
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full bg-transparent text-sm text-neonTeal border-b border-gray-800 pb-2 focus:outline-none focus:border-neonTeal"
            />
            <textarea 
              rows="20"
              placeholder="Start typing your notes here..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full bg-transparent text-gray-300 focus:outline-none resize-none mt-4"
            />
            <button 
              onClick={handleSave}
              disabled={isLoading || !formData.content}
              className="bg-neonCyan text-dark font-bold px-8 py-3 rounded-lg hover:bg-neonTeal transition disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Note'}
            </button>
          </motion.div>
        ) : activeNote ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
            <div className="flex justify-between items-start mb-6 border-b border-gray-800 pb-4">
              <div>
                <h1 className="text-3xl font-bold">{activeNote.title}</h1>
                <div className="flex gap-2 mt-2">
                  {activeNote.tags?.map(t => <span key={t} className="text-xs bg-darker text-neonTeal px-2 py-1 rounded border border-neonTeal/30">#{t}</span>)}
                </div>
              </div>
              <button onClick={() => handleDelete(activeNote._id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded transition">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
              {activeNote.content}
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <BookOpen className="w-16 h-16 mb-4 opacity-20" />
            <p>Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
