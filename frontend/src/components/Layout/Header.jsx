import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/60 transition-all duration-300 font-sans shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden rounded-full p-0.5 border border-[#81B29A]/30 group-hover:border-[#E07A5F]/50 transition-colors">
              <img 
                src="/ekana_logo.jpeg" 
                alt="EKaNa Logo" 
                className="h-12 w-12 rounded-full object-cover shadow-xs group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#2A363B] font-heading tracking-tight leading-none">
                EKa<span className="text-[#81B29A]">Na</span>
              </span>
              <span className="text-[10px] tracking-widest font-semibold text-gray-500 uppercase mt-0.5">
                Karnataka Naturally
              </span>
            </div>
          </Link>

          {/* Desktop Nav Pills */}
          <nav className="hidden lg:flex items-center space-x-1 bg-gray-100/70 p-1.5 rounded-full border border-gray-200/60">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'text-[#2A363B] bg-white shadow-xs' 
                      : 'text-gray-600 hover:text-[#2A363B] hover:bg-white/60'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <button 
              onClick={() => navigate('/plan')}
              className="group inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#D0694E] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              <span>Plan Your Trip</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-[#2A363B]" /> : <Menu className="h-6 w-6 text-[#2A363B]" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col space-y-1.5 pb-3">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`px-4 py-2.5 rounded-xl font-semibold text-base transition-colors ${
                        isActive
                          ? 'bg-[#E07A5F]/10 text-[#D0694E]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <button 
                onClick={() => { setIsMenuOpen(false); navigate('/plan'); }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#D0694E] text-white px-6 py-3.5 rounded-xl font-bold shadow-sm transition-all"
              >
                <span>Plan Your Trip</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;