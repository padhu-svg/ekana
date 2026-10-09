const express = require('express');
const router = express.Router();
const supabase = require('../config/database');

const fs = require('fs');
const path = require('path');

// Fallback data in case Supabase is paused or offline
const MOCK_PLACES_PATH = path.join(__dirname, '../data/karnataka_places.json');
let MOCK_PLACES = [];
try {
  MOCK_PLACES = JSON.parse(fs.readFileSync(MOCK_PLACES_PATH, 'utf8'));
} catch (err) {
  console.error("Could not load mock places JSON:", err.message);
}

// GET all destinations
router.get('/', async (req, res) => {
  try {
    const { category, district } = req.query;
    
    let query = supabase
      .from('tourist_places')
      .select('*');
    
    if (category) query = query.eq('category', category);
    if (district) query = query.eq('district', district);
    
    const { data: places, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.warn('Supabase fetch failed, returning mock data. Error:', error.message);
      let filteredMock = MOCK_PLACES;
      if (category) filteredMock = filteredMock.filter(p => p.category.toLowerCase() === category.toLowerCase());
      if (district) filteredMock = filteredMock.filter(p => p.district.toLowerCase() === district.toLowerCase());
      return res.json(filteredMock);
    }
    
    // Also return mock data if the DB is empty, for prototype demonstration
    if (!places || places.length === 0) {
      let filteredMock = MOCK_PLACES;
      if (category) filteredMock = filteredMock.filter(p => p.category.toLowerCase() === category.toLowerCase());
      if (district) filteredMock = filteredMock.filter(p => p.district.toLowerCase() === district.toLowerCase());
      return res.json(filteredMock);
    }

    res.json(places);
  } catch (error) {
    console.error('Get destinations error:', error);
    let filteredMock = MOCK_PLACES;
    if (req.query.category) filteredMock = filteredMock.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
    if (req.query.district) filteredMock = filteredMock.filter(p => p.district.toLowerCase() === req.query.district.toLowerCase());
    res.json(filteredMock); // Fallback on crash
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
      // Fallback
      const mockPlace = MOCK_PLACES.find(p => p.id.toString() === req.params.id);
      if (mockPlace) return res.json(mockPlace);
      return res.status(404).json({ error: 'Destination not found' });
    }
    
    res.json(place);
  } catch (error) {
    console.error('Get destination error:', error);
    const mockPlace = MOCK_PLACES.find(p => p.id.toString() === req.params.id);
    if (mockPlace) return res.json(mockPlace);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;