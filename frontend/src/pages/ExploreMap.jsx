import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { destinationsAPI } from '../services/api';

const KARNATAKA_DISTRICTS = [
  'Bagalkote', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 
  'Bidar', 'Chamarajanagara', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 
  'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 
  'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 
  'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 
  'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara', 'Vijayapura', 'Yadgir'
].sort();

const ExploreMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      const places = destinations.filter(dest => 
        // Case insensitive matching to prevent data mismatch issues
        dest.district?.toLowerCase() === selectedDistrict.toLowerCase()
      );
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces([]);
    }
  }, [selectedDistrict, destinations]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await destinationsAPI.getAll();
      setDestinations(response.data || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE] font-sans pt-8">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-4xl font-bold text-[#2A363B] font-heading">Karnataka Districts</h1>
          <p className="text-xl text-gray-600 mt-3">Select any of the 31 districts to discover local tourist destinations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Districts Selection */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E07A5F] mx-auto"></div>
                  <p className="mt-4 text-gray-600 font-medium">Loading map data...</p>
                </div>
              ) : (
                <>
                  {/* Districts Grid (Hidden on mobile, use dropdown instead) */}
                  <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                    {KARNATAKA_DISTRICTS.map((district) => (
                      <motion.button
                        key={district}
                        onClick={() => handleDistrictClick(district)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center ${
                          selectedDistrict === district
                            ? 'bg-[#3D5A80] text-white border-[#3D5A80] shadow-md'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-[#3D5A80]/10 hover:border-[#3D5A80]/30'
                        }`}
                      >
                        <MapPin className={`h-5 w-5 mb-1 ${selectedDistrict === district ? 'text-white' : 'text-[#E07A5F]'}`} />
                        <div className="font-semibold text-xs uppercase tracking-wider">{district}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dropdown Alternative (Visible on mobile) */}
                  <div className="md:hidden relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-6 py-4 text-left flex items-center justify-between hover:border-[#3D5A80]/30 transition-colors"
                    >
                      <span className="text-gray-700 font-medium">
                        {selectedDistrict || 'Select a District'}
                      </span>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </button>
                    
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto"
                      >
                        {KARNATAKA_DISTRICTS.map((district) => (
                          <button
                            key={district}
                            onClick={() => {
                              handleDistrictClick(district);
                              setShowDropdown(false);
                            }}
                            className={`w-full px-6 py-3 text-left transition-colors border-b border-gray-50 last:border-b-0 ${
                              selectedDistrict === district ? 'bg-[#3D5A80]/10 text-[#293E58] font-bold' : 'hover:bg-gray-50 text-gray-700'
                            }`}
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
        </div>

        {/* Tourist Places Results */}
        {selectedDistrict && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#2A363B] font-heading">
                Tourist Places in {selectedDistrict}
              </h2>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-[#63927A] shadow-sm border border-gray-100">
                {filteredPlaces.length} places found
              </span>
            </div>

            {filteredPlaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaces.map((place, index) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col h-full border border-gray-100"
                    onClick={() => navigate(`/place/${place.id}`)}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                        alt={place.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#81B29A] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
                          {place.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#2A363B] mb-3 font-heading">{place.name}</h3>
                      <p className="text-gray-600 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">{place.description}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1 text-[#3D5A80]" />
                          <span className="text-xs font-medium">{place.best_time || 'Year-round'}</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/place/${place.id}`);
                          }}
                          className="text-[#D0694E] font-semibold text-sm hover:text-[#A84832] transition-colors flex items-center"
                        >
                          Explore <span className="ml-1">→</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center shadow-md border border-gray-100">
                <MapPin className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-[#2A363B] mb-2 font-heading">No tourist places listed yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We are currently updating our database. Places in {selectedDistrict} will be added soon by our community!
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExploreMap;