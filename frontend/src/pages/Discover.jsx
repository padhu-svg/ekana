import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, MapPin, Clock, Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { destinationsAPI } from '../services/api';

const Discover = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    district: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Fetch filter metadata once
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await destinationsAPI.getAll(); // No filters
        const places = response.data || [];
        if (places.length > 0) {
          const uniqueCategories = [...new Set(places.map(d => d.category))].filter(Boolean);
          const uniqueDistricts = [...new Set(places.map(d => d.district))].filter(Boolean);
          setCategories(uniqueCategories);
          setDistricts(uniqueDistricts);
        }
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };
    fetchMetadata();
  }, []);

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
    <div className="min-h-screen bg-[#F4F1DE] font-sans pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#2A363B] font-heading">Discover Karnataka</h1>
              <p className="text-gray-600 mt-2 text-lg">Explore amazing destinations across the state</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 bg-[#E07A5F] hover:bg-[#D0694E] text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-lg"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}
              >
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-32">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#2A363B] font-heading">Filters</h3>
                    <div className="flex gap-4">
                      {(filters.category || filters.district) && (
                        <button
                          onClick={() => setFilters({ category: '', district: '' })}
                          className="text-sm text-[#E07A5F] hover:text-[#D0694E] font-medium"
                        >
                          Clear All
                        </button>
                      )}
                      <button 
                        className="lg:hidden text-gray-500 hover:text-gray-800"
                        onClick={() => setShowFilters(false)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center font-heading">
                      <span className="w-2 h-2 bg-[#81B29A] rounded-full mr-2"></span>
                      Theme
                    </h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => handleFilterChange('category', category)}
                          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                            filters.category === category
                              ? 'bg-[#81B29A] text-white shadow-md transform scale-[1.02]'
                              : 'bg-gray-50 text-gray-600 hover:bg-[#81B29A]/10 hover:text-[#63927A] border border-transparent'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center font-heading">
                      <span className="w-2 h-2 bg-[#3D5A80] rounded-full mr-2"></span>
                      District
                    </h4>
                    <div className="space-y-2">
                      {districts.map(district => (
                        <button
                          key={district}
                          onClick={() => handleFilterChange('district', district)}
                          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                            filters.district === district
                              ? 'bg-[#3D5A80] text-white shadow-md transform scale-[1.02]'
                              : 'bg-gray-50 text-gray-600 hover:bg-[#3D5A80]/10 hover:text-[#293E58] border border-transparent'
                          }`}
                        >
                          {district}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Destinations Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                    <div className="p-6">
                      <div className="h-5 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {destinations.length === 0 ? (
                  <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-gray-100">
                    <MapPin className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">No destinations found</h3>
                    <p className="text-gray-500">Try adjusting your filters to discover more places.</p>
                  </div>
                ) : (
                  destinations.map((destination, index) => (
                    <motion.div
                      key={destination.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full border border-gray-100"
                      onClick={() => navigate(`/place/${destination.id}`)}
                    >
                      <div className="relative h-48 overflow-hidden group">
                        <img
                          src={destination.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                          alt={destination.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#81B29A] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
                            {destination.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-[#2A363B] mb-2 font-heading">{destination.name}</h3>
                        <div className="flex items-center text-gray-500 mb-3">
                          <MapPin className="h-4 w-4 mr-1 text-[#E07A5F]" />
                          <span className="text-sm">{destination.district}</span>
                        </div>
                        <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">{destination.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1 text-[#3D5A80]" />
                            <span className="text-xs">{destination.best_time || 'Year-round'}</span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/place/${destination.id}`);
                            }}
                            className="text-[#D0694E] font-semibold text-sm hover:text-[#A84832] transition-colors flex items-center"
                          >
                            Explore <span className="ml-1">→</span>
                          </button>
                        </div>
                        
                        {destination.tags && destination.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {destination.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="bg-[#F4F1DE] text-[#3D5A80] px-2 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;