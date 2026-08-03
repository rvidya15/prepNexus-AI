const mongoose = require('mongoose');

const questionBankSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  questionText: { type: String, required: true },
  type: { type: String, enum: ['mcq', 'multi-select', 'short-answer'], required: true },
  options: [{ type: String }],
  correctAnswers: [{ type: String }],
  
  // Advanced PYQ Schema
  pyqMetadata: {
    examType: { type: String, required: true }, // e.g., UPSC, GATE, CBSE
    year: { type: Number }, // e.g., 2023
    shift: { type: String }, // Paper/Shift
    subject: { type: String },
    subTopic: { type: String },
    importanceScore: { type: Number, min: 1, max: 10 }
  },

  // Paper Trend Analysis & AI Metadata
  trendAnalysis: {
    yearlyWeightage: { type: Number }, // Percentage weightage
    recurringPattern: { type: Boolean, default: false },
    probabilityTag: { type: String, enum: ['Low', 'Medium', 'High Chance in Upcoming Exam'] }
  },

  // Spaced Repetition System (SRS) Schema (SM-2 adaptation)
  srsData: {
    lastRevisionDate: { type: Date },
    nextRevisionDate: { type: Date },
    easeFactor: { type: Number, default: 2.5 },
    intervalDays: { type: Number, default: 0 },
    repetitionCount: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Optimizations for rapid filtering by exam type, weak topics, and next revision dates
questionBankSchema.index({ "pyqMetadata.examType": 1, "pyqMetadata.subject": 1, "pyqMetadata.subTopic": 1 });
questionBankSchema.index({ "srsData.nextRevisionDate": 1 });
questionBankSchema.index({ workspaceId: 1 });

module.exports = mongoose.model('QuestionBank', questionBankSchema);
