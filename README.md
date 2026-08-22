<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen.svg" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <h1>🚀 NexaPrep AI</h1>
  <p><b>Next-Gen AI Study Companion. Don't just study hard. Study smart with AI.</b></p>
</div>

<br />

## 🌟 Overview

NexaPrep AI is an all-in-one AI study companion that turns any syllabus into interactive mind-maps, smart flashcards, and a hyper-focused study environment. It forces active engagement through AI-generated questions, visual maps, and distraction-free zones, helping students retain knowledge 4x faster.

## ✨ Features

- 🧠 **Smart Flashcards (Spaced Repetition):** Tinder-style swipeable flashcards utilizing active recall and spaced repetition to help you memorize 4x faster.
- 🗺️ **Magic Revision Sheets:** Instantly generate visual mind-maps and high-yield flashcards for any topic using our advanced AI engine.
- 🎧 **Focus Zone:** Immerse yourself with built-in Pomodoro timers and Lofi beats. Stay in the zone with zero distractions.
- 🤖 **Socratic AI Tutor:** A floating 24/7 tutor that guides you to the answer instead of just spoon-feeding it. True conceptual clarity.
- 📈 **Master Syllabus:** Track your completion percentage across your entire syllabus with automated progress bars and AI-curated notes.
- 📚 **Smart Resources:** AI recommends the best books and creates a tailored overview of your specific target exam syllabus.

## 🎯 Strengths & Benefits

Why switch to NexaPrep? Traditional studying relies on passive reading. NexaPrep forces active engagement.

- **Hyper-Personalized:** The AI adapts the difficulty and tone based on your target exam (NEET, JEE, UPSC, etc.).
- **Active Recall:** Retain information 4x longer with interactive AI flashcards and quizzes.
- **Zero Distractions:** Eliminate context-switching. You don't need to open YouTube for Lofi or a separate app for Pomodoro—it's all built-in.
- **Visual Learning:** Complex topics are automatically broken down into Mermaid JS mind-maps for quick retention.
- **Instant Clarification:** Never get stuck on a doubt again with the 24/7 Floating AI Tutor.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, Framer Motion, Lucide Icons, Mermaid JS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **AI Engine:** Google Gemini (gemini-3.5-flash for rapid reasoning and multimodal capabilities)

## 🚀 Getting Started Locally

If you want to experience the app at lightning speed without cloud API bottlenecks, you can run it locally:

1. Clone the repository.
2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Set up your `.env` in the `server` directory with your MongoDB URI and Gemini API Key:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/studyworkspace
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
4. Start both servers:
   ```bash
   # In the server directory
   npm run dev
   
   # In the client directory
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser!

## 📜 License

This project is licensed under the MIT License.
