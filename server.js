// A. Require necessary modules (the ones you installed!)
require('dotenv').config(); // MUST be the first line - loads secret data
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// B. Initialize the Express Application
const app = express();
const PORT = process.env.PORT || 5000;

// C. Apply Basic Middleware
app.use(cors()); // Allow requests from our future frontend
app.use(express.json()); // Allow our API to read JSON data sent to it

// D. Connect to MongoDB (this uses the mongoose you installed)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// E. Create a Simple "Test" Route
app.get('/api/test', (req, res) => {
  res.json({ message: "Your backend server is ALIVE!" });
});

// F. Start the Server and listen for requests
app.listen(PORT, () => {
  console.log(`🚀 API Server is running on: http://localhost:${PORT}`);
});