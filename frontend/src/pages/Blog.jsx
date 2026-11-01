import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowUpRight, Clock, BookOpen, X, Share2, Bookmark, Check } from 'lucide-react';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [copied, setCopied] = useState(false);

  const posts = [
    { 
      id: 1, 
      title: 'The Hidden Architectural Poetry of North Karnataka', 
      author: 'Priya Sharma', 
      date: 'Oct 12, 2024', 
      readTime: '6 min read',
      img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800', 
      category: 'Heritage', 
      snippet: 'Beyond Hampi, the Chalukyan circuit through Badami, Aihole, and Pattadakal offers a profound masterclass in early Deccan rock-cut sculpture and temple architecture.',
      content: `The red sandstone bluffs around Agastya Lake in Badami glow like embers in the late afternoon sun. Here, carved into sheer rock faces in the 6th century, the Early Chalukyas birthed an architectural dialect that would influence temple architecture across the Indian subcontinent for a millennium.\n\nWhile millions visit the vast UNESCO ruins of Hampi each year, the Chalukyan heartland—stretching between Badami, Aihole, and Pattadakal—remains an introspective, serene masterclass. Aihole alone houses over 120 stone temples dating from the 4th to the 12th century, serving as an ancient open-air design laboratory where artisans experimented with curved shikhara towers, intricate stepped apsidal halls, and stone lattice windows.\n\nAt Pattadakal, a designated UNESCO World Heritage Site along the sacred Malaprabha River, northern Nagara and southern Dravidian temple styles stand side-by-side in harmonious coexistence. To walk these quiet stone corridors at sunrise is to witness the very dawn of classical Deccan temple engineering.`
    },
    { 
      id: 2, 
      title: 'Sustainable Coffee Homestays: A Living Guide to Coorg', 
      author: 'Rahul Desai', 
      date: 'Oct 05, 2024', 
      readTime: '5 min read',
      img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 
      category: 'Eco-Tourism', 
      snippet: 'Discover how fourth-generation coffee planters in Kodagu are pioneering low-impact regenerative hospitality that shelters native birds and protects shola forests.',
      content: `In the misty high-elevation plantations of Kodagu, coffee is not grown on cleared land; it thrives beneath a multi-tiered canopy of native silver oaks, wild figs, and rosewood trees. This shade-grown method preserves the delicate microclimate essential for endemic hornbills, giant Malabar squirrels, and hundreds of butterfly species.\n\nToday, a forward-thinking generation of Kodava planters is opening their ancestral estate bungalows to mindful travelers. These certified eco-homestays operate completely off rainwater harvesting, generate solar power, and serve farm-to-fork meals prepared with organic estate herbs, bamboo shoots, and wild forest honey.\n\nBy staying directly with host families rather than impersonal commercial resorts, travelers actively finance private wildlife corridors, prevent soil erosion on steep slopes, and keep Kodava cultural lore alive.`
    },
    { 
      id: 3, 
      title: 'A Culinary Expedition Along the Karavali Coastline', 
      author: 'Meera N.', 
      date: 'Sep 28, 2024', 
      readTime: '4 min read',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 
      category: 'Cuisine', 
      snippet: 'From rich Kundapura Masala and Mangaluru Ghee Roast to delicate steamed Neer Dosas and coastal coconut curries, taste the coastal soul of Karnataka.',
      content: `Karnataka's 320-kilometer Arabian Sea coastline—known locally as Karavali—is one of India’s most distinctive and sophisticated culinary landscapes. Defined by the holy trinity of coconut, Byadgi chilies, and sour tamarind or kokum, every town along the coast boasts its own fiercely preserved culinary traditions.\n\nIn Kundapura, whole spices are roasted over wood embers to produce the legendary chicken and paneer ghee roasts. Further south in Mangaluru, the Bunt and Catholic communities create delicate steamed lace-like Neer Dosas, accompanied by spicy coconut-rich fish curries simmered in clay pots.\n\nEven breakfast is an art form: from turmeric-infused Semige noodles to Jackfruit idlis steamed in banana leaves, Karavali cooking reflects a profound harmony with monsoon rhythms and ocean seasons.`
    },
    { 
      id: 4, 
      title: 'Trekking the Grassland Ridges of Kudremukh Peak', 
      author: 'Arjun K.', 
      date: 'Sep 20, 2024', 
      readTime: '7 min read',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 
      category: 'Hills & Adventure', 
      snippet: 'A mindful guide to forest permits, eco-code etiquette, and the breathtaking rolling green horizons of one of South India’s most strictly protected national parks.',
      content: `Rising to 1,894 meters like the distinct profile of a horse's face, Kudremukh is Karnataka's second-highest peak and the crown jewel of the Western Ghats. It represents one of the world's finest remaining high-altitude shola-grassland ecosystems, where emerald meadows roll endlessly across mountain ridges punctuated by dense evergreen forest ravines.\n\nBecause Kudremukh is a strictly protected national park and tiger reserve, tourist footfall is legally restricted to just 50 permits per day. Trekking here requires advance online forest department registration and adherence to a strict zero-plastic protocol.\n\nThe 22-kilometer round trip ascends through babbling mountain streams, leeches in the monsoon, and mist-laden ridges where wild sambar deer and lion-tailed macaques roam freely. The reward at the summit is an awe-inspiring 360-degree vista of clouds swirling over the Sahyadri range.`
    }
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE]/40 font-sans text-gray-900 pb-24">
      
      {/* Top Banner */}
      <section className="bg-[#2A363B] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#3D5A80]/20 blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="eyebrow-pill bg-white/10 text-[#81B29A] border-white/15 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#E07A5F]" /> Traveler Storyboard
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-3">
            Stories, Trails & Cultural Notes
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Deep-dive travelogues, culinary histories, and conservation guides curated by local writers and naturalists across Karnataka.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col sm:flex-row cursor-pointer"
            >
              <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden shrink-0 bg-gray-100">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#2A363B] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 sm:p-7 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-xs text-gray-500 mb-2 gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E07A5F]" /> {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#81B29A]" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#2A363B] font-heading mb-2 leading-snug group-hover:text-[#D0694E] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                    {post.snippet}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">By {post.author}</span>
                  <span className="text-[#D0694E] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Story <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl border border-gray-100 relative"
            >
              {/* Modal Hero Banner */}
              <div className="h-64 relative overflow-hidden bg-gray-900">
                <img 
                  src={selectedPost.img} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover opacity-90"
                />
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/75 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#2A363B] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                  {selectedPost.category}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E07A5F]" /> {selectedPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#81B29A]" /> {selectedPost.readTime}
                  </span>
                  <span>•</span>
                  <span>Written by <strong className="text-[#2A363B]">{selectedPost.author}</strong></span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A363B] font-heading mb-6 leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="prose prose-sm max-w-none text-gray-700 space-y-4 text-sm leading-relaxed whitespace-pre-line border-t border-gray-100 pt-6">
                  {selectedPost.content}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <button 
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#3D5A80] hover:text-[#2A363B] transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                    <span>{copied ? 'Link Copied!' : 'Share Story'}</span>
                  </button>

                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="btn-primary py-2 px-5 text-xs font-bold"
                  >
                    Close Story
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Blog;
