const { GoogleGenAI } = require('@google/genai');
const { YoutubeTranscript } = require('youtube-transcript');
const { PYQ_ANALYZER_PROMPT, SMART_TUTOR_PROMPT } = require('../utils/prompts');

// Ensure API key is present before initializing
let ai;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

/**
 * Dual Model Strategy:
 * 1. gemini-3.5-flash: Used for rapid responses, conversational tutor AI.
 * 2. gemini-3.5-flash: Used for deep reasoning, PYQ pattern analysis, and complex syllabus breakdowns.
 */

// --- Core AI Functions ---

/**
 * Generates an adaptive quiz based on the user's level and weak topics.
 * Uses Flash model for speed.
 */
const generateAdaptiveQuiz = async (topic, userLevel, previousPerformance) => {
  console.log(`[AI Engine] Generating Adaptive Quiz for ${topic} at level ${userLevel}`);
  if (!ai) return [{ question: "Simulated Question (API Key Missing)?", options: ["A", "B", "C", "D"], answer: "A", explanation: "Add GEMINI_API_KEY to see real questions." }];
  
  const prompt = `Create a 5-question multiple choice quiz on the topic of "${topic}". 
  The difficulty should be tailored for a student at the "${userLevel}" level.
  CRITICAL: You MUST include at least 2 Previous Year Questions (PYQs) for this specific exam if applicable. 
  For PYQs, include the year and exam name in the question text (e.g. "[UPSC 2019] What is...").
  Include a "trendAnalysis" property in the output JSON array. Return an array of objects where the final object is just { "trendAnalysis": "Based on PYQs, this topic carries 15% weightage..." }.
  Output only a valid JSON array of question objects (with options, answer, explanation), ending with the trendAnalysis object.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt
    });
    // Remove markdown formatting from the output if necessary before parsing
    const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("Gemini Flash Error:", err);
    throw err;
  }
};

/**
 * Deeply analyzes a Previous Year Question (PYQ) to extract weightage and trends.
 * Uses Pro model for deep reasoning.
 */
const analyzePYQTrend = async (questionText, examMetadata) => {
  console.log(`[AI Engine] Analyzing PYQ for ${examMetadata.examType} using PRO model...`);
  if (!ai) return { expectedWeightage: 50, recurringPattern: true, probabilityTag: "Medium", conceptBreakdown: "Simulated breakdown due to missing API key." };
  
  const prompt = `Exam Metadata: ${JSON.stringify(examMetadata)}\n\nQuestion: ${questionText}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: PYQ_ANALYZER_PROMPT,
      },
      contents: prompt
    });
    const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("Gemini Pro Error:", err);
    throw err;
  }
};

/**
 * Handles conversational queries in the Doubt Thread.
 * Uses Flash model for conversational speed.
 */
const handleTutorDoubt = async (userQuery, multimodalContext, explanationStyle) => {
  console.log(`[AI Engine] Responding to doubt as AI Tutor (Style: ${explanationStyle})`);
  if (!ai) return "This is a simulated AI Tutor response because the GEMINI_API_KEY is not configured in the `.env` file.\n\nTo see real AI responses, please add your Google Gemini API key to `server/.env`!\n\n[ACTION_ITEM] {\"type\": \"reminder\", \"description\": \"Add API Key\", \"dueDate\": \"Today\"}";
  
  // Extract YouTube URL if present
  const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/;
  const ytMatch = userQuery.match(ytRegex);
  let transcriptContext = '';
  
  if (ytMatch) {
    try {
      console.log(`[AI Engine] Detected YouTube URL. Fetching transcript for ${ytMatch[1]}...`);
      const transcript = await YoutubeTranscript.fetchTranscript(ytMatch[1]);
      const transcriptText = transcript.map(t => t.text).join(' ').substring(0, 5000); // Limit to 5k chars
      transcriptContext = `\n\n[YouTube Video Transcript Excerpt]: ${transcriptText}\n\n`;
    } catch (err) {
      console.log(`[AI Engine] Failed to fetch YouTube transcript:`, err.message);
      transcriptContext = `\n\n[Failed to load YouTube transcript. The video might not have captions.]\n\n`;
    }
  }

  const contextStr = multimodalContext ? `Context: ${JSON.stringify(multimodalContext)}\n` : '';
  const prompt = `${contextStr}${transcriptContext}Student Query: ${userQuery}\nRequested Style: ${explanationStyle}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: SMART_TUTOR_PROMPT,
      },
      contents: prompt
    });
    return response.text;
  } catch (err) {
    console.error("Gemini Flash Error:", err);
    throw err;
  }
};

/**
 * Generates a Visual Revision Sheet (Mermaid Mind Map and Flashcard Q&A)
 * Uses Flash model for speed.
 */
const generateRevisionSheet = async (topic, userLevel) => {
  console.log(`[AI Engine] Generating Revision Sheet for ${topic}`);
  if (!ai) return { 
    mermaid_diagram_syntax: `graph TD\nA[${topic}] --> B[Simulated Data]\nA --> C[API Key Missing]\nB --> D[Add GEMINI_API_KEY]`, 
    flashcard: { question: `What is ${topic}? (Simulated)`, answer: "This is a simulated answer because the Gemini API key is not configured in the .env file." }
  };
  
  const prompt = `You are an expert tutor for a student at the "${userLevel}" level. 
  Create a highly visual revision sheet for the topic: "${topic}".
  Return ONLY a valid JSON object containing exactly two fields:
  1. "mermaid_diagram_syntax": A string containing valid Mermaid JS syntax (graph TD) representing a concept mind map of the topic. Do not include markdown code block ticks inside the string.
  2. "flashcard": An object with "question" (string) and "answer" (string) representing the most high-yield concept to remember.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt
    });
    const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("Gemini Flash Error:", err);
    throw err;
  }
};

module.exports = {
  generateAdaptiveQuiz,
  analyzePYQTrend,
  handleTutorDoubt,
  generateRevisionSheet
};
