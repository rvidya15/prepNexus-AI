require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import routes
const userRoutes = require('./routes/userRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');
const questionRoutes = require('./routes/questionRoutes');
const aiRoutes = require('./routes/aiRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Middlewares
app.use(helmet()); // Set security HTTP headers
app.use(cors({
  origin: '*' // Allow all Vercel URLs to connect without CORS errors
}));
app.use(express.json());

// API Rate Limiting (DDoS Protection)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api', apiLimiter);

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/stripe', stripeRoutes);
const plannerRoutes = require('./routes/plannerRoutes');
app.use('/api/planner', plannerRoutes);
app.use('/api/notes', noteRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'NexaPrep API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
