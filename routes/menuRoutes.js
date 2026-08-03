// fast-n-food-backend/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const upload = require('../middleware/upload'); // 👉 1. IMPORT THE MIDDLEWARE

// GET all items (For Customer Menu)
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ status: 'Active' });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching menu:", error: err.message });
  }
});

// GET all items (For Admin Dashboard Table)
router.get('/admin', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "❌ Admin error fetching items:", error: err.message });
  }
});

// ==========================================
// upload.single('image') MUST match the formData.append('image', file) from React
// ==========================================
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    // If Multer successfully uploaded the file, it attaches it to req.file
    if (!req.file) {
      return res.status(400).json({ message: "❌ No image uploaded." });
    }

    const newItem = new MenuItem({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      status: req.body.status,
      imageUrl: req.file.path, // 👉 This is the secure Cloudinary URL
      cloudinaryId: req.file.filename // 👉 The unique ID assigned by Cloudinary
    });

    const savedItem = await newItem.save();
    res.status(201).json({ message: "✅ New artisan item added!", item: savedItem });
    
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(400).json({ message: "❌ Error creating item:", error: err.message });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Artisan item deleted.", item: deletedItem });
  } catch (err) {
    res.status(500).json({ message: "❌ Error deleting item:", error: err.message });
  }
});

module.exports = router;