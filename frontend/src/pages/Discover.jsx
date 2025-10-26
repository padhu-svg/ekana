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

  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchDestinations();
  }, [filters]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await destinationsAPI.getAll(filters);
      const places = response.data || [];
      setDestinations(places);
      
      // Extract unique categories and districts
      if (places.length > 0) {
        const uniqueCategories = [...new Set(places.map(d => d.category))].filter(Boolean);
        const uniqueDistricts = [...new Set(places.map(d => d.district))].filter(Boolean);
        setCategories(uniqueCategories);
        setDistricts(uniqueDistricts);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setDestinations([]);
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
            {/* <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                {(filters.category || filters.district) && (
                  <button
                    onClick={() => setFilters({ category: '', district: '' })}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Category
                </h4>
                <div className="space-y-3">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange('category', category)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        filters.category === category
                          ? 'bg-green-700 text-white shadow-lg transform scale-105'
                          : 'bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700 border border-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  District
                </h4>
                <div className="space-y-3">
                  {districts.map(district => (
                    <button
                      key={district}
                      onClick={() => handleFilterChange('district', district)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        filters.district === district
                          ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                          : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200'
                      }`}
                    >
                      {district}
                    </button>
                  ))}
                </div>
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
                    onClick={() => window.location.href = `/place/${destination.id}`}
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
                          <span className="text-sm">{destination.best_time || 'Year-round'}</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `/place/${destination.id}`;
                          }}
                          className="text-green-700 font-medium hover:text-green-800 transition-colors"
                        >
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