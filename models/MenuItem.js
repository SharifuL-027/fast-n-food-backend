// fast-n-food-backend/models/MenuItem.js
const mongoose = require('mongoose');

// We use predefined categories to keep the UI simple, matching 
// your European minimalism design philosophy.
const categories = ['Burgers', 'Pizza', 'Sides', 'Drinks'];

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
    required: true, 
    min: 0 // Cannot be negative
  },
  category: { 
    type: String, 
    required: true, 
    enum: categories // Restricts inputs to valid options
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  // The crucial dynamically uploaded asset
  imageUrl: { 
    type: String, 
    required: true 
  },
  cloudinaryId: { // Useful if we ever need to delete the original asset
    type: String, 
    required: true 
  }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

module.exports = mongoose.model('MenuItem', menuItemSchema);