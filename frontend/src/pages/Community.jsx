import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Star, MapPin, Coffee, Phone } from 'lucide-react';

const Community = () => {
  const [filter, setFilter] = useState('All');

  const listings = [
    { id: 1, type: 'Homestay', name: 'Gowda Heritage House', location: 'Chikkamagaluru', rating: 4.8, reviews: 124, img: 'https://images.unsplash.com/photo-1542314831-c6a4d14abac2?w=500', desc: 'Experience authentic Malnad hospitality in a 100-year-old traditional courtyard house surrounded by coffee plantations.' },
    { id: 2, type: 'Local Guide', name: 'Ramesh Hampi Tours', location: 'Hampi', rating: 4.9, reviews: 312, img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500', desc: 'Expert historian guide specializing in the Vijayanagara empire, offering bicycle and walking tours of the ruins.' },
    { id: 3, type: 'Experience', name: 'Mysuru Silk Weaving Tour', location: 'Mysuru', rating: 4.7, reviews: 89, img: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=500', desc: 'Visit traditional weavers, learn the intricate process of creating the famous Mysore Silk, and interact with artisan families.' },
    { id: 4, type: 'Homestay', name: 'Coastal Coconut Retreat', location: 'Gokarna', rating: 4.6, reviews: 156, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500', desc: 'Eco-friendly bamboo cottages just steps away from Kudle beach. Enjoy local Konkani seafood prepared by the host family.' },
    { id: 5, type: 'Local Guide', name: 'Western Ghats Treks', location: 'Kodagu', rating: 4.9, reviews: 201, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', desc: 'Certified local eco-guides offering responsible trekking experiences through the dense Shola forests of Coorg.' },
    { id: 6, type: 'Experience', name: 'Organic Farm Day', location: 'Mandya', rating: 4.8, reviews: 67, img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500', desc: 'Spend a day with local farmers. Learn about sustainable agriculture, harvest fresh sugarcane, and enjoy a farm-to-table village meal.' },
  ];

  const filteredListings = filter === 'All' ? listings : listings.filter(l => l.type === filter);

  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-8 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2A363B] font-heading mb-4">Community Connect</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover authentic local experiences, stay with welcoming families, and hire verified local guides. Travel that supports the community.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Homestay', 'Local Guide', 'Experience'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-colors shadow-sm ${
                filter === type 
                  ? 'bg-[#3D5A80] text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing, idx) => (
            <motion.div 
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="h-48 relative">
                <img src={listing.img} alt={listing.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#E07A5F] shadow-sm uppercase tracking-wide">
                  {listing.type}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#2A363B] font-heading">{listing.name}</h3>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                    <span className="text-sm font-bold text-yellow-700">{listing.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1 text-[#81B29A]" /> {listing.location}
                  <span className="mx-2">&bull;</span>
                  <span className="text-gray-400">{listing.reviews} reviews</span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">{listing.desc}</p>
                
                <div className="flex space-x-3 mt-auto">
                  <button className="flex-1 bg-[#F4F1DE] hover:bg-[#EAE5C9] text-[#2A363B] py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center text-sm">
                    <Phone className="w-4 h-4 mr-2" /> Contact
                  </button>
                  <button className="flex-1 bg-[#81B29A] hover:bg-[#63927A] text-white py-2.5 rounded-xl font-semibold transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Community;
