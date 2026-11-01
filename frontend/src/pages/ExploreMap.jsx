import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Search, Compass, Sparkles, ArrowRight, ArrowUpRight, 
  Clock, Calendar, CheckCircle2, ChevronRight, X, Layers, Info
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { destinationsAPI } from '../services/api';
import { DISTRICT_PROFILES } from '../data/district_profiles';
import KarnatakaMap from '../components/Map/KarnatakaMap';

const ALL_31_DISTRICTS = [
  'Bagalkote', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 
  'Bidar', 'Chamarajanagara', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 
  'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 
  'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 
  'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 
  'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara', 'Vijayapura', 'Yadgir'
].sort();

const ExploreMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Read district from URL query params if present, default to 'Chikkamagaluru'
  const initialDistrict = searchParams.get('district') || 'Chikkamagaluru';
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [districtSearch, setDistrictSearch] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync URL query param when selected district changes
  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setSearchParams({ district });
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await destinationsAPI.getAll();
        setDestinations(response.data || []);
      } catch (err) {
        console.error('Failed to fetch destinations for map:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  // Compute destination counts per district
  const districtPlaceCounts = useMemo(() => {
    const counts = {};
    destinations.forEach(dest => {
      if (dest.district) {
        const d = dest.district.trim();
        counts[d] = (counts[d] || 0) + 1;
      }
    });
    return counts;
  }, [destinations]);

  // Filtered destinations for the currently selected district
  const districtDestinations = useMemo(() => {
    return destinations.filter(dest => 
      dest.district && dest.district.toLowerCase() === selectedDistrict.toLowerCase()
    );
  }, [destinations, selectedDistrict]);

  // Active district metadata profile
  const profile = DISTRICT_PROFILES[selectedDistrict] || {
    zone: 'Karnataka Regional Circuit',
    tagline: `Explore authentic local culture and attractions in ${selectedDistrict}`,
    highlights: ['Historical Monuments', 'Local Food', 'Natural Scenery'],
    bestTime: 'Oct - Mar',
    terrain: 'Deccan & Sahyadri Landscapes',
    description: `Discover heritage, vibrant traditions, and curated trails across ${selectedDistrict}.`
  };

  // Filter districts based on search input
  const searchedDistricts = useMemo(() => {
    if (!districtSearch.trim()) return ALL_31_DISTRICTS;
    return ALL_31_DISTRICTS.filter(d => 
      d.toLowerCase().includes(districtSearch.toLowerCase().trim())
    );
  }, [districtSearch]);

  return (
    <div className="min-h-screen bg-[#F4F1DE]/40 font-sans text-gray-900 pb-24">
      
      {/* Top Banner */}
      <section className="bg-[#2A363B] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#E07A5F]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#81B29A]/15 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="eyebrow-pill bg-white/10 text-[#81B29A] border-white/15 mb-3">
                <Compass className="w-3.5 h-3.5 text-[#E07A5F]" /> Interactive District Map
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mt-1 mb-2">
                Explore Karnataka by District
              </h1>
              <p className="text-white/70 text-sm sm:text-base max-w-2xl leading-relaxed">
                Click any of Karnataka’s 31 districts on the vector map to uncover verified heritage monuments, misty hill summits, and plan a custom itinerary.
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
                placeholder="Find district (e.g. Kodagu, Hampi)..."
                className="w-full pl-9 pr-9 py-2.5 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-[#2A363B] placeholder-white/50 focus:placeholder-gray-400 rounded-full border border-white/20 focus:border-[#E07A5F] text-sm focus:outline-none transition-all shadow-inner"
              />
              {districtSearch && (
                <button 
                  onClick={() => setDistrictSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Map & Details Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* District Fast-Switch Pills Bar */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border border-gray-100 mb-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 px-3">
              31 Districts:
            </span>
            {searchedDistricts.map(district => {
              const isSelected = district.toLowerCase() === selectedDistrict.toLowerCase();
              return (
                <button
                  key={district}
                  onClick={() => handleSelectDistrict(district)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#2A363B] text-white shadow-md scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-[#E07A5F]/10 hover:text-[#D0694E] border border-gray-100'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#E07A5F]' : 'bg-gray-400'}`}></span>
                  <span>{district}</span>
                  {districtPlaceCounts[district] > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {districtPlaceCounts[district]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Grid (Desktop: Map 7 Cols, Info 5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 h-[540px] sm:h-[620px] lg:h-[750px] sticky top-24">
            <KarnatakaMap 
              selectedDistrict={selectedDistrict}
              onSelectDistrict={handleSelectDistrict}
              districtPlaceCounts={districtPlaceCounts}
            />
          </div>

          {/* District Information & Destinations Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* District Hero Card */}
            <motion.div 
              key={selectedDistrict}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E07A5F]/5 rounded-bl-full pointer-events-none"></div>

              {/* Eyebrow & District Title */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="eyebrow-pill bg-[#E07A5F]/10 text-[#D0694E] border-[#E07A5F]/20 text-[11px]">
                  {profile.zone}
                </span>
                <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                  {districtDestinations.length} Verified Destination{districtDestinations.length === 1 ? '' : 's'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A363B] font-heading tracking-tight mb-2">
                {selectedDistrict}
              </h2>
              
              <p className="text-xs sm:text-sm font-semibold text-[#3D5A80] mb-4">
                {profile.tagline}
              </p>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                {profile.description}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 p-3.5 rounded-2xl border border-gray-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Best Travel Season</span>
                  <span className="font-semibold text-[#2A363B] flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E07A5F]" />
                    {profile.bestTime}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Terrain & Landscape</span>
                  <span className="font-semibold text-[#2A363B] flex items-center gap-1.5 mt-0.5 truncate" title={profile.terrain}>
                    <Layers className="w-3.5 h-3.5 text-[#81B29A]" />
                    {profile.terrain}
                  </span>
                </div>
              </div>

              {/* Signature Highlights */}
              {profile.highlights && (
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Key Highlights
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.highlights.map((h, i) => (
                      <span key={i} className="text-xs bg-gray-100/80 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: Plan a Trip & Discover */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => navigate(`/plan?district=${encodeURIComponent(selectedDistrict)}`)}
                  className="flex-1 btn-primary py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Plan Trip to {selectedDistrict}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => navigate(`/discover?district=${encodeURIComponent(selectedDistrict)}`)}
                  className="btn-secondary py-3 px-4 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <span>View All in Discover</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>

            {/* Curated Destinations List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#2A363B] font-heading flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E07A5F]" />
                  <span>Places to Visit in {selectedDistrict}</span>
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  Showing {districtDestinations.length} places
                </span>
              </div>

              {loading ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-gray-100">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#E07A5F] border-t-transparent mx-auto"></div>
                  <p className="mt-2 text-xs text-gray-500 font-medium">Loading verified destinations...</p>
                </div>
              ) : districtDestinations.length > 0 ? (
                <div className="space-y-4">
                  {districtDestinations.map((place, idx) => (
                    <motion.div
                      key={place.id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -3 }}
                      onClick={() => navigate(`/place/${place.id}`)}
                      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-gray-100 transition-all cursor-pointer flex gap-4 group"
                    >
                      {/* Thumbnail */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 relative bg-gray-100">
                        <img 
                          src={place.images?.[0] || 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400'} 
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-full text-[#2A363B] shadow-xs">
                          {place.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <h4 className="text-sm font-bold text-[#2A363B] font-heading group-hover:text-[#D0694E] transition-colors truncate">
                              {place.name}
                            </h4>
                            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#E07A5F] shrink-0 transition-colors" />
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {place.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-[11px] text-gray-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#81B29A]" />
                            {place.best_time || 'Oct - Mar'}
                          </span>
                          <span className="text-[#D0694E] font-bold group-hover:translate-x-0.5 transition-transform">
                            Full Guide →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Empty state when no places are cataloged for this district */
                <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3 text-gray-400">
                    <MapPin className="w-6 h-6 text-[#E07A5F]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#2A363B] mb-1">
                    No destinations cataloged yet for {selectedDistrict}
                  </h4>
                  <p className="text-xs text-gray-500 mb-4 max-w-xs mx-auto">
                    We are actively surveying verified eco-homestays and local circuits in this district.
                  </p>
                  <button
                    onClick={() => navigate('/discover')}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Browse All Karnataka Destinations
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ExploreMap;