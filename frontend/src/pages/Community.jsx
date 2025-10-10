import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Star, Filter } from 'lucide-react';
import { communityAPI } from '../services/api';

const Community = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    district: '',
  });

  const types = ['Homestay', 'Guide', 'Artisan', 'Cafe', 'Transport'];
  const districts = ['Bangalore', 'Mysore', 'Hampi', 'Coorg', 'Mangalore', 'Udupi'];

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await communityAPI.getAll(filters);
      setListings(response.data || []);
    } catch (error) {
      console.error('Error fetching community listings:', error);
      // Mock data for demo
      setListings([
        {
          id: 1,
          name: 'Ravi\'s Homestay',
          type: 'Homestay',
          district: 'Coorg',
          description: 'Traditional Kodava homestay with authentic local cuisine and coffee plantation tours',
          images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500'],
          phone: '+91 98765 43210',
          email: 'ravi@homestay.com'
        },
        {
          id: 2,
          name: 'Priya Local Guide',
          type: 'Guide',
          district: 'Hampi',
          description: 'Certified heritage guide with 10+ years experience in Hampi historical sites',
          images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'],
          phone: '+91 87654 32109',
          email: 'priya@guide.com'
        },
        {
          id: 3,
          name: 'Mysore Silk Artisan',
          type: 'Artisan',
          district: 'Mysore',
          description: 'Traditional silk weaver creating authentic Mysore silk sarees and fabrics',
          images: ['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500'],
          phone: '+91 76543 21098',
          email: 'artisan@silk.com'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Community Connect</h1>
            <p className="text-gray-600 mt-2">Connect with local entrepreneurs and authentic experiences</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange('type', type)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      filters.type === type
                        ? 'bg-green-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <div className="flex flex-wrap gap-2">
                {districts.map(district => (
                  <button
                    key={district}
                    onClick={() => handleFilterChange('district', district)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      filters.district === district
                        ? 'bg-green-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={listing.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500'}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">
                      {listing.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 rounded-full p-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{listing.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.district}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{listing.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{listing.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">{listing.email}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <button className="w-full btn-primary">
                      Contact Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;