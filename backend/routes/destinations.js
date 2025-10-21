const express = require('express');
const router = express.Router();

// Mock data for destinations
const destinations = [
  {
    id: 1,
    name: 'Hampi',
    category: 'Heritage',
    district: 'Hampi',
    description: 'Ancient ruins and temples showcasing Vijayanagara Empire',
    images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500'],
    best_time: 'Oct-Mar',
    tags: ['UNESCO', 'History', 'Architecture']
  },
  {
    id: 2,
    name: 'Coorg',
    category: 'Hills',
    district: 'Coorg',
    description: 'Coffee plantations and misty hills perfect for nature lovers',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'],
    best_time: 'Oct-May',
    tags: ['Coffee', 'Hills', 'Nature']
  }
];

// GET all destinations
router.get('/', (req, res) => {
  const { category, district } = req.query;
  let filteredDestinations = destinations;

  if (category) {
    filteredDestinations = filteredDestinations.filter(d => d.category === category);
  }
  if (district) {
    filteredDestinations = filteredDestinations.filter(d => d.district === district);
  }

  res.json(filteredDestinations);
});

// GET destination by ID
router.get('/:id', (req, res) => {
  const destination = destinations.find(d => d.id === parseInt(req.params.id));
  if (!destination) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  res.json(destination);
});

module.exports = router;