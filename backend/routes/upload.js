const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const supabase = require('../config/database');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false);
    }
  }
});

// Upload image to Supabase Storage
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('File:', req.file ? 'Present' : 'Missing');
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Generate unique filename
    const fileExt = req.file.originalname.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `places/${fileName}`;

    console.log('Uploading to path:', filePath);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('ekana-images')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: 'Failed to upload image', details: error.message });
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('ekana-images')
      .getPublicUrl(filePath);

    console.log('Public URL:', publicUrl);

    res.json({
      success: true,
      imageUrl: publicUrl,
      fileName: fileName
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;