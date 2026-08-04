// fast-n-food-backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { 
    type: String, 
    required: true 
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'Preparing', 
    enum: ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'] 
  }
}, { timestamps: true }); // Automatically creates createdAt (Date of order)

module.exports = mongoose.model('Order', orderSchema);