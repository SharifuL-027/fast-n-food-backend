// fast-n-food-backend/models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true // Removes extra whitespace
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
    enum: ['Burgers', 'Pizza', 'Sides', 'Drinks'] // Restricts choices
  },
  // At this stage, we are saving the DIRECT image link from Cloudinary.
  // In the future admin form stage, we will use an Upload middleware.
  imageUrl: { 
    type: String, 
    required: true 
  }
}, { timestamps: true }); 

module.exports = mongoose.model('MenuItem', menuItemSchema);