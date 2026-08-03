// fast-n-food-backend/middleware/upload.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// 1. Configure Cloudinary with your secret credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Set up the Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'BurgerCo_Menu', // It will create this folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Security: only allow images
    transformation: [{ width: 800, height: 600, crop: 'fill' }] // Auto-resize for consistent UI!
  }
});

// 3. Initialize Multer with the Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;