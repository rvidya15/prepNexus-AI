const mongoose = require('mongoose');

const weaknessSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  masteryLevel: { type: Number, min: 0, max: 100, default: 0 }, // 0% to 100%
  decayCurve: { type: Number }, // AI calculated rate at which knowledge decays
  volatileTopic: { type: Boolean, default: false } // Topics that require frequent revision
});

const errorLogSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank' },
  // Categorized user mistakes for deep telemetry
  errorCategory: { 
    type: String, 
    enum: ['Conceptual Error', 'Time Pressure', 'Calculation Flaw', 'Misread Question'],
    required: true
  },
  timestamp: { type: Date, default: Date.now }
});

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  
  // Granular topic-wise mastery levels
  topicMastery: [weaknessSchema],
  
  // Error Logging telemetry
  errorLogs: [errorLogSchema],

  // Aggregated data ready for Radar/Bar charts showing weak subjects
  aggregatedMetrics: {
    overallAccuracy: { type: Number, default: 0 },
    averageTimePerQuestion: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Optimized for weakness detection and rapid telemetry querying
analyticsSchema.index({ userId: 1 });
analyticsSchema.index({ "topicMastery.masteryLevel": 1 });
analyticsSchema.index({ "errorLogs.errorCategory": 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
