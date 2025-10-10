import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Camera, Phone, Mail } from 'lucide-react';

const PlaceDetail = ({ place }) => {
  const placeData = {
    name: 'Nandi Hills',
    location: 'Bangalore North, Karnataka',
    description: 'Nandi Hills is an ancient hill fortress built by Tipu Sultan. Located at an altitude of 1,478 meters, it offers breathtaking sunrise views and is a popular weekend getaway from Bangalore.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800'
    ],
    bestTime: 'October to March',
    rating: 4.5,
    highlights: [
      'Sunrise viewpoint',
      'Tipu Sultan\'s Summer Palace',
      'Ancient temples',
      'Trekking trails',
      'Photography spots'
    ],
    nearbyPlaces: [
      { name: 'Skandagiri', distance: '8 km' },
      { name: 'Muddenahalli', distance: '12 km' },
      { name: 'Lepakshi', distance: '35 km' }
    ],
    contact: {
      phone: '+91 80 1234 5678',
      email: 'info@nandihills.com'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={placeData.images[0]}
          alt={placeData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-2"
          >
            {placeData.name}
          </motion.h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{placeData.location}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-1 text-yellow-400" />
              <span className="text-lg">{placeData.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About {placeData.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{placeData.description}</p>
            </motion.div>

            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {placeData.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
                    <img
                      src={image}
                      alt={`${placeData.name} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {placeData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                    <span className="text-lg text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-700 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">Best Time to Visit</div>
                    <div className="text-gray-600">{placeData.bestTime}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">Rating</div>
                    <div className="text-gray-600">{placeData.rating}/5</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nearby Places */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nearby Places</h3>
              <div className="space-y-3">
                {placeData.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{place.name}</span>
                    <span className="text-sm text-gray-600">{place.distance}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-green-700 mr-3" />
                  <span className="text-gray-700">{placeData.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-green-700 mr-3" />
                  <span className="text-gray-700">{placeData.contact.email}</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors font-semibold">
                Plan Your Visit
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;