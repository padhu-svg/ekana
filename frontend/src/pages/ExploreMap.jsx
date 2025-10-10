import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';

const ExploreMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluk, setSelectedTaluk] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const districts = {
    'Bangalore': ['Bangalore North', 'Bangalore South', 'Bangalore East', 'Bangalore Rural'],
    'Mysore': ['Mysore', 'Mandya', 'Chamarajanagar'],
    'Mangalore': ['Dakshina Kannada', 'Udupi'],
    'Hubli': ['Dharwad', 'Haveri', 'Gadag'],
    'Belgaum': ['Belgaum', 'Bagalkot', 'Vijayapura'],
    'Gulbarga': ['Gulbarga', 'Bidar', 'Raichur'],
    'Bellary': ['Bellary', 'Koppal', 'Vijayanagara'],
    'Shimoga': ['Shimoga', 'Chikmagalur', 'Uttara Kannada']
  };

  const touristPlaces = {
    'Bangalore North': [
      { name: 'Nandi Hills', description: 'Ancient hill fortress with sunrise views', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { name: 'Skandagiri', description: 'Trekking destination and night trek spot', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400' }
    ],
    'Mysore': [
      { name: 'Mysore Palace', description: 'Royal palace with Indo-Saracenic architecture', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400' },
      { name: 'Chamundi Hills', description: 'Sacred hill with ancient temple', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' }
    ],
    'Dakshina Kannada': [
      { name: 'Gokarna Beach', description: 'Pristine beaches and pilgrimage site', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400' },
      { name: 'Murudeshwar', description: 'Coastal town with giant Shiva statue', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400' }
    ]
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk('');
  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Explore Karnataka by Map</h1>
            <p className="text-xl text-gray-600 mt-2">Click on districts or use dropdown to discover tourist places</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Karnataka Districts Map</h2>
              
              {/* Simple Interactive Map */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.keys(districts).map((district) => (
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
                    {Object.keys(districts).map((district) => (
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
                  Taluks in {selectedDistrict}
                </h3>
                <div className="space-y-2">
                  {districts[selectedDistrict].map((taluk) => (
                    <button
                      key={taluk}
                      onClick={() => handleTalukSelect(taluk)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedTaluk === taluk
                          ? 'bg-green-700 text-white'
                          : 'bg-gray-50 hover:bg-green-50 text-gray-700'
                      }`}
                    >
                      {taluk}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tourist Places */}
        {selectedTaluk && touristPlaces[selectedTaluk] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Tourist Places in {selectedTaluk}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {touristPlaces[selectedTaluk].map((place, index) => (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                    <p className="text-gray-600">{place.description}</p>
                    <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExploreMap;