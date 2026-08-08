
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  
  // 👉 NEW: Save where the customer wants to pick up the food
  pickupLocation: { type: String, required: true }, 
  
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
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