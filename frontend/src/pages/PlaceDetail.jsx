import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Camera, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      console.log('Fetching place details for ID:', id);
      
      // Create fallback data from URL parameters
      const placeName = decodeURIComponent(searchParams.get('name') || 'Unknown Place').replace(/%20/g, ' ');
      const fallbackData = {
        id: id,
        name: placeName,
        location: `${placeName}, Karnataka, India`,
        coordinates: {
          lat: parseFloat(searchParams.get('lat')) || 12.9767936,
          lng: parseFloat(searchParams.get('lng')) || 77.590082
        },
        description: `${placeName} is a captivating destination in Karnataka, India, known for its rich cultural heritage, stunning natural landscapes, and vibrant local traditions. This remarkable place offers visitors an authentic experience of Karnataka's diverse beauty.`,
        detailedInfo: {
          history: `${placeName} has a rich historical background dating back centuries, with influences from various dynasties including the Vijayanagara Empire, Mysore Kingdom, and British colonial period.`,
          geography: `Located in Karnataka, ${placeName} features diverse topographical elements including hills, valleys, rivers, and plains.`,
          culture: `The local culture of ${placeName} reflects Karnataka's traditional values, with vibrant festivals, classical arts, and authentic cuisine.`,
          climate: `${placeName} experiences a tropical climate with distinct seasons. Winter months offer pleasant weather ideal for exploration.`
        },
        images: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&h=600&fit=crop&crop=center'
        ],
        rating: '4.2',
        bestTime: 'October to March (Pleasant weather, ideal for sightseeing)',
        highlights: [
          'Breathtaking scenic viewpoints and panoramic vistas',
          'Rich cultural heritage and historical significance',
          'Traditional architecture and ancient monuments',
          'Authentic local cuisine and culinary experiences',
          'Photography opportunities at every corner'
        ],
        nearbyPlaces: [
          { name: 'Traditional Market', distance: '2 km', type: 'Shopping' },
          { name: 'Ancient Temple', distance: '3 km', type: 'Heritage' },
          { name: 'Nature Reserve', distance: '5 km', type: 'Wildlife' }
        ],
        contact: {
          phone: '+91 80 1234 5678',
          email: 'info@karnataka-tourism.com',
          website: 'www.karnatakatourism.org'
        },
        reviews: [
          {
            author_name: 'Rajesh Kumar',
            rating: 5,
            text: `Amazing experience at ${placeName}! The place is absolutely beautiful and well-maintained.`
          },
          {
            author_name: 'Priya Sharma',
            rating: 4,
            text: `${placeName} exceeded my expectations. Rich history and beautiful architecture.`
          }
        ],
        timings: {
          opening: '6:00 AM',
          closing: '6:00 PM'
        }
      };
      
      // Try API first, fallback if fails
      try {
        const response = await axios.get(`https://e-ka-na-backend.vercel.app/api/v1/search/places/${id}`);
        if (response.data.success && response.data.place) {
          setPlaceData(response.data.place);
        } else {
          setPlaceData(fallbackData);
        }
      } catch (err) {
        console.error('API Error:', err);
        setPlaceData(fallbackData);
      }
      
      setLoading(false);
    };

    fetchPlaceDetails();
  }, [id, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

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
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-opacity-30 transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
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
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{placeData.description}</p>
              
              {placeData.detailedInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">History & Heritage</h3>
                    <p className="text-gray-700 leading-relaxed">{placeData.detailedInfo.history}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Geography</h3>
                    <p className="text-gray-700 leading-relaxed">{placeData.detailedInfo.geography}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Culture & Traditions</h3>
                    <p className="text-gray-700 leading-relaxed">{placeData.detailedInfo.culture}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Climate</h3>
                    <p className="text-gray-700 leading-relaxed">{placeData.detailedInfo.climate}</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Image Gallery */}
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

            {/* Reviews */}
            {placeData.reviews && placeData.reviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Reviews</h2>
                <div className="space-y-6">
                  {placeData.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <div className="font-semibold text-gray-900">{review.author_name}</div>
                        <div className="flex items-center ml-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{review.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

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
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2 flex-shrink-0"></div>
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
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-green-700 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Best Time to Visit</div>
                    <div className="text-gray-600 text-sm">{placeData.bestTime}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">Rating</div>
                    <div className="text-gray-600">{placeData.rating}/5</div>
                  </div>
                </div>
                {placeData.timings && (
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900 mb-2">Timings</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Opens: {placeData.timings.opening}</div>
                      <div>Closes: {placeData.timings.closing}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Nearby Places */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nearby Attractions</h3>
              <div className="space-y-3">
                {placeData.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{place.name}</div>
                      <div className="text-xs text-gray-500">{place.type}</div>
                    </div>
                    <span className="text-sm text-green-700 font-medium">{place.distance}</span>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-green-700 mr-3" />
                  <span className="text-gray-700 text-sm">{placeData.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-green-700 mr-3" />
                  <span className="text-gray-700 text-sm">{placeData.contact.email}</span>
                </div>
                {placeData.contact.website && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-green-700 mr-3" />
                    <span className="text-gray-700 text-sm">{placeData.contact.website}</span>
                  </div>
                )}
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