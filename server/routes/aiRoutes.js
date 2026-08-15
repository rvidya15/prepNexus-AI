const express = require('express');
const router = express.Router();
const { handleTutorDoubt, generateRevisionSheet, generateAdaptiveQuiz, analyzePYQTrend, generateTopicInfo } = require('../services/geminiService');
const { protect } = require('../middleware/auth');
const { checkAiCredits } = require('../middleware/creditSystem');

// @route POST /api/ai/tutor
router.post('/tutor', protect, checkAiCredits, async (req, res) => {
  try {
    const { query, context } = req.body;
    const response = await handleTutorDoubt(query, context, 'Socratic and encouraging');
    res.json({ reply: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/ai/revision
router.post('/revision', protect, checkAiCredits, async (req, res) => {
  try {
    const { topic } = req.body;
    const userLevel = req.user.academicProfile?.targetExam || 'General';
    const response = await generateRevisionSheet(topic, userLevel);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/ai/quiz
router.post('/quiz', protect, checkAiCredits, async (req, res) => {
  try {
    const { topic } = req.body;
    const userLevel = req.user.academicProfile?.targetExam || 'General';
    const response = await generateAdaptiveQuiz(topic, userLevel, {});
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/ai/pyq
router.post('/pyq', protect, checkAiCredits, async (req, res) => {
  try {
    const { questionText, examMetadata } = req.body;
    const response = await analyzePYQTrend(questionText, examMetadata);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/ai/topic-info
router.post('/topic-info', protect, checkAiCredits, async (req, res) => {
  try {
    const { topic } = req.body;
    const userLevel = req.user.academicProfile?.targetExam || 'General';
    const response = await generateTopicInfo(topic, userLevel);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
