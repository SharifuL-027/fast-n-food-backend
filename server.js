require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// C. Apply Basic Middleware
app.use(cors()); // Allow requests from our future frontend
app.use(express.json()); // Allow our API to read JSON data sent to it

// D. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// E. Register API Routes
app.get('/api/test', (req, res) => {
  res.json({ message: "Your backend server is ALIVE!" });
});

app.use('/api/menu', menuRoutes);

app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`🚀 API Server is running on: http://localhost:${PORT}`);
});