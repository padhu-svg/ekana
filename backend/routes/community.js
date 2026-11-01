const express = require('express');
const router = express.Router();

// Mock data for community
const community = [
  {
    id: 1,
    name: "Ravi's Homestay",
    type: 'Homestay',
    district: 'Coorg',
    description: 'Traditional Kodava homestay with authentic local cuisine',
    images: ['/images/places/district_18_madikeri_coorg.jpg'],
    phone: '+91 98765 43210',
    email: 'ravi@homestay.com'
  }
];

// GET all community listings
router.get('/', (req, res) => {
  const { type, district } = req.query;
  let filteredCommunity = community;

  if (type) {
    filteredCommunity = filteredCommunity.filter(c => c.type === type);
  }
  if (district) {
    filteredCommunity = filteredCommunity.filter(c => c.district === district);
  }

  res.json(filteredCommunity);
});

// GET community listing by ID
router.get('/:id', (req, res) => {
  const listing = community.find(c => c.id === parseInt(req.params.id));
  if (!listing) {
    return res.status(404).json({ error: 'Community listing not found' });
  }
  res.json(listing);
});

module.exports = router;