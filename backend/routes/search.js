const express = require('express');
const router = express.Router();
const supabase = require('../config/database');

const fs = require('fs');
const path = require('path');

const MOCK_PLACES_PATH = path.join(__dirname, '../data/karnataka_places.json');
let MOCK_PLACES = [];
try {
  MOCK_PLACES = JSON.parse(fs.readFileSync(MOCK_PLACES_PATH, 'utf8'));
} catch (err) {
  console.error("Could not load mock places JSON in search:", err.message);
}

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    if (!supabase) {
      const searchLower = q.toLowerCase();
      const filtered = MOCK_PLACES.filter(p => 
        (p.name && p.name.toLowerCase().includes(searchLower)) ||
        (p.description && p.description.toLowerCase().includes(searchLower)) ||
        (p.district && p.district.toLowerCase().includes(searchLower)) ||
        (p.category && p.category.toLowerCase().includes(searchLower))
      );
      return res.json(filtered);
    }
    
    // Sanitize search query for PostgREST
    const sanitizedQ = q.replace(/[%_,.\(\)]/g, '\\$&');

    const { data: places, error } = await supabase
      .from('tourist_places')
      .select('*')
      .or(`name.ilike.%${sanitizedQ}%,description.ilike.%${sanitizedQ}%,district.ilike.%${sanitizedQ}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      const searchLower = q.toLowerCase();
      const filtered = MOCK_PLACES.filter(p => 
        (p.name && p.name.toLowerCase().includes(searchLower)) ||
        (p.description && p.description.toLowerCase().includes(searchLower)) ||
        (p.district && p.district.toLowerCase().includes(searchLower)) ||
        (p.category && p.category.toLowerCase().includes(searchLower))
      );
      return res.json(filtered);
    }
    
    res.json(places || []);
  } catch (error) {
    console.error('Search error:', error);
    const searchLower = (req.query.q || '').toLowerCase();
    const filtered = MOCK_PLACES.filter(p => 
      (p.name && p.name.toLowerCase().includes(searchLower)) ||
      (p.description && p.description.toLowerCase().includes(searchLower)) ||
      (p.district && p.district.toLowerCase().includes(searchLower))
    );
    res.json(filtered);
  }
});

module.exports = router;