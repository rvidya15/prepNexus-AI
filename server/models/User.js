const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Auth
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  
  fullName: { type: String },
  // Academic Profile
  academicProfile: {
    targetExam: { type: String, required: true }, // e.g., UPSC, GATE, CBSE Class 12
    subjects: [{ type: String }],
    examDate: { type: Date },
    studyDaysPerWeek: { type: Number },
    preparationStyle: { type: String },
    specificGoals: { type: String }
  },

  // Monetization & AI Credits
  subscriptionPlan: { type: String, enum: ['free', 'pro'], default: 'free' },
  aiTokens: { type: Number, default: 20 },

  // Gamification & Habits
  gamification: {
    streak: { type: Number, default: 0 },
    lastActiveAt: { type: Date },
    freezeTokens: { type: Number, default: 0 },
    studyXp: { type: Number, default: 0 },
    badges: [{ type: String }]
  },

  // AI Daily Planner dynamically updated by the SRS engine
  dailyPlanner: {
    date: { type: Date },
    topicsToLearn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
    topicsToRevise: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank' }]
  }
}, { timestamps: true });

// Indexes for fast retrieval
userSchema.index({ email: 1 });
userSchema.index({ "academicProfile.targetExam": 1 });

module.exports = mongoose.model('User', userSchema);
