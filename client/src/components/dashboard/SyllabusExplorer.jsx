import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2, FileText, Zap, BrainCircuit, ArrowLeft, BookOpen, Bookmark } from 'lucide-react';

const SyllabusExplorer = () => {
  const [syllabus, setSyllabus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Navigation states
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  const [topicInfo, setTopicInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);

  // Main Tab State
  const [activeTab, setActiveTab] = useState('subjects');
  const [resources, setResources] = useState(null);
  const [loadingResources, setLoadingResources] = useState(false);

  // Completion State
  const [completedTopicsLocal, setCompletedTopicsLocal] = useState([]);
  const [markingComplete, setMarkingComplete] = useState(false);

  useEffect(() => {
    fetchSyllabus();
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const api = (await import('../../api/axiosConfig')).default;
      const res = await api.get('/users/profile');
      if (res.data.completedTopics) setCompletedTopicsLocal(res.data.completedTopics);
    } catch (err) { }
  };

  const fetchSyllabus = async () => {
    try {
      setLoading(true);
      const api = (await import('../../api/axiosConfig')).default;
      const res = await api.get('/users/syllabus');
      setSyllabus(res.data);
    } catch (err) {
      setError("Failed to generate your personalized syllabus. Please check your API key or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    if (resources) return; // Already cached locally
    try {
      setLoadingResources(true);
      const api = (await import('../../api/axiosConfig')).default;
      const res = await api.get('/users/resources');
      setResources(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingResources(false);
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'resources') {
      fetchResources();
    }
  };

  const fetchTopicInfo = async (topicName) => {
    try {
      setLoadingInfo(true);
      setTopicInfo(null);
      const api = (await import('../../api/axiosConfig')).default;
      const res = await api.post('/ai/topic-info', { topic: topicName });
      setTopicInfo(res.data);
    } catch (err) {
      setTopicInfo({ summary: "Failed to load topic information.", keyPoints: [], sampleQuestion: "" });
    } finally {
      setLoadingInfo(false);
    }
  };

  const handleSelectTopic = (topicName) => {
    setSelectedTopic(topicName);
    fetchTopicInfo(topicName);
  };

  const handleMarkComplete = async () => {
    try {
      setMarkingComplete(true);
      const api = (await import('../../api/axiosConfig')).default;
      const res = await api.post('/users/complete-topic', { topicName: selectedTopic });
      setCompletedTopicsLocal(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setMarkingComplete(false);
    }
  };

  const getSubjectCompletion = (subject) => {
    if (!subject.topics || subject.topics.length === 0) return 0;
    let totalTopics = subject.topics.length;
    let completedCount = 0;
    subject.topics.forEach(t => {
      if (completedTopicsLocal.includes(t.name)) completedCount++;
    });
    return totalTopics === 0 ? 0 : Math.round((completedCount / totalTopics) * 100);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-10 h-10 text-[#5a4bda] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading Subjects...</p>
      </div>
    );
  }

  if (error || !syllabus?.subjects) {
    return (
      <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl m-8">
        <p className="font-bold mb-4">{error || "No syllabus found."}</p>
        <button onClick={fetchSyllabus} className="px-4 py-2 bg-[#5a4bda] text-white rounded-lg">Retry</button>
      </div>
    );
  }

  // Topic Info View (Deepest level)
  if (selectedTopic) {
    const isCompleted = completedTopicsLocal.includes(selectedTopic);
    return (
      <div>
        <button onClick={() => setSelectedTopic(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-semibold">
          <ArrowLeft className="w-5 h-5" /> Back to {selectedSubject.name}
        </button>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{selectedTopic}</h2>
            <button 
              onClick={handleMarkComplete}
              disabled={isCompleted || markingComplete}
              className={`px-5 py-2 rounded-full font-bold shadow-sm transition whitespace-nowrap ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-[#5a4bda] text-white hover:bg-indigo-700'}`}
            >
              {isCompleted ? 'Completed ✓' : markingComplete ? 'Marking...' : 'Mark as Completed'}
            </button>
          </div>
          
          {loadingInfo ? (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="w-10 h-10 text-[#5a4bda] animate-spin mb-4" />
              <p className="text-gray-500">AI is generating study notes...</p>
            </div>
          ) : topicInfo ? (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#5a4bda]" /> Overview
                </h3>
                <div className="p-4 bg-gray-50 rounded-xl text-gray-700 leading-relaxed border border-gray-100">
                  {topicInfo.summary}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" /> Key Points
                </h3>
                <ul className="space-y-3">
                  {topicInfo.keyPoints?.map((point, idx) => (
                    <li key={idx} className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <span className="shrink-0 text-orange-500 font-bold">•</span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // Subject Details View (Topics List)
  if (selectedSubject) {
    return (
      <div>
        <button onClick={() => setSelectedSubject(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-semibold">
          <ArrowLeft className="w-5 h-5" /> Back to Subjects
        </button>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
             <div className="w-12 h-12 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl uppercase">
                {selectedSubject.name.substring(0, 2)}
             </div>
             <h2 className="text-2xl font-bold text-gray-900">{selectedSubject.name}</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {selectedSubject.topics?.map((topic, tIdx) => {
              const isComp = completedTopicsLocal.includes(topic.name);
              return (
                <div 
                  key={tIdx} 
                  onClick={() => handleSelectTopic(topic.name)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isComp ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`font-semibold transition ${isComp ? 'text-gray-400 line-through' : 'text-gray-700 group-hover:text-[#5a4bda]'}`}>
                      {topic.name}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#5a4bda]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }

  // Main Tabbed View (Subjects or Resources)
  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => handleTabSwitch('subjects')}
          className={`px-6 py-3 font-bold text-sm tracking-wide ${activeTab === 'subjects' ? 'border-b-2 border-[#5a4bda] text-[#5a4bda]' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Subjects
        </button>
        <button 
          onClick={() => handleTabSwitch('resources')}
          className={`px-6 py-3 font-bold text-sm tracking-wide ${activeTab === 'resources' ? 'border-b-2 border-[#5a4bda] text-[#5a4bda]' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Resources
        </button>
      </div>

      {activeTab === 'subjects' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {syllabus.subjects.map((subject, idx) => {
            const percent = getSubjectCompletion(subject);
            return (
            <div 
              key={idx} 
              onClick={() => setSelectedSubject(subject)}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded border border-blue-100 bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center capitalize shrink-0">
                  {subject.name.substring(0, 2)}
                </div>
                <span className="font-semibold text-gray-800 text-[15px] line-clamp-1">{subject.name}</span>
              </div>
              
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-bold text-gray-500">{percent}%</span>
                  <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${percent}%`}}></div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700" />
              </div>
            </div>
          )})}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {loadingResources ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-[#5a4bda] animate-spin mb-4" />
              <p className="text-gray-500">Curating the best resources for your exam...</p>
            </div>
          ) : resources ? (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[#5a4bda]" /> Syllabus Overview
                </h3>
                <div className="p-5 bg-indigo-50/50 rounded-xl text-gray-700 leading-relaxed border border-indigo-100/50">
                  {resources.overview}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-orange-500" /> Highly Recommended Books
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.books?.map((book, idx) => (
                    <div key={idx} className="p-5 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition group">
                      <h4 className="font-bold text-gray-900 text-lg group-hover:text-[#5a4bda] transition">{book.title}</h4>
                      <p className="text-sm font-semibold text-gray-500 mb-3">By {book.author}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{book.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-500">Failed to load resources.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SyllabusExplorer;
