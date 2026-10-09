const express = require('express');
const router = express.Router();
const supabase = require('../config/database');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');
const { authenticateAdmin } = require('../middleware/auth');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await comparePassword(password, admin.hashed_password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ username: admin.username });
    res.json({ access_token: token, token_type: 'bearer' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get dashboard data
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const { data: places, error } = await supabase
      .from('tourist_places')
      .select('id');

    const totalPlaces = places ? places.length : 0;

    res.json({
      admin: {
        username: req.admin.username,
        email: req.admin.email
      },
      stats: {
        total_places: totalPlaces
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all places
router.get('/places', authenticateAdmin, async (req, res) => {
  try {
    const { data: places, error } = await supabase
      .from('tourist_places')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch places' });
    }

    res.json(places || []);
  } catch (error) {
    console.error('Get places error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new place
router.post('/places', authenticateAdmin, async (req, res) => {
  try {
    const placeData = {
      ...req.body,
      created_at: new Date().toISOString()
    };

    const { data: place, error } = await supabase
      .from('tourist_places')
      .insert([placeData])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create place' });
    }

    res.status(201).json(place);
  } catch (error) {
    console.error('Create place error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update place
router.put('/places/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude, rating, ...otherData } = req.body;
    
    const updateData = {
      ...otherData,
      ...(latitude && latitude !== '' && { latitude: parseFloat(latitude) }),
      ...(longitude && longitude !== '' && { longitude: parseFloat(longitude) }),
      ...(rating && rating !== '' && { rating: parseFloat(rating) })
    };

    const { data: place, error } = await supabase
      .from('tourist_places')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return res.status(500).json({ error: 'Failed to update place', details: error.message });
    }

    res.json(place);
  } catch (error) {
    console.error('Update place error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete place
router.delete('/places/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // First get the place to access its images
    const { data: place, error: fetchError } = await supabase
      .from('tourist_places')
      .select('images')
      .eq('id', id)
      .single();

    if (fetchError || !place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // Delete images from Supabase Storage
    if (place.images && place.images.length > 0) {
      for (const imageUrl of place.images) {
        try {
          // Extract file path from URL
          const urlParts = imageUrl.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const filePath = `places/${fileName}`;
          
          await supabase.storage
            .from('ekana-images')
            .remove([filePath]);
        } catch (storageError) {
          console.error('Error deleting image:', storageError);
        }
      }
    }

    // Delete place from database
    const { error: deleteError } = await supabase
      .from('tourist_places')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return res.status(500).json({ error: 'Failed to delete place' });
    }

    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error('Delete place error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;