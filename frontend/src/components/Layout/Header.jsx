import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'Districts', path: '/map' },
    { name: 'Community', path: '/community' },
    { name: 'Blog', path: '/blog' },
    { name: 'Partner', path: '/partner' },
    { name: 'Sustainability', path: '/sustainability' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 font-sans border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/ekana_logo.jpeg" alt="EKaNa Logo" className="h-16 w-12 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow" />
            <span className="text-3xl font-bold text-[#2A363B] font-heading tracking-tight">EKa<span className="text-[#81B29A]">Na</span></span>
          </Link>

          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-[#D0694E] transition-colors duration-200 font-semibold text-[15px]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => navigate('/plan')}
              className="bg-[#E07A5F] hover:bg-[#D0694E] text-white px-6 xl:px-8 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              Plan Trip
            </button>
          </div>

          <button
            className="lg:hidden text-gray-600 hover:text-[#2A363B]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden py-4 border-t"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block py-3 text-gray-800 hover:text-[#E07A5F] font-semibold text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => { setIsMenuOpen(false); navigate('/plan'); }}
              className="bg-[#E07A5F] hover:bg-[#D0694E] text-white px-6 py-3 rounded-full font-bold w-full mt-4 shadow-md"
            >
              Plan Trip
            </button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;