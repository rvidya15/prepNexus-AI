const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
  userAnswer: { type: mongoose.Schema.Types.Mixed }, // String or Array (for multi-select)
  isCorrect: { type: Boolean },
  timeTakenSeconds: { type: Number },
  confidenceRating: { type: Number, min: 1, max: 5 }, // 1 = Total Guess, 5 = 100% Confident
  difficultyAtAttempt: { type: Number } // Tracks dynamic shift in difficulty
});

const mockTestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // e.g., "Full Mock - GATE CSE 2024 Pattern"
  examType: { type: String, required: true },
  
  // Adaptive Engine Metrics
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  score: { type: Number },
  totalQuestions: { type: Number },
  
  // Tracked live attempts
  attempts: [attemptSchema],
  
  status: { type: String, enum: ['in-progress', 'completed', 'abandoned'], default: 'in-progress' }
}, { timestamps: true });

mockTestSchema.index({ userId: 1, status: 1 });
mockTestSchema.index({ examType: 1 });

module.exports = mongoose.model('MockTest', mockTestSchema);
