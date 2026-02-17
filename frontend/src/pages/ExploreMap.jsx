import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { destinationsAPI } from '../services/api';

const ExploreMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      const places = destinations.filter(dest => dest.district === selectedDistrict);
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces([]);
    }
  }, [selectedDistrict, destinations]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await destinationsAPI.getAll();
      const places = response.data || [];
      setDestinations(places);
      
      // Extract unique districts
      const uniqueDistricts = [...new Set(places.map(d => d.district))].filter(Boolean);
      setDistricts(uniqueDistricts);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setDestinations([]);
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Explore Karnataka by Map</h1>
            <p className="text-xl text-gray-600 mt-2">Click on districts to discover tourist places</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Karnataka Districts</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading districts...</p>
                </div>
              ) : (
                <>
                  {/* Districts Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {districts.map((district) => (
                      <motion.button
                        key={district}
                        onClick={() => handleDistrictClick(district)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedDistrict === district
                            ? 'bg-green-700 text-white border-green-700'
                            : 'bg-green-50 text-gray-900 border-green-200 hover:bg-green-100'
                        }`}
                      >
                        <MapPin className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-semibold text-sm">{district}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dropdown Alternative */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="w-full bg-white border-2 border-green-200 rounded-xl px-6 py-4 text-left flex items-center justify-between hover:border-green-300 transition-colors"
                    >
                      <span className="text-gray-700">
                        {selectedDistrict || 'Select District from Dropdown'}
                      </span>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </button>
                    
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                      >
                        {districts.map((district) => (
                          <button
                            key={district}
                            onClick={() => {
                              handleDistrictClick(district);
                              setShowDropdown(false);
                            }}
                            className="w-full px-6 py-3 text-left hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            {district}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {selectedDistrict && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Places in {selectedDistrict}
                </h3>
                <div className="text-gray-600">
                  {filteredPlaces.length} tourist places found
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tourist Places */}
        {selectedDistrict && filteredPlaces.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Tourist Places in {selectedDistrict}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlaces.map((place, index) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
                  onClick={() => window.location.href = `/place/${place.id}`}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                      alt={place.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {place.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{place.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{place.best_time || 'Year-round'}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/place/${place.id}`;
                        }}
                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedDistrict && filteredPlaces.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-lg">No tourist places found in {selectedDistrict}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreMap;