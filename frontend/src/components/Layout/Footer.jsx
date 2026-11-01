import { MapPin, Mail, Phone, ArrowUpRight, Compass, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2A363B] text-white font-sans border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              <div className="p-0.5 rounded-full border border-white/20">
                <img src="/ekana_logo.jpeg" alt="EKaNa" className="h-10 w-10 rounded-full object-cover" />
              </div>
              <span className="text-2xl font-bold font-heading tracking-tight">
                EKa<span className="text-[#81B29A]">Na</span>
              </span>
            </Link>
            <p className="text-sm font-semibold text-[#E07A5F] mb-3">
              ಗಂಧದ ಗುಡಿ – ವಿಶ್ವ ಪ್ರವಾಸಿಗರ ಗಮ್ಯಸ್ಥಾನ
            </p>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
              Experience Karnataka Naturally. An integrated, sustainable digital travel ecosystem connecting travelers to authentic local heritage, biodiversity, and community homestays.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-white/80">
              <ShieldCheck className="w-4 h-4 text-[#81B29A]" />
              <span>Responsible & Sustainable Tourism</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07A5F] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/discover" className="hover:text-white transition-colors">Discover Circuits</Link></li>
              <li><Link to="/map" className="hover:text-white transition-colors">31 Karnataka Districts</Link></li>
              <li><Link to="/plan" className="hover:text-white transition-colors">AI Itinerary Builder</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community Homestays</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Traveler Storyboard</Link></li>
            </ul>
          </div>

          {/* Circuits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#81B29A] mb-4">
              Circuits
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/discover?category=Heritage" className="hover:text-white transition-colors">Hampi & Chalukya Heritage</Link></li>
              <li><Link to="/discover?category=Hills" className="hover:text-white transition-colors">Western Ghats & Coorg</Link></li>
              <li><Link to="/discover?category=Coast" className="hover:text-white transition-colors">Karavali Coastal Trail</Link></li>
              <li><Link to="/discover?category=Wildlife" className="hover:text-white transition-colors">Kabini & Nagarhole Wildlife</Link></li>
              <li><Link to="/sustainability" className="hover:text-white transition-colors">Eco-Tourism Hub</Link></li>
            </ul>
          </div>

          {/* Contact & Partner */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D5A80] mb-4">
              Connect
            </h4>
            <div className="space-y-3 text-sm text-white/70 mb-6">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E07A5F]" />
                <span className="text-xs">partners@ekana.life</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#81B29A]" />
                <span className="text-xs">+91 80 2235 2828</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#3D5A80] shrink-0 mt-0.5" />
                <span className="text-xs">Bengaluru, Karnataka, India</span>
              </div>
            </div>
            <Link 
              to="/partner" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E07A5F] hover:text-white transition-colors"
            >
              <span>Partner With Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} EKaNa. Experience Karnataka Naturally. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/sustainability" className="hover:text-white/80 transition-colors">Responsible Travel</Link>
            <Link to="/partner" className="hover:text-white/80 transition-colors">Government Collaborations</Link>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-[#E07A5F] fill-current" /> for Karnataka
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;