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

// Create admin (for initial setup)
router.post('/create-admin', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from('admins')
      .select('id')
      .eq('username', username)
      .single();

    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const hashedPassword = await hashPassword(password);
    
    const { data: admin, error } = await supabase
      .from('admins')
      .insert([{
        username,
        email,
        hashed_password: hashedPassword,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create admin' });
    }

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;