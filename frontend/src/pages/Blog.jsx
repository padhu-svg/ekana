import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    { id: 1, title: 'The Hidden Architectural Gems of North Karnataka', author: 'Priya Sharma', date: 'Oct 12, 2024', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800', category: 'Heritage', snippet: 'Beyond Hampi, the Chalukyan trail through Badami, Aihole, and Pattadakal offers a masterclass in early Indian rock-cut architecture...' },
    { id: 2, title: 'Sustainable Homestays: A Guide to Coorg', author: 'Rahul Desai', date: 'Oct 05, 2024', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', category: 'Eco-Tourism', snippet: 'Discover how local coffee planters in Kodagu are adopting eco-friendly hospitality models that preserve the fragile Western Ghats ecosystem...' },
    { id: 3, title: 'A Culinary Journey Along the Karavali Coast', author: 'Meera N.', date: 'Sep 28, 2024', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', category: 'Cuisine', snippet: 'From the fiery Ghee Roast of Mangaluru to the subtle coconut curries of Karwar, exploring Karnataka\'s diverse coastal cuisine...' },
    { id: 4, title: 'Trekking the Unspoiled Trails of Kudremukh', author: 'Arjun K.', date: 'Sep 20, 2024', img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800', category: 'Adventure', snippet: 'A detailed guide to securing permits, preparing for the terrain, and what to expect when trekking one of Karnataka\'s most beautiful peaks...' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-8 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#2A363B] font-heading mb-4">Storyboard & Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Traveler tales, cultural insights, and updates from the heart of Karnataka.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {posts.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#E07A5F] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-[#81B29A]" /> {post.date}</span>
                    <span className="flex items-center"><User className="w-4 h-4 mr-1 text-[#81B29A]" /> {post.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2A363B] font-heading mb-3 leading-tight group-hover:text-[#D0694E] transition-colors">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6">{post.snippet}</p>
                </div>
                
                <button className="text-[#3D5A80] font-bold text-sm flex items-center hover:text-[#293E58] transition-colors w-fit">
                  Read Full Story <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-white border-2 border-[#81B29A] text-[#2A363B] hover:bg-[#81B29A] hover:text-white px-8 py-3 rounded-full font-bold transition-colors shadow-sm">
            Load More Stories
          </button>
        </div>

      </div>
    </div>
  );
};

export default Blog;
