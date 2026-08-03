const mongoose = require('mongoose');

const sourceMaterialSchema = new mongoose.Schema({
  type: { type: String, enum: ['pdf', 'text', 'youtube'], required: true },
  url: { type: String }, // For PDF or raw Docs
  textContent: { type: String }, // Extracted text or raw notes
  youtubeMetadata: {
    videoId: { type: String },
    transcript: { type: String },
    keyTimestamps: [{
      timestamp: { type: Number },
      description: { type: String }
    }]
  }
}, { _id: true, timestamps: true });

const workspaceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // e.g., "UPSC History", "GATE CSE Algorithms"
  description: { type: String },
  
  // Multimodal Source Material tracking
  sourceMaterials: [sourceMaterialSchema]
}, { timestamps: true });

workspaceSchema.index({ userId: 1 });
workspaceSchema.index({ title: 'text' });

module.exports = mongoose.model('Workspace', workspaceSchema);
