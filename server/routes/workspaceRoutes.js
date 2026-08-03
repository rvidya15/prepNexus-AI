const express = require('express');
const router = express.Router();
const Workspace = require('../models/Workspace');
const { protect } = require('../middleware/auth');

// @route POST /api/workspaces
// @desc Create a new workspace
router.post('/', protect, async (req, res) => {
  try {
    const { title, description } = req.body;
    const workspace = await Workspace.create({
      userId: req.user._id,
      title,
      description
    });
    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route GET /api/workspaces
// @desc Get all workspaces for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const workspaces = await Workspace.find({ userId: req.user._id });
    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
