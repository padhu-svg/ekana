const express = require('express');
const axios = require('axios');

const router = express.Router();

// Search places in Karnataka using Geoapify API
router.get('/places', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const response = await axios.get('https://api.geoapify.com/v1/geocode/search', {
      params: {
        text: `${query}, Karnataka, India`,
        limit: 10,
        apiKey: process.env.GEOAPIFY_API_KEY,
        filter: 'countrycode:in',
        bias: 'countrycode:in'
      }
    });

    const places = response.data.features.map(feature => ({
      name: feature.properties.name || feature.properties.formatted,
      address: feature.properties.formatted,
      city: feature.properties.city,
      state: feature.properties.state,
      country: feature.properties.country,
      coordinates: {
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
      },
      category: feature.properties.category || 'place'
    }));
    
    res.json({
      success: true,
      places: places
    });

  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ 
      error: 'Failed to search places',
      places: []
    });
  }
});

module.exports = router;