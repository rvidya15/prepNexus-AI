const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route POST /api/planner/complete
// SuperMemo-2 Spaced Repetition Algorithm
router.post('/complete', protect, async (req, res) => {
  try {
    const { topicName, quality } = req.body; 
    // quality: 0-5 (0=complete blackout, 5=perfect response)
    
    const user = await User.findById(req.user.id);
    let srsTopic = user.srsTopics.find(t => t.topicName === topicName);
    
    if (!srsTopic) {
      srsTopic = {
        topicName,
        nextRevisionDate: new Date(),
        interval: 0,
        repetition: 0,
        easeFactor: 2.5
      };
      user.srsTopics.push(srsTopic);
    }
    
    // SM-2 Algorithm implementation
    if (quality >= 3) {
      if (srsTopic.repetition === 0) {
        srsTopic.interval = 1;
      } else if (srsTopic.repetition === 1) {
        srsTopic.interval = 6;
      } else {
        srsTopic.interval = Math.round(srsTopic.interval * srsTopic.easeFactor);
      }
      srsTopic.repetition += 1;
    } else {
      srsTopic.repetition = 0;
      srsTopic.interval = 1;
    }
    
    srsTopic.easeFactor = srsTopic.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (srsTopic.easeFactor < 1.3) srsTopic.easeFactor = 1.3;
    
    // Calculate next date
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + srsTopic.interval);
    srsTopic.nextRevisionDate = nextDate;
    
    // Update the array element
    const index = user.srsTopics.findIndex(t => t.topicName === topicName);
    if(index !== -1) {
      user.srsTopics[index] = srsTopic;
    } else {
        user.srsTopics.push(srsTopic);
    }
    
    await user.save();
    res.json({ message: 'SRS Updated', srsTopic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
