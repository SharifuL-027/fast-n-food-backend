// fast-n-food-backend/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem'); // Our Mongoose model
const requireAdmin = require('../middleware/requireAdmin'); // Add your Firebase auth check here

// ==========================================
// PUBLIC ROUTES (No Authentication needed)
// ==========================================
// GET all active items (for the customer Menu.jsx grid)
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ status: 'Active' }); // Only show Active items to customers
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching menu:", error: err.message });
  }
});

// ==========================================
// ADMIN ROUTES (Protected by 'requireAdmin')
// ==========================================

// GET all items (including inactive) for the dashboard table
router.get('/admin', requireAdmin, async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "❌ Admin error fetching items:", error: err.message });
  }
});

// POST Create new item with dynamic upload logic
router.post('/add', requireAdmin, async (req, res) => {
  // This route requires Multer middleware (Step 3) to process the 'image' file
  const newItem = new MenuItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    // imageUrl and cloudinaryId are set after the Cloudinary upload middleware finishes.
    imageUrl: req.imageUrl, 
    cloudinaryId: req.cloudinaryId
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json({ message: "✅ New artisan item added!", item: savedItem });
  } catch (err) {
    res.status(400).json({ message: "❌ Error creating item:", error: err.message });
  }
});

// DELETE item (using specific ID from MongoDB)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    // Optional: Delete from Cloudinary using deletedItem.cloudinaryId
    res.json({ message: "✅ Artisan item deleted.", item: deletedItem });
  } catch (err) {
    res.status(500).json({ message: "❌ Error deleting item:", error: err.message });
  }
});

module.exports = router;