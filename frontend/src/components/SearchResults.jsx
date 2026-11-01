import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results, onClose }) => {
  const navigate = useNavigate();

  if (results.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto z-50 p-2"
    >
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2A363B]">
          {results.length} destination{results.length !== 1 ? 's' : ''} found
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-xs font-semibold px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          Close
        </button>
      </div>
      
      <div className="divide-y divide-gray-50">
        {results.map((place, index) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => {
              navigate(`/place/${place.id}`);
              onClose();
            }}
            className="p-3.5 hover:bg-gray-50/80 rounded-2xl cursor-pointer transition-all duration-200 group flex items-center justify-between"
          >
            <div className="flex items-center space-x-3.5 min-w-0">
              <img
                src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100'}
                alt={place.name}
                className="w-14 h-14 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 group-hover:text-[#D0694E] transition-colors text-sm truncate">
                  {place.name}
                </h4>
                <div className="flex items-center text-gray-500 text-xs gap-2 mt-1">
                  <span className="inline-flex items-center text-gray-600">
                    <MapPin className="h-3 w-3 mr-0.5 text-[#81B29A]" />
                    {place.district}
                  </span>
                  <span>•</span>
                  <span className="bg-[#E07A5F]/10 text-[#D0694E] px-2 py-0.5 rounded-full font-semibold text-[10px]">
                    {place.category}
                  </span>
                  {place.best_time && (
                    <>
                      <span>•</span>
                      <span className="text-gray-400">{place.best_time}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#E07A5F] text-gray-400 group-hover:text-white flex items-center justify-center shrink-0 transition-colors ml-3">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchResults;