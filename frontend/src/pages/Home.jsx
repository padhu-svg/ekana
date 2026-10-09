import { motion } from 'framer-motion';
import { Search, Mountain, TreePine, Waves, Camera, Users, Leaf, Landmark, Castle, Utensils } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { destinationsAPI } from '../services/api';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Heritage', icon: Camera, color: 'bg-[#D0694E]' }, // Terracotta
    { name: 'Hills', icon: Mountain, color: 'bg-[#3D5A80]' }, // Blue
    { name: 'Wildlife', icon: TreePine, color: 'bg-[#63927A]' }, // Green
    { name: 'Coast', icon: Waves, color: 'bg-[#3D5A80]' }, // Blue
    { name: 'Culture', icon: Users, color: 'bg-[#E07A5F]' }, // Terracotta
    { name: 'Eco-Tourism', icon: Leaf, color: 'bg-[#81B29A]' }, // Green
    { name: 'Cuisine', icon: Utensils, color: 'bg-[#E07A5F]' } // Terracotta
  ];

  useEffect(() => {
    fetchFeaturedDestinations();
  }, []);

  const fetchFeaturedDestinations = async () => {
    try {
      setLoading(true);
      const response = await destinationsAPI.getAll();
      const destinations = response.data || [];
      setFeaturedDestinations(destinations.slice(0, 3));
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setFeaturedDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop)'}}></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-heading mb-4 text-[#F4F1DE]"
          >
            ಗಂದದ ಗುಡಿ – ವಿಶ್ವ ಪ್ರವಾಸಿಗರ ಗಮ್ಯಸ್ಥಾನ
          </motion.h3>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-heading"
          >
            Experience Karnataka
            <br />
            <span className="text-[#E07A5F] drop-shadow-lg">Naturally</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto font-medium text-gray-200"
          >
            Discover authentic local experiences across Karnataka's diverse landscapes, vibrant culture, and rich heritage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto relative"
          >
            <SearchBar onResults={handleSearchResults} />
            {showSearchResults && (
              <SearchResults 
                results={searchResults} 
                onClose={closeSearchResults}
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-[#F4F1DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-[#2A363B] mb-6 font-heading">Explore by Category</h2>
            <p className="text-2xl text-gray-700 font-medium">Immerse yourself in themes that define Karnataka</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center cursor-pointer group"
                onClick={() => navigate(`/discover?category=${encodeURIComponent(category.name)}`)}
              >
                <div className={`${category.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 border-4 border-white/50`}>
                  <category.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-[#2A363B] text-lg">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-[#2A363B] mb-6 font-heading">Featured Destinations</h2>
            <p className="text-2xl text-gray-600 font-medium">Curated local experiences waiting for you</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl shadow-lg animate-pulse border border-gray-200">
                  <div className="h-72 bg-gray-300 rounded-t-2xl"></div>
                  <div className="p-8">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {featuredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="card overflow-hidden cursor-pointer group"
                  onClick={() => navigate(`/place/${destination.id}`)}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={destination.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-[#81B29A] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {destination.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 bg-white group-hover:bg-[#F4F1DE] transition-colors duration-300">
                    <h3 className="text-3xl font-bold text-[#2A363B] mb-4 font-heading">{destination.name}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed line-clamp-3">{destination.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#2A363B] to-[#3D5A80] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-8 leading-tight font-heading">Ready to Plan Your Karnataka Adventure?</h2>
            <p className="text-2xl text-[#F4F1DE] mb-12 font-medium leading-relaxed opacity-90">
              Let our smart trip planner create a curated, eco-friendly itinerary for you.
            </p>
            <button 
              className="btn-primary text-xl px-12 py-4 shadow-xl"
              onClick={() => navigate('/plan')}
            >
              Start Planning Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;