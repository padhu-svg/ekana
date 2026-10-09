import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Partner = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE] pt-8 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#2A363B] font-heading mb-4">Partner With Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Are you a local homestay owner, guide, or eco-tourism initiative? Join the EKaNa network to promote sustainable tourism in Karnataka.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Contact Info */}
          <div className="bg-[#3D5A80] text-white p-10 lg:col-span-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-6">Get in Touch</h2>
              <p className="text-[#F4F1DE]/80 mb-12">We are constantly looking to collaborate with local government agencies, travel operators, and rural communities.</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 text-[#E07A5F]" />
                  <div>
                    <h4 className="font-bold text-lg">EKaNa Headquarters</h4>
                    <p className="text-sm text-[#F4F1DE]/80 mt-1">Karnataka Tourism Dept.<br/>Bengaluru, Karnataka 560001</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-[#E07A5F]" />
                  <div>
                    <h4 className="font-bold text-lg">Phone</h4>
                    <p className="text-sm text-[#F4F1DE]/80 mt-1">+91 80 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-[#E07A5F]" />
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <p className="text-sm text-[#F4F1DE]/80 mt-1">partners@ekana.karnataka.gov.in</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <h4 className="font-bold mb-4">Follow our journey</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">IN</div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">TW</div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">FB</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-10 lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#2A363B] mb-6">Partnership Application</h2>
            
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#81B29A]/20 border border-[#81B29A] rounded-2xl p-8 text-center text-[#2A363B]">
                <Send className="w-12 h-12 text-[#81B29A] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
                <p>Thank you for your interest in EKaNa. Our team will review your details and get back to you within 2-3 business days.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E07A5F] focus:ring-1 focus:ring-[#E07A5F] outline-none transition-all bg-gray-50 focus:bg-white" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E07A5F] focus:ring-1 focus:ring-[#E07A5F] outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E07A5F] focus:ring-1 focus:ring-[#E07A5F] outline-none transition-all bg-gray-50 focus:bg-white" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Partnership Type</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E07A5F] focus:ring-1 focus:ring-[#E07A5F] outline-none transition-all bg-gray-50 focus:bg-white text-gray-700">
                      <option>Homestay / Accommodation</option>
                      <option>Local Guide / Experience Maker</option>
                      <option>Travel Operator</option>
                      <option>Government / NGO</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea required rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E07A5F] focus:ring-1 focus:ring-[#E07A5F] outline-none transition-all bg-gray-50 focus:bg-white resize-none" placeholder="Tell us about your business or initiative..."></textarea>
                </div>

                <button type="submit" className="bg-[#E07A5F] hover:bg-[#D0694E] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-xl w-full sm:w-auto">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Partner;
