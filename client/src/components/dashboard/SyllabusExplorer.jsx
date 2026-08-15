import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, ChevronDown, ChevronRight, FileText, Loader2, Sparkles, Zap, BrainCircuit } from 'lucide-react';

const SyllabusExplorer = () => {
  const [syllabus, setSyllabus] = useState(null);
  const [loadingSyllabus, setLoadingSyllabus] = useState(true);
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [topicInfo, setTopicInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      setLoadingSyllabus(true);
      const api = (await import('../../api/axiosConfig')).default;
      const res = await api.get('/users/syllabus');
      setSyllabus(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate your personalized syllabus. Please check your API key or try again later.");
    } finally {
      setLoadingSyllabus(false);
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
      console.error(err);
      setTopicInfo({ summary: "Failed to load topic information.", keyPoints: [], sampleQuestion: "" });
    } finally {
      setLoadingInfo(false);
    }
  };

  const toggleSubject = (subjectName) => {
    setExpandedSubjects(prev => ({ ...prev, [subjectName]: !prev[subjectName] }));
  };

  const toggleTopic = (topicName) => {
    setExpandedTopics(prev => ({ ...prev, [topicName]: !prev[topicName] }));
  };

  const handleSelect = (name, type) => {
    setSelectedItem({ name, type });
    fetchTopicInfo(name);
  };

  if (loadingSyllabus) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="text-gray-600 font-medium animate-pulse">AI is crafting your personalized syllabus...</p>
      </div>
    );
  }

  if (error || !syllabus?.subjects) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-600 font-bold">{error || "No syllabus found."}</p>
        <button onClick={fetchSyllabus} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Retry</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Panel: Syllabus Tree */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-indigo-100 overflow-hidden h-[800px] flex flex-col">
        <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex items-center gap-3">
          <Book className="text-indigo-600 w-6 h-6" />
          <h2 className="text-lg font-bold text-gray-800">Master Syllabus</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {syllabus.subjects.map((subject, idx) => (
            <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleSubject(subject.name)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-indigo-50 transition flex items-center justify-between font-semibold text-gray-800"
              >
                <span>{subject.name}</span>
                {expandedSubjects[subject.name] ? <ChevronDown className="w-4 h-4 text-indigo-500" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
              </button>
              
              <AnimatePresence>
                {expandedSubjects[subject.name] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white"
                  >
                    {subject.topics?.map((topic, tIdx) => (
                      <div key={tIdx} className="border-t border-gray-100">
                        <div className="flex">
                          <button 
                            onClick={() => toggleTopic(topic.name)}
                            className="p-3 pr-1 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-indigo-500"
                          >
                            {expandedTopics[topic.name] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => handleSelect(topic.name, 'topic')}
                            className={`flex-1 text-left p-3 pl-2 hover:bg-indigo-50 transition text-sm font-medium ${selectedItem?.name === topic.name ? 'text-indigo-700 bg-indigo-50' : 'text-gray-700'}`}
                          >
                            {topic.name}
                          </button>
                        </div>
                        
                        <AnimatePresence>
                          {expandedTopics[topic.name] && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-gray-50/50 pb-2"
                            >
                              {topic.subtopics?.map((sub, sIdx) => (
                                <button 
                                  key={sIdx}
                                  onClick={() => handleSelect(sub, 'subtopic')}
                                  className={`w-full text-left py-2 pl-12 pr-4 text-sm hover:bg-indigo-50 transition border-l-2 ${selectedItem?.name === sub ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-600'}`}
                                >
                                  • {sub}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Topic Information */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-indigo-100 h-[800px] flex flex-col">
        {!selectedItem ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center space-y-4">
            <Sparkles className="w-16 h-16 text-indigo-200" />
            <p className="text-lg">Select any topic or subtopic from the syllabus to instantly generate an AI study guide.</p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1 block">{selectedItem.type}</span>
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
              </div>
              <BrainCircuit className="text-indigo-400 w-8 h-8 opacity-50" />
            </div>

            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
              {loadingInfo ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                  <p className="text-gray-500">Synthesizing high-yield study notes...</p>
                </div>
              ) : topicInfo ? (
                <div className="space-y-8">
                  {/* Summary */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-600" /> Overview
                    </h3>
                    <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-gray-700 leading-relaxed">
                      {topicInfo.summary}
                    </div>
                  </motion.div>

                  {/* Key Points */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500" /> Key Formulas & Facts
                    </h3>
                    <ul className="space-y-3">
                      {topicInfo.keyPoints?.map((point, idx) => (
                        <li key={idx} className="flex gap-3 items-start bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Sample Question */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <BrainCircuit className="w-5 h-5 text-indigo-500" /> Sample Question
                    </h3>
                    <div className="p-5 bg-slate-800 rounded-xl text-white shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none" />
                      <p className="relative z-10 leading-relaxed">{topicInfo.sampleQuestion}</p>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="text-red-500">Failed to load content.</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SyllabusExplorer;
