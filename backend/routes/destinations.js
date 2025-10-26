const express = require('express');
const router = express.Router();
const supabase = require('../config/database');

// GET all destinations
router.get('/', async (req, res) => {
  try {
    const { category, district } = req.query;
    
    let query = supabase
      .from('tourist_places')
      .select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    if (district) {
      query = query.eq('district', district);
    }
    
    const { data: places, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch destinations' });
    }
    
    res.json(places || []);
  } catch (error) {
    console.error('Get destinations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET destination by ID
router.get('/:id', async (req, res) => {
  try {
    const { data: place, error } = await supabase
      .from('tourist_places')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error || !place) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    
    res.json(place);
  } catch (error) {
    console.error('Get destination error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;