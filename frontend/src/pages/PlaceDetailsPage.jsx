import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Clock, Phone, Globe, Camera, ExternalLink } from 'lucide-react';

const PlaceDetailsPage = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/v1/search/places/${placeId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch place details');
        }
        
        const data = await response.json();
        if (data.success) {
          setPlaceData(data.place);
        } else {
          throw new Error(data.error || 'Failed to load place details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (placeId) {
      fetchPlaceDetails();
    }
  }, [placeId]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!placeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Place not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="h-96 relative">
            <img
              src={placeData.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200'}
              alt={placeData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{placeData.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{placeData.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>{placeData.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About {placeData.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {placeData.description}
              </p>
              
              {/* Highlights */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {placeData.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image Gallery */}
            {placeData.images && placeData.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            )}

            {/* Reviews */}
            {placeData.reviews && placeData.reviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Reviews</h2>
                <div className="space-y-6">
                  {placeData.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-gray-900">{review.author_name}</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-1">{review.text}</p>
                      <p className="text-xs text-gray-500">{review.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
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
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-green-700 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Best Time to Visit</div>
                    <div className="text-gray-600 text-sm">{placeData.bestTime}</div>
                  </div>
                </div>
                
                {placeData.timings && (
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900 mb-2">Opening Hours</div>
                    <div className="text-sm text-gray-600">
                      <div>{placeData.timings.opening} - {placeData.timings.closing}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {placeData.contact?.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-green-700 mr-3" />
                    <span className="text-gray-700 text-sm">{placeData.contact.phone}</span>
                  </div>
                )}
                {placeData.contact?.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-green-700 mr-3" />
                    <a 
                      href={placeData.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Visit Website
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;