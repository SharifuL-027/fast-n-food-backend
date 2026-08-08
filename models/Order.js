// fast-n-food-backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // 👉 NEW: Save the customer's name
  customerName: { type: String, required: true },
  
  userEmail: { type: String, required: true },
  pickupLocation: { type: String, required: true }, 
  
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      imageUrl: String // Added image support for dashboard
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'] 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);