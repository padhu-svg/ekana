import { motion } from 'framer-motion';
import { 
  Search, Mountain, TreePine, Waves, Camera, Users, Leaf, Utensils, 
  ArrowUpRight, ArrowRight, Compass, Sparkles, MapPin, Clock, Calendar, 
  ShieldCheck, HeartHandshake, Eye, CheckCircle2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { destinationsAPI } from '../services/api';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const MARQUEE_DESTINATIONS = [
  'Hampi Heritage Ruins', 'Coorg Coffee Hills', 'Gokarna Om Beach', 'Badami Cave Temples',
  'Kabini Wildlife Reserve', 'Jog Waterfalls', 'Mysuru Royal Palace', 'Belur Hoysala Temples',
  'Mullayanagiri Peak', 'Dandeli Kali River', 'Pattadakal UNESCO Site', 'Nagarhole Forest'
];

const CIRCUIT_PREVIEWS = {
  'Heritage': {
    title: 'Chalukya & Vijayanagara Heritage',
    desc: 'Step into millennia of stone poetry, intricate rock-cut cave temples, and UNESCO World Heritage sites.',
    places: ['Badami', 'Hampi', 'Pattadakal', 'Belur', 'Aihole'],
    img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&auto=format&fit=crop'
  },
  'Hills': {
    title: 'Misty Western Ghats & Coffee Highlands',
    desc: 'Rolling emerald shola forests, aromatic coffee plantations, and the highest trekking peaks in South India.',
    places: ['Chikkamagaluru', 'Kodagu (Coorg)', 'Kudremukh', 'Kemmanagundi'],
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&auto=format&fit=crop'
  },
  'Wildlife': {
    title: 'Untamed Jungles & Elephant Corridors',
    desc: 'Home to the world’s highest density of tigers and Asian elephants in protected evergreen sanctuaries.',
    places: ['Kabini', 'Nagarhole', 'Bandipur', 'Bhadra Reserve'],
    img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=1000&auto=format&fit=crop'
  },
  'Coast': {
    title: 'Karavali Golden Sands & Sacred Coves',
    desc: 'Unspoiled coastal shorelines where the Arabian Sea meets the lush foothills of the Western Ghats.',
    places: ['Gokarna', 'Udupi Malpe', 'Karwar', 'Murudeshwar'],
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop'
  },
  'Culture': {
    title: 'Living Traditions, Yakshagana & Crafts',
    desc: 'Centuries-old folk theater, delicate Mysore silk weaving, and vibrant village craft heritage.',
    places: ['Mysuru', 'Udupi', 'Kinnal', 'Ilkal'],
    img: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=1000&auto=format&fit=crop'
  },
  'Eco-Tourism': {
    title: 'Responsible Trails & Rural Homestays',
    desc: 'Experience zero-waste village living, community organic farms, and biodiversity conservation trails.',
    places: ['Mandya', 'Agumbe', 'Dandeli', 'BR Hills'],
    img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1000&auto=format&fit=crop'
  },
  'Cuisine': {
    title: 'Authentic Flavors of Karnataka',
    desc: 'From fiery Mangaluru Ghee Roast and fresh Neer Dosa to wholesome North Karnataka Jolada Rotti meals.',
    places: ['Mangaluru', 'Dharwad', 'Mysuru', 'Ballari'],
    img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000&auto=format&fit=crop'
  }
};

const Home = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeCircuit, setActiveCircuit] = useState('Heritage');
  const navigate = useNavigate();

  const categories = [
    { name: 'Heritage', icon: Camera, color: 'bg-[#D0694E]' },
    { name: 'Hills', icon: Mountain, color: 'bg-[#3D5A80]' },
    { name: 'Wildlife', icon: TreePine, color: 'bg-[#63927A]' },
    { name: 'Coast', icon: Waves, color: 'bg-[#3D5A80]' },
    { name: 'Culture', icon: Users, color: 'bg-[#E07A5F]' },
    { name: 'Eco-Tourism', icon: Leaf, color: 'bg-[#81B29A]' },
    { name: 'Cuisine', icon: Utensils, color: 'bg-[#E07A5F]' }
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

  const currentPreview = CIRCUIT_PREVIEWS[activeCircuit] || CIRCUIT_PREVIEWS['Heritage'];

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900 selection:bg-[#E07A5F]/20 selection:text-[#2A363B]">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#2A363B]">
        {/* Background photo with cinematic multi-stop gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform transition-transform duration-1000"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop)' }}
        ></div>
        
        {/* Dark filmic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A363B]/80 via-[#2A363B]/75 to-[#2A363B]/95"></div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 flex-1 flex flex-col justify-center text-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center justify-center"
          >
            <span className="eyebrow-pill bg-white/10 text-[#F4F1DE] border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse"></span>
              <span>ಗಂಧದ ಗುಡಿ – ವಿಶ್ವ ಪ್ರವಾಸಿಗರ ಗಮ್ಯಸ್ಥಾನ</span>
            </span>
          </motion.div>

          {/* Hero Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.08] font-heading max-w-5xl mx-auto mb-6"
          >
            Experience Karnataka{' '}
            <span className="text-[#E07A5F] drop-shadow-md italic font-serif">Naturally</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-normal leading-relaxed mb-10"
          >
            Your sustainable digital gateway to Karnataka’s 31 districts—curated heritage circuits, misty Western Ghats trails, and authentic rural homestays.
          </motion.p>

          {/* Floating Search Capsule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="max-w-2xl mx-auto w-full relative mb-8"
          >
            <SearchBar onResults={handleSearchResults} />
            {showSearchResults && (
              <SearchResults 
                results={searchResults} 
                onClose={closeSearchResults}
              />
            )}
          </motion.div>

          {/* Secondary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button 
              onClick={() => navigate('/plan')}
              className="btn-primary text-sm sm:text-base"
            >
              <span>Build Smart Itinerary</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/map')}
              className="btn-ghost text-sm sm:text-base"
            >
              <Compass className="w-4 h-4" />
              <span>Explore 31 Districts</span>
            </button>
          </motion.div>

        </div>

        {/* Hero Bottom Stats Strip */}
        <div className="relative z-10 w-full border-t border-white/10 bg-[#2A363B]/60 backdrop-blur-md py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="px-3 py-1">
                <p className="text-xl md:text-2xl font-bold text-white tracking-tight">31 Districts</p>
                <p className="text-xs text-white/60 font-medium">All Karnataka Covered</p>
              </div>
              <div className="px-3 py-1">
                <p className="text-xl md:text-2xl font-bold text-[#E07A5F] tracking-tight">100% Genuine</p>
                <p className="text-xs text-white/60 font-medium">Verified Historical Data</p>
              </div>
              <div className="px-3 py-1">
                <p className="text-xl md:text-2xl font-bold text-[#81B29A] tracking-tight">Curated Circuits</p>
                <p className="text-xs text-white/60 font-medium">Heritage, Hills & Coast</p>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Marquee Ticker (Grooviz style) */}
        <div className="relative w-full bg-[#1F2937] py-3 overflow-hidden border-t border-white/5">
          {/* Left / Right Fade Masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#1F2937] to-transparent"></div>
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#1F2937] to-transparent"></div>
          
          <div className="flex w-max animate-marquee-scroll">
            {[...MARQUEE_DESTINATIONS, ...MARQUEE_DESTINATIONS].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 px-6 text-xs font-semibold text-white/70 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#81B29A]"></span>
                <span className="tracking-wider uppercase">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* HOW IT WORKS (3-Step Connected Journey, like Grooviz) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow-pill bg-[#E07A5F]/10 text-[#D0694E] border-[#E07A5F]/20 mb-3">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2A363B] font-heading tracking-tight mt-2 mb-4">
              Explore Authentically in 3 Simple Steps
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Designed for travelers seeking genuine cultural connections, effortless planning, and community-first hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
            
            {/* Step 01 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#F4F1DE]/40 rounded-3xl p-8 border border-gray-200/70 relative transition-all duration-300 hover:shadow-xl hover:bg-white group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-xs font-extrabold tracking-widest text-[#E07A5F] bg-[#E07A5F]/10 px-3 py-1 rounded-full uppercase">
                  Step 01
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#2A363B] mb-3 font-heading">
                Choose Circuit & District
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Filter by curated themes—Heritage, Western Ghats, Coastal Karavali, or Wildlife across all 31 districts.
              </p>
            </motion.div>

            {/* Step 02 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#F4F1DE]/40 rounded-3xl p-8 border border-gray-200/70 relative transition-all duration-300 hover:shadow-xl hover:bg-white group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#3D5A80] text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-xs font-extrabold tracking-widest text-[#3D5A80] bg-[#3D5A80]/10 px-3 py-1 rounded-full uppercase">
                  Step 02
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#2A363B] mb-3 font-heading">
                Smart AI Itinerary Builder
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Generate personalized day-by-day travel routes customized to your duration, traveler count, and personal interests.
              </p>
            </motion.div>

            {/* Step 03 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#F4F1DE]/40 rounded-3xl p-8 border border-gray-200/70 relative transition-all duration-300 hover:shadow-xl hover:bg-white group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#81B29A] text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <span className="text-xs font-extrabold tracking-widest text-[#81B29A] bg-[#81B29A]/10 px-3 py-1 rounded-full uppercase">
                  Step 03
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#2A363B] mb-3 font-heading">
                Travel with Communities
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Stay at verified rural homestays, hire certified local guides, and ensure tourism revenue directly benefits artisans.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE CIRCUIT SHOWCASE (Grooviz Platform Preview Style) */}
      <section className="py-24 bg-[#F4F1DE]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow-pill bg-[#3D5A80]/10 text-[#3D5A80] border-[#3D5A80]/20 mb-3">
              Curated Circuits
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2A363B] font-heading tracking-tight mt-2 mb-4">
              Explore by Signature Themes
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Click a theme to preview highlights, landscapes, and key destinations.
            </p>
          </div>

          {/* Theme Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCircuit === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCircuit(cat.name)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#2A363B] text-white shadow-md scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#E07A5F]' : 'text-gray-500'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Preview Showcase Card */}
          <motion.div 
            key={activeCircuit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Column */}
            <div className="lg:col-span-7 h-72 lg:h-auto relative overflow-hidden">
              <img 
                src={currentPreview.img} 
                alt={currentPreview.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              />
              <div className="absolute top-4 left-4 bg-[#2A363B]/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {activeCircuit} Circuit
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#2A363B] font-heading mb-4 leading-snug">
                  {currentPreview.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {currentPreview.desc}
                </p>

                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Featured Highlights in this Circuit:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentPreview.places.map((place, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/discover?category=${encodeURIComponent(activeCircuit)}`)}
                className="btn-primary w-full justify-center text-sm py-3.5"
              >
                <span>Discover All {activeCircuit} Places</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="eyebrow-pill bg-[#81B29A]/15 text-[#63927A] border-[#81B29A]/30 mb-3">
                Curated Highlights
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2A363B] font-heading tracking-tight mt-2">
                Featured Karnataka Destinations
              </h2>
            </div>
            <button
              onClick={() => navigate('/discover')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#E07A5F] hover:text-[#D0694E] transition-colors self-start md:self-auto"
            >
              <span>View All 31 Districts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-3xl h-96 animate-pulse border border-gray-200"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(`/place/${destination.id}`)}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  {/* Card Thumbnail */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-[#2A363B] px-3.5 py-1 rounded-full text-xs font-bold shadow-sm">
                        {destination.category}
                      </span>
                    </div>
                    {destination.district && (
                      <div className="absolute bottom-4 left-4 bg-[#2A363B]/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E07A5F]" />
                        <span>{destination.district}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-[#2A363B] font-heading group-hover:text-[#D0694E] transition-colors leading-snug">
                          {destination.name}
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#E07A5F] group-hover:text-white text-gray-400 flex items-center justify-center shrink-0 transition-colors">
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {destination.description}
                      </p>
                    </div>

                    {destination.best_time && (
                      <div className="pt-4 border-t border-gray-100 flex items-center text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-[#81B29A]" />
                        <span>Best season: <strong className="text-gray-700">{destination.best_time}</strong></span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* SUSTAINABLE & RESPONSIBLE TOURISM BANNER (Grooviz dark section style) */}
      <section className="py-24 bg-[#2A363B] text-white relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#3D5A80]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#E07A5F]/15 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow-pill bg-white/10 text-[#81B29A] border-white/15 mb-3">
              Responsible Tourism
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight mt-2 mb-4">
              Preserving Karnataka’s Fragile Beauty
            </h2>
            <p className="text-white/70 text-base sm:text-lg">
              EKaNa bridges tourism and sustainability—supporting rural livelihoods, conserving biodiversity, and keeping travel circular.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#81B29A]/20 text-[#81B29A] flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-heading">Direct Community Benefit</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Connect directly with rural homestay families and local guides, ensuring travel spend benefits village economies.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-heading">Zero-Waste Eco-Trails</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Protecting Western Ghats trekking routes through regulated footfall, waste protocol compliance, and flora preservation.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#3D5A80]/30 text-[#81B29A] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-heading">Living Heritage Preservation</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Documenting and narrating ancient architecture, temple traditions, and artisanal crafts for global travelers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/sustainability')}
              className="btn-ghost"
            >
              <span>Learn About Sustainable Tourism</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION (CTA) */}
      <section className="py-20 bg-[#F4F1DE]/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#2A363B] to-[#3D5A80] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <span className="eyebrow-pill bg-white/10 text-[#E07A5F] border-white/15 mb-4">
                Plan Your Journey
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight mb-6">
                Ready to Experience Karnataka?
              </h2>
              <p className="text-white/80 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Tell our smart trip builder your preferences, duration, and group size for a personalized, eco-friendly itinerary.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/plan')}
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  <span>Build My Itinerary Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/map')}
                  className="btn-ghost px-8 py-3.5 text-base"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Districts Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;