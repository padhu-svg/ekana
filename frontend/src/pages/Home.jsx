import { motion } from 'framer-motion';
import { Search, Mountain, TreePine, Waves, Camera, Users, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';
import { destinationsAPI } from '../services/api';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const categories = [
    { name: 'Heritage', icon: Camera, color: 'bg-green-600' },
    { name: 'Hills', icon: Mountain, color: 'bg-green-700' },
    { name: 'Wildlife', icon: TreePine, color: 'bg-green-800' },
    { name: 'Coast', icon: Waves, color: 'bg-green-500' },
    { name: 'Culture', icon: Users, color: 'bg-green-600' },
    { name: 'Eco-Tourism', icon: Leaf, color: 'bg-green-700' },
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop)'}}></div>
        <div className="absolute inset-0 bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          >
            Experience Karnataka
            <br />
            <span className="text-green-200 text-shadow-lg">Naturally</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto font-medium text-green-50"
          >
            Discover authentic local experiences across Karnataka's diverse landscapes
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
      <section className="py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Explore by Category</h2>
            <p className="text-2xl text-gray-700 font-medium">Discover Karnataka's diverse attractions</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center cursor-pointer group"
              >
                <div className={`${category.color} w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                  <category.icon className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
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
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Featured Destinations</h2>
            <p className="text-2xl text-gray-700 font-medium">Must-visit places in Karnataka</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg animate-pulse">
                  <div className="h-72 bg-gray-300 rounded-t-lg"></div>
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
                  onClick={() => window.location.href = `/place/${destination.id}`}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={destination.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {destination.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{destination.name}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{destination.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-8 leading-tight">Ready to Plan Your Karnataka Adventure?</h2>
            <p className="text-2xl text-green-100 mb-12 font-medium leading-relaxed">
              Let our AI-powered trip planner create the perfect itinerary for you
            </p>
            <button className="btn-secondary text-xl px-12 py-4 text-white bg-green-600 hover:bg-green-500">
              Start Planning Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;