// fast-n-food-backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/history', async (req, res) => {
  try {
    const userEmail = req.query.email;
    
    if (!userEmail) {
      return res.status(400).json({ message: "❌ Email is required to fetch history." });
    }

    // Find all orders matching the email, sorted by newest first
    const userOrders = await Order.find({ userEmail: userEmail }).sort({ createdAt: -1 });
    
    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching orders:", error: err.message });
  }
});

// POST /api/orders/new (You will use this later when the Cart checkout is built)
router.post('/new', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: "❌ Error creating order:", error: err.message });
  }
});

module.exports = router;