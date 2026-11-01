import { useState } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { destinationsAPI } from '../services/api';

const TRENDING_TAGS = ['Hampi', 'Coorg', 'Gokarna', 'Badami', 'Mysuru'];

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      onResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await destinationsAPI.getAll();
      const allPlaces = response.data || [];
      
      const q = searchQuery.toLowerCase();
      const filteredPlaces = allPlaces.filter(place => 
        (place.name && place.name.toLowerCase().includes(q)) ||
        (place.category && place.category.toLowerCase().includes(q)) ||
        (place.district && place.district.toLowerCase().includes(q)) ||
        (place.description && place.description.toLowerCase().includes(q))
      );
      
      onResults(filteredPlaces);
    } catch (error) {
      console.error('Search error:', error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onResults([]);
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
    handleSearch(tag);
  };

  return (
    <div className="relative max-w-2xl mx-auto w-full">
      {/* Floating Capsule Input */}
      <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-white/50 p-1.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#E07A5F]/50 focus-within:bg-white">
        <div className="w-10 h-10 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] flex items-center justify-center shrink-0 ml-1">
          <Search className="h-4 w-4" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search 31 districts, heritage temples, hill trails..."
          className="w-full px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 bg-transparent border-none focus:outline-none font-medium"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors mr-1"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {loading ? (
          <div className="w-9 h-9 flex items-center justify-center shrink-0 mr-1">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#E07A5F] border-t-transparent"></div>
          </div>
        ) : (
          <button
            onClick={() => handleSearch(query)}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#2A363B] hover:bg-[#3D5A80] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 shrink-0 shadow-xs mr-1"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Trending Search Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
        <span className="text-white/70 font-medium inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#E07A5F]" /> Trending:
        </span>
        {TRENDING_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className="bg-white/10 hover:bg-white/20 text-white/90 border border-white/20 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;