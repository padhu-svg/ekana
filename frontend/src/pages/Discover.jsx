import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, MapPin, Clock, X, Search, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { destinationsAPI } from '../services/api';

const Discover = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    district: searchParams.get('district') || '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Sync state if URL query params change
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const dist = searchParams.get('district') || '';
    setFilters({ category: cat, district: dist });
  }, [searchParams]);

  // Fetch filter metadata
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await destinationsAPI.getAll();
        const places = response.data || [];
        if (places.length > 0) {
          const uniqueCategories = [...new Set(places.map(d => d.category))].filter(Boolean).sort();
          const uniqueDistricts = [...new Set(places.map(d => d.district))].filter(Boolean).sort();
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
    const newFilters = {
      ...filters,
      [filterType]: filters[filterType] === value ? '' : value
    };
    setFilters(newFilters);

    // Update URL query params
    const params = {};
    if (newFilters.category) params.category = newFilters.category;
    if (newFilters.district) params.district = newFilters.district;
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setFilters({ category: '', district: '' });
    setSearchParams({});
    setSearchQuery('');
  };

  const filteredDestinations = destinations.filter(place => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (place.name && place.name.toLowerCase().includes(q)) ||
      (place.district && place.district.toLowerCase().includes(q)) ||
      (place.category && place.category.toLowerCase().includes(q)) ||
      (place.description && place.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#F4F1DE]/40 font-sans text-gray-900">
      
      {/* Top Banner */}
      <section className="bg-[#2A363B] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#E07A5F]/15 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="eyebrow-pill bg-white/10 text-[#81B29A] border-white/15 mb-3">
              <Compass className="w-3.5 h-3.5 text-[#E07A5F]" /> Curated Directory
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-2">
              Discover Karnataka Circuits
            </h1>
            <p className="text-white/70 text-base max-w-xl">
              Explore authentic heritage ruins, coastal escapes, wildlife reserves, and highland hill stations across 31 districts.
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#D0694E] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md self-start"
          >
            <Filter className="h-4 w-4" />
            <span>Filter Circuits</span>
          </button>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}
              >
                <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-200/80 sticky top-28">
                  
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                    <h3 className="text-base font-bold text-[#2A363B] font-heading uppercase tracking-wider">
                      Filter Results
                    </h3>
                    {(filters.category || filters.district) && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs font-bold text-[#E07A5F] hover:text-[#D0694E] underline"
                      >
                        Reset All
                      </button>
                    )}
                  </div>
                  
                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">
                      Theme / Circuit
                    </h4>
                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {categories.map(category => {
                        const isSelected = filters.category === category;
                        return (
                          <button
                            key={category}
                            onClick={() => handleFilterChange('category', category)}
                            className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#81B29A] text-white shadow-xs'
                                : 'bg-gray-50 text-gray-700 hover:bg-[#81B29A]/10 hover:text-[#63927A]'
                            }`}
                          >
                            <span>{category}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* District Filter */}
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">
                      District (31 Total)
                    </h4>
                    <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                      {districts.map(district => {
                        const isSelected = filters.district === district;
                        return (
                          <button
                            key={district}
                            onClick={() => handleFilterChange('district', district)}
                            className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#3D5A80] text-white shadow-xs'
                                : 'bg-gray-50 text-gray-700 hover:bg-[#3D5A80]/10 hover:text-[#293E58]'
                            }`}
                          >
                            <span>{district}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Destinations Grid Column */}
          <div className="lg:w-3/4">
            
            {/* Search Input & Count Bar */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-3 sm:p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter places by name, town..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-[#E07A5F] focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="text-xs font-semibold text-gray-500 self-end sm:self-auto">
                Showing <strong className="text-gray-900">{filteredDestinations.length}</strong> verified destination{filteredDestinations.length !== 1 ? 's' : ''}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-gray-100"></div>
                ))}
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <MapPin className="h-8 w-8 text-[#E07A5F]" />
                </div>
                <h3 className="text-xl font-bold text-[#2A363B] mb-2 font-heading">No destinations match this filter</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                  Try clearing your search query or selecting a different district/theme to discover more places.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary text-xs py-2.5 px-6"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full border border-gray-100 group"
                    onClick={() => navigate(`/place/${destination.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={destination.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-md text-[#2A363B] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                          {destination.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h3 className="text-base font-bold text-[#2A363B] font-heading group-hover:text-[#D0694E] transition-colors leading-snug">
                            {destination.name}
                          </h3>
                          <div className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-[#E07A5F] text-gray-400 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="flex items-center text-gray-500 text-xs mb-3">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-[#E07A5F] shrink-0" />
                          <span className="font-semibold text-gray-700">{destination.district}</span>
                        </div>

                        <p className="text-gray-600 line-clamp-3 text-xs leading-relaxed mb-4">
                          {destination.description}
                        </p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div className="flex items-center text-gray-500 font-medium">
                          <Clock className="h-3 w-3 mr-1 text-[#3D5A80]" />
                          <span>{destination.best_time || 'Oct-Mar'}</span>
                        </div>
                        <span className="text-[#D0694E] font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default Discover;