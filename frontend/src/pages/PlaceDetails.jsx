import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Clock, Calendar, Info, Plane, Camera, 
  Activity, Utensils, Bed, Compass, ArrowUpRight, Share2, Sparkles 
} from 'lucide-react';
import { destinationsAPI } from '../services/api';

const Section = ({ id, title, icon: Icon, content }) => (
  <div id={id} className="mb-10 scroll-mt-28">
    <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
      <div className="w-10 h-10 rounded-2xl bg-[#E07A5F]/10 text-[#E07A5F] flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-bold text-[#2A363B] font-heading">
        {title}
      </h2>
    </div>
    <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
      {content || (
        <p className="italic text-gray-400 text-sm">
          Information about this section is currently being updated by our verified local guides.
        </p>
      )}
    </div>
  </div>
);

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
      <div className="min-h-screen bg-[#F4F1DE]/40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#E07A5F] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-[#F4F1DE]/40 flex items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
          <MapPin className="w-12 h-12 text-[#E07A5F] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2A363B] mb-2 font-heading">Destination Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">The place you're looking for might have been moved or does not exist.</p>
          <button
            onClick={() => navigate('/discover')}
            className="btn-primary text-xs py-2.5 px-6"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'understand', title: 'Understand' },
    { id: 'get-in', title: 'Get in' },
    { id: 'see', title: 'See' },
    { id: 'do', title: 'Do' },
    { id: 'eat', title: 'Eat' },
    { id: 'sleep', title: 'Sleep' },
  ];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE]/40 font-sans text-gray-900 pb-24">
      
      {/* Hero Visual Header */}
      <div className="relative h-[55vh] min-h-[380px] bg-[#2A363B] overflow-hidden">
        <img
          src={place.images?.[0] || '/images/places/district_29_hampi.jpg'}
          alt={place.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A363B] via-[#2A363B]/40 to-transparent"></div>
        
        {/* Navigation & Actions Top Bar */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between z-20">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full backdrop-blur-md text-xs font-semibold transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: place.name, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="inline-flex items-center gap-1.5 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 px-3.5 py-2 rounded-full backdrop-blur-md text-xs font-semibold transition-all"
            aria-label="Share Destination"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Hero Title & Info */}
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="max-w-3xl">
            <span className="eyebrow-pill bg-white/20 text-white border-white/30 backdrop-blur-md mb-3">
              {place.category}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-heading tracking-tight mb-3">
              {place.name}
            </h1>
            <div className="flex flex-wrap items-center text-white/80 text-sm font-medium gap-3">
              <span className="inline-flex items-center text-white">
                <MapPin className="h-4 w-4 mr-1 text-[#E07A5F]" />
                {place.district}, {place.state || 'Karnataka'}
              </span>
              {place.best_time && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-[#81B29A]" />
                    Best: {place.best_time}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Table of Contents / Sidebar (3 cols) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-6">
              
              {/* Wikitravel Section Links */}
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Traveler Guide Index
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => scrollToSection(e, section.id)}
                      className="block text-gray-600 hover:text-[#2A363B] hover:bg-gray-50 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Info Box */}
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Quick Details
                </h3>
                
                <div className="space-y-3.5 text-xs">
                  {place.best_time && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 font-medium">Best Season</span>
                      <strong className="text-gray-900 font-bold">{place.best_time}</strong>
                    </div>
                  )}

                  {place.duration && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 font-medium">Suggested Time</span>
                      <strong className="text-gray-900 font-bold">{place.duration}</strong>
                    </div>
                  )}

                  {place.district && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 font-medium">District</span>
                      <strong className="text-[#3D5A80] font-bold">{place.district}</strong>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate('/plan')}
                  className="btn-primary w-full justify-center text-xs py-3 mt-6"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Add to Trip Plan</span>
                </button>
              </div>

            </div>
          </div>

          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-10 border border-gray-100">
              
              <Section 
                id="understand" 
                title="Understand" 
                icon={Info} 
                content={<p>{place.description}</p>} 
              />
              
              <Section 
                id="get-in" 
                title="Get in" 
                icon={Plane} 
                content={place.get_in ? <p>{place.get_in}</p> : null} 
              />

              {/* Extra Images Grid */}
              {place.images && place.images.length > 1 && (
                <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {place.images.slice(1, 3).map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-2xl h-56 shadow-xs border border-gray-100">
                      <img
                        src={image}
                        alt={`${place.name} view ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              <Section 
                id="see" 
                title="See" 
                icon={Camera} 
                content={place.see ? <p>{place.see}</p> : null} 
              />

              <Section 
                id="do" 
                title="Do" 
                icon={Activity} 
                content={place.do ? <p>{place.do}</p> : null} 
              />

              <Section 
                id="eat" 
                title="Eat" 
                icon={Utensils} 
                content={place.eat ? <p>{place.eat}</p> : null} 
              />

              <Section 
                id="sleep" 
                title="Sleep" 
                icon={Bed} 
                content={place.sleep ? <p>{place.sleep}</p> : null} 
              />

              {place.tags && place.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Keywords & Circuit Tags:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default PlaceDetails;