const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'ai'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const actionItemSchema = new mongoose.Schema({
  type: { type: String, enum: ['reminder', 're-attempt', 'review-topic'], required: true },
  description: { type: String }, // e.g., "Set reminder to re-attempt Question #42 tomorrow"
  dueDate: { type: Date },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

const doubtThreadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  
  // Multimodal Context attached to the doubt
  context: {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank' },
    youtubeTimestamp: { type: Number },
    slideReference: { type: String }
  },

  // Conversation tracking
  messages: [messageSchema],
  
  // Automated action items queued by the AI Tutor
  actionItems: [actionItemSchema],
  
  status: { type: String, enum: ['open', 'resolved'], default: 'open' }
}, { timestamps: true });

doubtThreadSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('DoubtThread', doubtThreadSchema);
