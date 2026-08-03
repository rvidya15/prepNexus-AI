const express = require('express');
const router = express.Router();
const QuestionBank = require('../models/QuestionBank');
const { protect } = require('../middleware/auth');

// @route GET /api/questions
// @desc Fetch questions from the Question Bank
router.get('/', protect, async (req, res) => {
  try {
    const { examType, subject } = req.query;
    let query = {};
    
    // Allow filtering by Exam Type and Subject for the UI
    if (examType) query['pyqMetadata.examType'] = examType;
    if (subject) query['pyqMetadata.subject'] = subject;
    
    const questions = await QuestionBank.find(query).limit(50);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/questions
// @desc Push raw question data into the Question Bank
router.post('/', protect, async (req, res) => {
  try {
    const question = await QuestionBank.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
