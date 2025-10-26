import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { destinationsAPI } from '../services/api';

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
      
      // Filter places based on search query
      const filteredPlaces = allPlaces.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for places in Karnataka..."
          className="w-full pl-12 pr-4 py-4 text-lg text-white placeholder-gray-300 bg-transparent border-2 border-gray-200 rounded-full focus:border-green-500 focus:outline-none shadow-lg"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      {loading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;