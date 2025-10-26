import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Star, Phone, Globe, Calendar } from 'lucide-react';
import { destinationsAPI } from '../services/api';

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaceDetails();
  }, [id]);

  const fetchPlaceDetails = async () => {
    try {
      setLoading(true);
      const response = await destinationsAPI.getById(id);
      setPlace(response.data);
    } catch (error) {
      console.error('Error fetching place details:', error);
      setPlace(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading place details...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
          <button
            onClick={() => navigate('/discover')}
            className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
          >
            Back to Discover
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{place.name}</h1>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{place.district}, {place.state}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                {place.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <img
                    src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'}
                    alt={place.name}
                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
                {place.images?.slice(1, 3).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${place.name} ${index + 2}`}
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {place.name}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{place.description}</p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-4">
                {place.best_time && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Best Time to Visit</p>
                      <p className="font-semibold text-gray-900">{place.best_time}</p>
                    </div>
                  </div>
                )}
                
                {place.duration && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">{place.duration}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold text-gray-900">{place.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            {(place.latitude && place.longitude) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">{place.district}, {place.state}</p>
                  <p className="text-sm text-gray-500">
                    Coordinates: {place.latitude}, {place.longitude}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;