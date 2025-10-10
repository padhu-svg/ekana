import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8" />
              <span className="text-2xl font-bold">EKaNa</span>
            </div>
            <p className="text-gray-300 mb-4">
              Experience Karnataka Naturally - Your digital companion for discovering 
              authentic local experiences across Karnataka's diverse landscapes.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 hover:text-green-300 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 hover:text-green-300 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 hover:text-green-300 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="/discover" className="hover:text-green-300 transition-colors font-medium">Discover</a></li>
              <li><a href="/map" className="hover:text-green-300 transition-colors font-medium">Explore by Map</a></li>
              <li><a href="/sustainability" className="hover:text-green-300 transition-colors font-medium">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@ekana.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 80 1234 5678</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-gray-300">
          <p className="text-lg">&copy; 2025 EKaNa. All rights reserved. Made with ❤️ for Karnataka.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;