const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { generateSyllabus } = require('../services/geminiService');

// Utility to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, targetExam } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      passwordHash,
      academicProfile: { targetExam: targetExam || 'General' }
    });

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

// @route PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { targetExam, examDate, subjects, fullName, studyDaysPerWeek, preparationStyle, specificGoals } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (fullName) user.fullName = fullName;
    if (targetExam) user.academicProfile.targetExam = targetExam;
    if (examDate) user.academicProfile.examDate = examDate;
    if (subjects) user.academicProfile.subjects = subjects;
    if (studyDaysPerWeek) user.academicProfile.studyDaysPerWeek = studyDaysPerWeek;
    if (preparationStyle) user.academicProfile.preparationStyle = preparationStyle;
    if (specificGoals) user.academicProfile.specificGoals = specificGoals;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route GET /api/users/syllabus
router.get('/syllabus', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Return existing syllabus if cached
    if (user.syllabus) {
      return res.json(user.syllabus);
    }

    // Generate new syllabus using AI
    const targetExam = user.academicProfile?.targetExam || 'General Knowledge';
    const syllabus = await generateSyllabus(targetExam);

    // Save to user object
    user.syllabus = syllabus;
    await user.save();

    res.json(syllabus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route GET /api/users/resources
router.get('/resources', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Return existing resources if cached
    if (user.resources) {
      return res.json(user.resources);
    }

    // Generate new resources using AI
    const targetExam = user.academicProfile?.targetExam || 'General Knowledge';
    const { generateResources } = require('../services/geminiService');
    const resources = await generateResources(targetExam);

    // Save to user object
    user.resources = resources;
    await user.save();

    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/users/complete-topic
router.post('/complete-topic', protect, async (req, res) => {
  try {
    const { topicName } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.completedTopics) {
      user.completedTopics = [];
    }

    if (!user.completedTopics.includes(topicName)) {
      user.completedTopics.push(topicName);
      await user.save();
    }

    res.json(user.completedTopics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
