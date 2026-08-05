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
              name: 'PrepNexus-AI Pro - 500 AI Tokens',
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
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
