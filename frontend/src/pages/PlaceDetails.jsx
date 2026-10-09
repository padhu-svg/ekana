import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Star, Phone, Globe, Calendar, Info, Plane, Camera, Activity, Utensils, Bed } from 'lucide-react';
import { destinationsAPI } from '../services/api';

const Section = ({ id, title, icon: Icon, content }) => (
  <div id={id} className="mb-12 scroll-mt-24">
    <h2 className="text-3xl font-bold text-[#2A363B] mb-6 flex items-center font-heading border-b-2 border-[#81B29A]/30 pb-3">
      <Icon className="mr-3 h-8 w-8 text-[#E07A5F]" />
      {title}
    </h2>
    <div className="prose prose-lg text-gray-700 max-w-none leading-relaxed">
      {content || <p className="italic text-gray-500">Information about this section is currently being updated by our local community experts.</p>}
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
      <div className="min-h-screen bg-[#F4F1DE] flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E07A5F] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-[#F4F1DE] flex items-center justify-center pt-16">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-[#2A363B] mb-4 font-heading">Destination not found</h2>
          <p className="text-gray-600 mb-8">The place you're looking for might have been moved or doesn't exist.</p>
          <button
            onClick={() => navigate('/discover')}
            className="btn-primary"
          >
            Back to Discover
          </button>
        </div>
      </div>
    );
  }

  // Define navigation links for the Wikitravel format sidebar
  const sections = [
    { id: 'understand', title: 'Understand' },
    { id: 'get-in', title: 'Get in' },
    { id: 'see', title: 'See' },
    { id: 'do', title: 'Do' },
    { id: 'eat', title: 'Eat' },
    { id: 'sleep', title: 'Sleep' },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE] font-sans pt-16">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920'}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="mt-6 flex items-center space-x-2 text-white/90 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm w-fit"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="absolute bottom-12 left-4 sm:left-6 lg:left-8">
            <span className="inline-block bg-[#81B29A] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 shadow-lg">
              {place.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-heading text-shadow-lg">{place.name}</h1>
            <div className="flex items-center text-gray-200 text-xl font-medium">
              <MapPin className="h-6 w-6 mr-2 text-[#E07A5F]" />
              {place.district}, {place.state}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Table of Contents / Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#2A363B] mb-4 uppercase tracking-wider font-heading">Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className="block text-gray-600 hover:text-[#D0694E] hover:bg-[#F4F1DE] px-3 py-2 rounded-lg transition-colors font-medium"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-[#2A363B] mb-4 uppercase tracking-wider font-heading">Quick Info</h3>
                <div className="space-y-4">
                  {place.best_time && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-[#81B29A] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Best Time</p>
                        <p className="font-semibold text-gray-800">{place.best_time}</p>
                      </div>
                    </div>
                  )}
                  {place.duration && (
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-[#3D5A80] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Duration</p>
                        <p className="font-semibold text-gray-800">{place.duration}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content (Wikitravel Format) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
              
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

              {/* Photos Grid (Placed after Get In organically) */}
              {place.images && place.images.length > 1 && (
                <div className="my-12 grid grid-cols-2 gap-4">
                  {place.images.slice(1, 3).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${place.name} scenery ${index + 1}`}
                      className="w-full h-64 object-cover rounded-2xl shadow-md"
                    />
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
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-[#2A363B] mb-4 font-heading">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map(tag => (
                      <span key={tag} className="bg-[#F4F1DE] text-[#3D5A80] px-3 py-1.5 rounded-lg text-sm font-semibold uppercase tracking-wider">
                        {tag}
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