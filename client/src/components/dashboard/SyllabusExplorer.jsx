import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Loader2, FileText, Zap, BrainCircuit, ArrowLeft } from 'lucide-react';

const SyllabusExplorer = () => {
  const [syllabus, setSyllabus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Navigation states
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  const [topicInfo, setTopicInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    fetchSyllabus();
  }, []);

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
    return (
      <div>
        <button onClick={() => setSelectedTopic(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-semibold">
          <ArrowLeft className="w-5 h-5" /> Back to {selectedSubject.name}
        </button>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{selectedTopic}</h2>
          
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
            {selectedSubject.topics?.map((topic, tIdx) => (
              <div 
                key={tIdx} 
                onClick={() => handleSelectTopic(topic.name)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between group"
              >
                <div className="font-semibold text-gray-700 group-hover:text-[#5a4bda] transition">{topic.name}</div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#5a4bda]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Subjects Grid View (Matching PW Reference)
  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6">
        <button className="px-6 py-3 border-b-2 border-[#5a4bda] text-[#5a4bda] font-bold text-sm tracking-wide">
          Subjects
        </button>
        <button className="px-6 py-3 text-gray-500 font-bold text-sm tracking-wide hover:text-gray-900">
          Resources
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {syllabus.subjects.map((subject, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedSubject(subject)}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded border border-blue-100 bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center capitalize">
                {subject.name.substring(0, 2)}
              </div>
              <span className="font-semibold text-gray-800 text-[15px] line-clamp-1">{subject.name}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold text-gray-500">0%</span>
                <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-green-500 rounded-full"></div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyllabusExplorer;
