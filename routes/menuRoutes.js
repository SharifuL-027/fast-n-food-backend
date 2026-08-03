// fast-n-food-backend/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem'); // Import the model we just created


router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find(); // Query MongoDB for all items
    res.json(items); // Send the items back as a JSON array
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching menu:", error: err.message });
  }
});

// ==========================================
// ROUTE: POST /api/menu
// DESCRIPTION: Add a new menu item (for the admin panel later)
// ==========================================
router.post('/', async (req, res) => {
  // At this stage, this route receives raw JSON data with the imageUrl already set.
  const newItem = new MenuItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl // Accepting the raw link for now
  });

  try {
    const savedItem = await newItem.save(); // Save to MongoDB
    res.status(201).json(savedItem); // Send back the newly created object
  } catch (err) {
    res.status(400).json({ message: "❌ Error creating item:", error: err.message });
  }
});

module.exports = router;