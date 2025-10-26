import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';

const SearchResults = ({ results, onClose }) => {
  if (results.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto z-50"
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {results.length} place{results.length !== 1 ? 's' : ''} found
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-sm font-medium"
        >
          Close
        </button>
      </div>
      
      <div className="divide-y divide-gray-100">
        {results.map((place, index) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => window.location.href = `/place/${place.id}`}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-4">
              <img
                src={place.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100'}
                alt={place.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{place.name}</h4>
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{place.district}</span>
                  <span className="mx-2">•</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {place.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-1">{place.description}</p>
                {place.best_time && (
                  <div className="flex items-center text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">{place.best_time}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchResults;