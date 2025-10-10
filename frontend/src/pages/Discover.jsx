import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin, Clock, Star } from 'lucide-react';
import { destinationsAPI } from '../services/api';

const Discover = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    district: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Heritage', 'Hills', 'Wildlife', 'Coast', 'Culture', 'Eco-Tourism'];
  const districts = ['Bangalore', 'Mysore', 'Hampi', 'Coorg', 'Mangalore', 'Udupi'];

  useEffect(() => {
    fetchDestinations();
  }, [filters]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await destinationsAPI.getAll(filters);
      setDestinations(response.data || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      // Mock data for demo
      setDestinations([
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
        },
        {
          id: 3,
          name: 'Gokarna',
          category: 'Coast',
          district: 'Gokarna',
          description: 'Pristine beaches and ancient temples by the Arabian Sea',
          images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500'],
          best_time: 'Nov-Mar',
          tags: ['Beach', 'Temple', 'Sunset']
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Karnataka</h1>
              <p className="text-gray-600 mt-2">Explore amazing destinations across the state</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 btn-primary"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showFilters ? 1 : 0, x: showFilters ? 0 : -20 }}
            className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange('category', category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filters.category === category
                        ? 'bg-forest text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-4 mt-8">Filter by District</h3>
              <div className="space-y-2">
                {districts.map(district => (
                  <button
                    key={district}
                    onClick={() => handleFilterChange('district', district)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filters.district === district
                        ? 'bg-forest text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Destinations Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {destinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  >
                    <div className="relative h-48">
                      <img
                        src={destination.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-forest text-white px-3 py-1 rounded-full text-sm">
                          {destination.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white bg-opacity-90 rounded-full p-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{destination.district}</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{destination.best_time}</span>
                        </div>
                        <button className="text-forest font-medium hover:text-forest-light">
                          Learn More →
                        </button>
                      </div>
                      
                      {destination.tags && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {destination.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="bg-yellow-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;