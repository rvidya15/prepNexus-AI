const User = require('../models/User');

const checkAiCredits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Pro users get unlimited access
    if (user.subscriptionPlan === 'pro') {
      return next();
    }

    // Free users require AI tokens
    if (user.aiTokens > 0) {
      user.aiTokens -= 1;
      await user.save();
      return next();
    } else {
      return res.status(402).json({ error: 'Out of AI Tokens. Please upgrade to Pro or buy more credits.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Credit verification failed.' });
  }
};

module.exports = { checkAiCredits };
