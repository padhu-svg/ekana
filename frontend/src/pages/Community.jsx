import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Users, Star, MapPin, Coffee, Phone, ArrowUpRight, 
  Compass, ShieldCheck, Mail, MessageSquare, X, CheckCircle2 
} from 'lucide-react';

const Community = () => {
  const [filter, setFilter] = useState('All');
  const [contactModal, setContactModal] = useState(null);
  const [contactSent, setContactSent] = useState(false);

  const listings = [
    { 
      id: 1, 
      type: 'Homestay', 
      name: 'Gowda Heritage Estate', 
      location: 'Chikkamagaluru', 
      rating: 4.9, 
      reviews: 142, 
      img: '/images/themes/theme_hills.jpg', 
      desc: 'Authentic Malnad plantation home nestled within coffee estates. Enjoy home-cooked akki rotti, bird-watching trails, and estate walks with the host family.',
      contact: { phone: '+91 94801 22340', email: 'gowda.estate@ekana.life' }
    },
    { 
      id: 2, 
      type: 'Local Guide', 
      name: 'Ramesh Hampi Heritage Tours', 
      location: 'Hampi (Vijayanagara)', 
      rating: 4.9, 
      reviews: 318, 
      img: '/images/places/district_29_hampi.jpg', 
      desc: 'Archaeological historian with 14 years of storytelling experience across Vijayanagara ruins, offering guided bicycle and sunset walking trails.',
      contact: { phone: '+91 98450 67120', email: 'ramesh.hampi@ekana.life' }
    },
    { 
      id: 3, 
      type: 'Experience', 
      name: 'Mysuru Silk & Handloom Collective', 
      location: 'Mysuru', 
      rating: 4.8, 
      reviews: 96, 
      img: '/images/places/district_22_mysuru_palace.jpg', 
      desc: 'Private masterclasses with 3rd-generation weavers. Learn the historic jacquard loom technique, gold zari extraction, and buy directly from artisan cooperatives.',
      contact: { phone: '+91 821 244 8901', email: 'silk.weavers@ekana.life' }
    },
    { 
      id: 4, 
      type: 'Homestay', 
      name: 'Karavali Palm Grove Cottages', 
      location: 'Gokarna (Uttara Kannada)', 
      rating: 4.7, 
      reviews: 164, 
      img: '/images/places/district_28_murudeshwar_gokarna.jpg', 
      desc: 'Eco-friendly bamboo cottages just 3 minutes from Kudle Beach. Savor home-cooked Konkani meals, fresh coconut water, and gentle coastal breezes.',
      contact: { phone: '+91 97410 88219', email: 'karavali.palm@ekana.life' }
    },
    { 
      id: 5, 
      type: 'Local Guide', 
      name: 'Sahyadri Shola Forest Treks', 
      location: 'Kodagu (Coorg)', 
      rating: 4.9, 
      reviews: 215, 
      img: '/images/themes/theme_hills.jpg', 
      desc: 'Certified indigenous eco-guides guiding responsible day hikes to Tadiandamol and Brahmagiri. Strict pack-it-in zero waste protocols.',
      contact: { phone: '+91 94480 34112', email: 'shola.treks@ekana.life' }
    },
    { 
      id: 6, 
      type: 'Experience', 
      name: 'Cauvery River Organic Farm Day', 
      location: 'Mandya', 
      rating: 4.8, 
      reviews: 84, 
      img: '/images/places/mandya_cauvery.jpg', 
      desc: 'Experience rural Karnataka farm life. Harvest fresh sugarcane, taste pure artisanal jaggery straight from the vats, and enjoy farm-to-table meals.',
      contact: { phone: '+91 96110 55902', email: 'mandya.farms@ekana.life' }
    },
  ];

  const filteredListings = filter === 'All' ? listings : listings.filter(l => l.type === filter);

  const handleOpenContact = (listing) => {
    setContactModal(listing);
    setContactSent(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE]/40 font-sans text-gray-900 pb-24">
      
      {/* Top Banner */}
      <section className="bg-[#2A363B] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#81B29A]/15 blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="eyebrow-pill bg-white/10 text-[#81B29A] border-white/15 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#81B29A]" /> Certified Local Ecosystem
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-3">
            Community Connect & Homestays
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Stay with welcoming local families, hire certified village guides, and participate in authentic craft workshops where 100% of travel spend supports rural communities.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Filter Pills Capsule */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar py-1">
          {['All', 'Homestay', 'Local Guide', 'Experience'].map(type => {
            const isSelected = filter === type;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                  isSelected 
                    ? 'bg-[#2A363B] text-white shadow-md scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing, idx) => (
            <motion.div 
              key={listing.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group"
            >
              <div className="h-56 relative overflow-hidden bg-gray-100">
                <img 
                  src={listing.img} 
                  alt={listing.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#2A363B] shadow-xs uppercase tracking-wider">
                  {listing.type}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                  <span>{listing.rating}</span>
                </div>
              </div>
              
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#2A363B] font-heading group-hover:text-[#D0694E] transition-colors mb-1.5 leading-snug">
                    {listing.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 text-xs mb-4">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#E07A5F]" /> 
                    <span className="font-medium text-gray-700">{listing.location}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-400">{listing.reviews} verified reviews</span>
                  </div>
                  
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                    {listing.desc}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#81B29A] uppercase tracking-wider">
                    Community Direct
                  </span>
                  <button 
                    onClick={() => handleOpenContact(listing)}
                    className="inline-flex items-center gap-1.5 bg-[#E07A5F]/10 hover:bg-[#E07A5F] text-[#D0694E] hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Contact Host</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Contact Host Modal */}
      <AnimatePresence>
        {contactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative"
            >
              <button 
                onClick={() => setContactModal(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="eyebrow-pill bg-[#E07A5F]/15 text-[#D0694E] border-[#E07A5F]/30 mb-2">
                {contactModal.type}
              </span>
              <h3 className="text-xl font-bold text-[#2A363B] font-heading mb-1">
                Connect with {contactModal.name}
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Direct booking without intermediary fees in {contactModal.location}.
              </p>

              {contactSent ? (
                <div className="p-6 bg-[#81B29A]/15 border border-[#81B29A]/30 rounded-2xl text-center">
                  <CheckCircle2 className="w-10 h-10 text-[#81B29A] mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-[#2A363B]">Inquiry Forwarded!</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    The host will contact you shortly via WhatsApp/Phone.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="font-semibold flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#E07A5F]" /> Direct Phone:
                      </span>
                      <a href={`tel:${contactModal.contact.phone}`} className="font-bold text-[#2A363B] hover:text-[#E07A5F]">
                        {contactModal.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="font-semibold flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#3D5A80]" /> Email:
                      </span>
                      <span className="font-medium text-gray-600">
                        {contactModal.contact.email}
                      </span>
                    </div>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSent(true);
                      setTimeout(() => {
                        setContactModal(null);
                        setContactSent(false);
                      }, 2500);
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Your Name</label>
                      <input 
                        type="text" required placeholder="e.g. Ananya Rao" 
                        className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E07A5F] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Phone / WhatsApp</label>
                      <input 
                        type="tel" required placeholder="+91 98765 43210" 
                        className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E07A5F] focus:bg-white"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center text-xs py-2.5 mt-2">
                      Send Instant Host Message
                    </button>
                  </form>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Community;
