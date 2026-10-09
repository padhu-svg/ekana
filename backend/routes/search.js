const express = require('express');
const router = express.Router();
const supabase = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    // Sanitize search query for PostgREST
    const sanitizedQ = q.replace(/[%_,.\(\)]/g, '\\$&');

    const { data: places, error } = await supabase
      .from('tourist_places')
      .select('*')
      .or(`name.ilike.%${sanitizedQ}%,description.ilike.%${sanitizedQ}%,district.ilike.%${sanitizedQ}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      return res.status(500).json({ error: 'Search failed' });
    }
    
    res.json(places || []);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;