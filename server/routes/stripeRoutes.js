const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
// Will gracefully handle missing key for dev/mock mode
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route POST /api/stripe/create-checkout-session
router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'StudyWorkspace Pro - 500 AI Tokens',
            },
            unit_amount: 500, // $5.00
          },
          quantity: 1,
        }
      ],
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/?success=true`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/?canceled=true`,
      client_reference_id: req.user._id.toString(),
    });

    res.json({ url: session.url });
  } catch (error) {
    // If using mock key, simulate successful purchase for dev testing
    if (error.message.includes('Invalid API Key') || !process.env.STRIPE_SECRET_KEY) {
      const user = await User.findById(req.user._id);
      user.aiTokens += 500;
      await user.save();
      return res.json({ url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/?simulated_success=true` });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
